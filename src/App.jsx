import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthLayout } from './pages/AuthLayout'
import { ChatCare } from './pages/ChatCare'
import { Emergency } from './pages/Emergency'
import { Landing } from './pages/Landing'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { VoiceCare } from './pages/VoiceCare'

function HomeHashRedirect({ hash }) {
  const h = hash.startsWith('#') ? hash.slice(1) : hash
  return <Navigate to={{ pathname: '/', hash: h }} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="chat" element={<ChatCare />} />
          <Route path="voice" element={<VoiceCare />} />
          <Route path="how-it-works" element={<HomeHashRedirect hash="#how" />} />
          <Route path="emergency" element={<Emergency />} />
          <Route
            path="disclaimer"
            element={<Navigate to={{ pathname: '/', hash: 'how-disclaimer' }} replace />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="auth/sign-in" element={<SignIn />} />
          <Route path="auth/sign-up" element={<SignUp />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
