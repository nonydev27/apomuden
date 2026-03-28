import express from 'express'
import cors from 'cors'
import multer from 'multer'
import Anthropic from '@anthropic-ai/sdk'
import { khayaTranslate, khayaTranscribe } from './khayaClient.js'
import { USER_LANGUAGES, pairToEn, pairFromEn } from './langConfig.js'

const PORT = Number(process.env.PORT) || 3001
const app = express()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
})

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
)
app.use(express.json({ limit: '256kb' }))

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const SYSTEM_PROMPT_EN = `You are Apomuden Guide, a careful health-information assistant (not a doctor).

Rules:
- The user's message is in English (it may have been translated from another language). Reply in clear English only.
- Never claim to diagnose, prescribe medication, or replace emergency or professional care.
- Give: possible explanations in general terms only, basic education, self-care ideas that are widely considered safe when not contraindicated, red flags, and clear guidance on when to seek urgent or in-person care.
- Use short headings and bullet lists where helpful.
- If symptoms could be serious or ambiguous, prioritize safety: urge contacting local emergency services or a clinician promptly.
- Keep replies concise and practical (~250–450 words unless the user asks for detail).`

function demoReplyEnglish() {
  return `**I'm not a doctor** — this is general guidance only.

**What you shared** could have many causes; without an in-person exam, nothing is certain.

**Self-care (if no red flags):** rest, hydration, and over-the-counter options *only if safe for you* and per label directions.

**Seek emergency care** for trouble breathing, severe chest pain, fainting, sudden confusion, heavy bleeding, or rapidly worsening symptoms.

**Next step:** contact your clinician or local emergency services if symptoms persist or you're unsure.`
}

/** @param {string} userLang */
function validateUserLang(userLang) {
  const id = (userLang || 'en').toLowerCase()
  const ok = USER_LANGUAGES.some((l) => l.id === id)
  return ok ? id : 'en'
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    claude: Boolean(client),
    khaya: Boolean(process.env.KHAYA_API_KEY || process.env.OCP_APIM_SUBSCRIPTION_KEY),
    languages: USER_LANGUAGES,
  })
})

app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  const language = String(req.body?.language || req.query.language || '').trim()
  if (!req.file?.buffer) {
    return res.status(400).json({ error: 'audio file required (field name: audio)' })
  }
  if (!language) {
    return res.status(400).json({ error: 'language required (Khaya ASR code, e.g. tw, gaa)' })
  }

  const ct = req.file.mimetype || 'application/octet-stream'
  const result = await khayaTranscribe(req.file.buffer, language, ct)
  if (!result.ok) {
    return res.status(502).json({ error: result.error || 'Transcription failed' })
  }
  return res.json({ text: result.text, language })
})

app.post('/api/health-advice', async (req, res) => {
  const {
    message,
    userLang: userLangRaw,
    history,
  } = req.body || {}

  const text = typeof message === 'string' ? message.trim() : ''
  if (!text) {
    return res.status(400).json({ error: 'message is required' })
  }

  const userLang = validateUserLang(
    typeof userLangRaw === 'string' ? userLangRaw : 'en',
  )
  const notices = []

  let messageEn = text
  let usedKhayaIn = false

  if (userLang !== 'en') {
    const pair = pairToEn(userLang)
    if (pair) {
      const tr = await khayaTranslate(text, pair)
      if (tr.ok) {
        messageEn = tr.text
        usedKhayaIn = true
      } else {
        notices.push(
          `Khaya translation to English failed (${tr.error || 'unknown'}). Using your original text for the model — results may be less accurate.`,
        )
      }
    }
  }

  const past = Array.isArray(history) ? history.slice(-6) : []
  const apiMessages = [
    ...past.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 8000),
    })),
    {
      role: 'user',
      content: `Original user language code: ${userLang}\n\nUser message (English for processing):\n${messageEn.slice(0, 12000)}`,
    },
  ]

  if (!client) {
    let reply = demoReplyEnglish()
    let usedKhayaOut = false
    if (userLang !== 'en') {
      const outPair = pairFromEn(userLang)
      if (outPair) {
        const tr = await khayaTranslate(reply, outPair)
        if (tr.ok) {
          reply = tr.text
          usedKhayaOut = true
        } else {
          notices.push(
            'Khaya translation from English failed; showing English demo text.',
          )
        }
      }
    }
    return res.json({
      reply,
      replyEn: demoReplyEnglish(),
      userMessageEn: messageEn,
      userLang,
      demo: true,
      usedKhaya: { in: usedKhayaIn, out: usedKhayaOut },
      notice:
        'ANTHROPIC_API_KEY is not set; returning a safety-first demo response. Add the key for live Claude answers.',
      notices,
    })
  }

  let replyEn = ''
  try {
    const model =
      process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022'
    const resp = await client.messages.create({
      model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT_EN,
      messages: apiMessages,
    })

    const block = resp.content.find((b) => b.type === 'text')
    replyEn = block && block.type === 'text' ? block.text : ''
    if (!replyEn) {
      return res.status(502).json({ error: 'Empty model response' })
    }
  } catch (e) {
    console.error(e)
    let reply = demoReplyEnglish()
    if (userLang !== 'en') {
      const outPair = pairFromEn(userLang)
      if (outPair) {
        const tr = await khayaTranslate(reply, outPair)
        if (tr.ok) reply = tr.text
      }
    }
    return res.status(502).json({
      error: 'Model request failed',
      reply,
      replyEn: demoReplyEnglish(),
      userMessageEn: messageEn,
      userLang,
      demo: true,
      notices,
    })
  }

  let replyUser = replyEn
  let usedKhayaOut = false

  if (userLang !== 'en') {
    const outPair = pairFromEn(userLang)
    if (outPair) {
      const tr = await khayaTranslate(replyEn, outPair)
      if (tr.ok) {
        replyUser = tr.text
        usedKhayaOut = true
      } else {
        notices.push(
          `Khaya translation to user language failed (${tr.error || 'unknown'}). Showing English response.`,
        )
        replyUser = replyEn
      }
    }
  }

  if (notices.length === 0 && !process.env.KHAYA_API_KEY && userLang !== 'en') {
    notices.push(
      'KHAYA_API_KEY not set — translations were skipped or limited.',
    )
  }

  return res.json({
    reply: replyUser,
    replyEn,
    userMessageEn: messageEn,
    userLang,
    demo: false,
    usedKhaya: { in: usedKhayaIn, out: usedKhayaOut },
    notices,
  })
})

app.listen(PORT, () => {
  console.log(`Apomuden API listening on http://localhost:${PORT}`)
})
