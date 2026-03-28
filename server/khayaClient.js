const DEFAULT_BASE = 'https://translation.ghananlp.org'

function getKey() {
  return process.env.KHAYA_API_KEY || process.env.OCP_APIM_SUBSCRIPTION_KEY || ''
}

function getBase() {
  return (process.env.KHAYA_BASE_URL || DEFAULT_BASE).replace(/\/$/, '')
}

/** @param {unknown} data */
export function extractTextFromKhayaPayload(data) {
  if (typeof data === 'string') return data
  if (data && typeof data === 'object') {
    const o = /** @type {Record<string, unknown>} */ (data)
    for (const k of ['translation', 'text', 'out', 'result', 'data']) {
      const v = o[k]
      if (typeof v === 'string' && v) return v
    }
  }
  return null
}

/**
 * @param {string} text
 * @param {string} languagePair e.g. tw-en, en-tw
 */
export async function khayaTranslate(text, languagePair) {
  const key = getKey()
  if (!key) {
    return { ok: false, error: 'KHAYA_API_KEY not configured', text: text }
  }
  const url = `${getBase()}/v1/translate`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': key,
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({ in: text, lang: languagePair }),
  })

  const raw = await res.json().catch(() => null)
  if (!res.ok) {
    return {
      ok: false,
      error: typeof raw === 'object' && raw && 'message' in raw
        ? String(/** @type {{ message?: string }} */ (raw).message)
        : `Khaya translate HTTP ${res.status}`,
      text: text,
      raw,
    }
  }

  const out = extractTextFromKhayaPayload(raw)
  if (!out) {
    return {
      ok: false,
      error: 'Unexpected Khaya translate response',
      text: text,
      raw,
    }
  }
  return { ok: true, text: out }
}

/**
 * @param {Buffer} audio
 * @param {string} language Khaya ASR code e.g. tw, gaa
 * @param {string} [contentType]
 */
export async function khayaTranscribe(audio, language, contentType) {
  const key = getKey()
  if (!key) {
    return { ok: false, error: 'KHAYA_API_KEY not configured' }
  }
  const url = new URL(`${getBase()}/asr/v1/transcribe`)
  url.searchParams.set('language', language)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': contentType || 'application/octet-stream',
    },
    body: audio,
  })

  const raw = await res.json().catch(() => null)
  if (!res.ok) {
    return {
      ok: false,
      error:
        typeof raw === 'object' && raw && 'message' in raw
          ? String(/** @type {{ message?: string }} */ (raw).message)
          : `Khaya ASR HTTP ${res.status}`,
      raw,
    }
  }

  const text = extractTextFromKhayaPayload(raw)
  if (!text) {
    return { ok: false, error: 'Unexpected Khaya ASR response', raw }
  }
  return { ok: true, text }
}
