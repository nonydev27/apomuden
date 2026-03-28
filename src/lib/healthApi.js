/**
 * @param {{ message: string; userLang?: string; history?: { role: string; content: string }[] }} body
 */
export async function fetchHealthAdvice(body) {
  const res = await fetch('/api/health-advice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

/**
 * @param {File} file
 * @param {string} language Khaya ASR code e.g. tw, gaa
 */
export async function transcribeAudio(file, language) {
  const fd = new FormData()
  fd.append('audio', file)
  fd.append('language', language)
  const res = await fetch('/api/transcribe', {
    method: 'POST',
    body: fd,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Transcription failed (${res.status})`)
  }
  return data
}
