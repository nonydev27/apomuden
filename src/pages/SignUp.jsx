import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export function SignUp() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  function onSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !name.trim()) {
      setError('Please enter your name and email.')
      return
    }
    login({ email: email.trim(), name: name.trim() })
    navigate('/chat', { replace: true })
  }

  return (
    <>
      <h1 className="auth-title brand-font">Sign up</h1>
      <p className="auth-lead">Create your Apomuden profile.</p>
      <form className="auth-form" onSubmit={onSubmit}>
        {error ? <p className="auth-error">{error}</p> : null}
        <div className="auth-field">
          <label className="field-label" htmlFor="signup-name">
            Full name
          </label>
          <input
            id="signup-name"
            className="input"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label className="field-label" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label className="field-label" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            className="input"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="auth-note">
          Demo only — details are kept in this browser via localStorage.
        </p>
        <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
          Start
        </button>
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="/auth/sign-in">Sign in</Link>
      </p>
    </>
  )
}
