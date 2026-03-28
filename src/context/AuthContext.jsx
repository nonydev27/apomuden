/* Shared provider + hook; fast-refresh rule relaxed in eslint.config.js. */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'aura_auth'

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const u = JSON.parse(raw)
    if (u && typeof u.email === 'string') return u
  } catch {
    /* ignore */
  }
  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  const login = useCallback((payload) => {
    const next = {
      email: String(payload.email || '').trim(),
      name: String(payload.name || '').trim() || 'Friend',
    }
    if (!next.email) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setUser(next)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user?.email),
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
