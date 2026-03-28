/** @param {string} lang BCP-47 */
export function speakText(text, lang) {
  if (!text || typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  u.rate = 0.98
  u.pitch = 1
  window.speechSynthesis.speak(u)
}

/** Rough BCP-47 hints for TTS after Khaya localization (browser support varies). */
const USER_LANG_TO_BCP47 = {
  en: 'en-GB',
  tw: 'ak-GH',
  gaa: 'gaa-GH',
  ee: 'ee-GH',
  fat: 'ak-GH',
  dag: 'dag',
  dga: 'dga-GH',
  gur: 'gur',
  nzi: 'nzi',
  kpo: 'pcm',
  yo: 'yo-NG',
  ki: 'ki-KE',
  ha: 'ha-NG',
}

/** @param {string} userLangId from `userLangs` e.g. tw, en */
export function speakTextForUserLang(text, userLangId) {
  const lang =
    USER_LANG_TO_BCP47[userLangId] || USER_LANG_TO_BCP47.en || 'en-GB'
  speakText(text, lang)
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}
