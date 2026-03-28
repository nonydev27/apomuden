import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export function SignIn() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/chat'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  function onSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    login({ email: email.trim(), name: email.split('@')[0] || 'User' })
    navigate(from, { replace: true })
  }

  return (
    <>
      <h1 className="auth-title brand-font">Sign in</h1>
      <p className="auth-lead">Welcome back to Apomuden.</p>
      <form className="auth-form" onSubmit={onSubmit}>
        {error ? <p className="auth-error">{error}</p> : null}
        <div className="auth-field">
          <label className="field-label" htmlFor="signin-email">
            Email
          </label>
          <input
            id="signin-email"
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label className="field-label" htmlFor="signin-password">
            Password
          </label>
          <input
            id="signin-password"
            className="input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="auth-note">
          Demo only — password is not validated or stored.
        </p>
        <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
          Continue
        </button>
      </form>
      <p className="auth-footer">
        New here? <Link to="/auth/sign-up">Create an account</Link>
      </p>
    </>
  )
}
