/** Khaya pair suffixes match GhanaNLP codes (see khaya-sdk constants). */
export const USER_LANGUAGES = [
  {
    id: 'en',
    label: 'English',
    speechHint: 'en-US',
    khayaAsr: null,
  },
  {
    id: 'tw',
    label: 'Twi (Akan)',
    speechHint: 'en-US',
    khayaAsr: 'tw',
  },
  {
    id: 'gaa',
    label: 'Ga',
    speechHint: 'en-US',
    khayaAsr: 'gaa',
  },
  {
    id: 'ee',
    label: 'Ewe',
    speechHint: 'en-US',
    khayaAsr: 'ee',
  },
  {
    id: 'fat',
    label: 'Fante',
    speechHint: 'en-US',
    khayaAsr: 'fat',
  },
  {
    id: 'dag',
    label: 'Dagbani',
    speechHint: 'en-US',
    khayaAsr: 'dag',
  },
  {
    id: 'dga',
    label: 'Dagaare',
    speechHint: 'en-US',
    khayaAsr: 'dga',
  },
  {
    id: 'gur',
    label: 'Gurene',
    speechHint: 'en-US',
    khayaAsr: 'gur',
  },
  {
    id: 'nzi',
    label: 'Nzema',
    speechHint: 'en-US',
    khayaAsr: 'nzi',
  },
  {
    id: 'kpo',
    label: 'Ghanaian Pidgin',
    speechHint: 'en-US',
    khayaAsr: 'kpo',
  },
  {
    id: 'yo',
    label: 'Yoruba',
    speechHint: 'en-US',
    khayaAsr: 'yo',
  },
  {
    id: 'ki',
    label: 'Kikuyu',
    speechHint: 'en-US',
    khayaAsr: null,
  },
  {
    id: 'ha',
    label: 'Hausa (if supported)',
    speechHint: 'en-US',
    khayaAsr: null,
  },
]

export function pairToEn(id) {
  if (!id || id === 'en') return null
  return `${id}-en`
}

export function pairFromEn(id) {
  if (!id || id === 'en') return null
  return `en-${id}`
}
