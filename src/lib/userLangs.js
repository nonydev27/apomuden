/** Mirrors `server/langConfig.js` for the client UI. */
export const USER_LANGUAGES = [
  { id: 'en', label: 'English', khayaAsr: null },
  { id: 'tw', label: 'Twi (Akan)', khayaAsr: 'tw' },
  { id: 'gaa', label: 'Ga', khayaAsr: 'gaa' },
  { id: 'ee', label: 'Ewe', khayaAsr: 'ee' },
  { id: 'fat', label: 'Fante', khayaAsr: 'fat' },
  { id: 'dag', label: 'Dagbani', khayaAsr: 'dag' },
  { id: 'dga', label: 'Dagaare', khayaAsr: 'dga' },
  { id: 'gur', label: 'Gurene', khayaAsr: 'gur' },
  { id: 'nzi', label: 'Nzema', khayaAsr: 'nzi' },
  { id: 'kpo', label: 'Ghanaian Pidgin', khayaAsr: 'kpo' },
  { id: 'yo', label: 'Yoruba', khayaAsr: 'yo' },
  { id: 'ki', label: 'Kikuyu', khayaAsr: null },
  { id: 'ha', label: 'Hausa (if supported)', khayaAsr: null },
]

export function getUserLang(id) {
  return USER_LANGUAGES.find((l) => l.id === id) || USER_LANGUAGES[0]
}
