import { useCallback, useEffect, useRef, useState } from 'react'

function getRecognitionCtor() {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

/**
 * @param {{ lang: string; continuous?: boolean }} options
 */
export function useSpeechRecognition({ lang, continuous = false }) {
  const [supported] = useState(() => Boolean(getRecognitionCtor()))
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)
  const recRef = useRef(null)

  useEffect(() => {
    const inst = recRef.current
    if (inst) {
      try {
        inst.lang = lang
      } catch {
        /* ignore */
      }
    }
  }, [lang])

  const clearTranscript = useCallback(() => setTranscript(''), [])

  const stop = useCallback(() => {
    const inst = recRef.current
    if (inst) {
      try {
        inst.stop()
      } catch {
        /* ignore */
      }
    }
    setListening(false)
  }, [])

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor()
    if (!Ctor) {
      setError('Speech recognition is not supported in this browser.')
      return
    }
    setError(null)
    setTranscript('')

    const rec = new Ctor()
    recRef.current = rec
    rec.lang = lang
    rec.continuous = continuous
    rec.interimResults = true
    rec.maxAlternatives = 1

    rec.onresult = (ev) => {
      let text = ''
      for (let i = ev.resultIndex; i < ev.results.length; i += 1) {
        text += ev.results[i][0].transcript
      }
      setTranscript(text.trim())
    }

    rec.onerror = (ev) => {
      setError(ev.error || 'recognition error')
      setListening(false)
    }

    rec.onend = () => {
      setListening(false)
    }

    try {
      rec.start()
      setListening(true)
    } catch (e) {
      setError(e?.message || 'Could not start microphone')
      setListening(false)
    }
  }, [lang, continuous])

  useEffect(() => () => stop(), [stop])

  return { supported, listening, transcript, error, start, stop, clearTranscript }
}
