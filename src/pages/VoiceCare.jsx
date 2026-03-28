import { Navigate } from 'react-router-dom'

/** Voice + text live in the chat room now. */
export function VoiceCare() {
  return <Navigate to="/chat" replace />
}
