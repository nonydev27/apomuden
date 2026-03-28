import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Compact avatar + dropdown at the trailing edge of the nav island.
 */
export function IslandAccountMenu({ user, onLogout, closeMobileMenu }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(/** @type {Node} */ (e.target))) {
        setOpen(false)
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const initials = (() => {
    const name = (user?.name || '').trim()
    if (name) {
      const parts = name.split(/\s+/).filter(Boolean)
      if (parts.length >= 2)
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      return name.slice(0, 2).toUpperCase()
    }
    const em = (user?.email || '?').trim()
    return em.slice(0, 2).toUpperCase()
  })()

  function handleLogout() {
    setOpen(false)
    closeMobileMenu?.()
    onLogout()
  }

  return (
    <div className="island-account" ref={rootRef}>
      <button
        type="button"
        className="island-account-trigger"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="island-account-initials">{initials}</span>
      </button>
      {open ? (
        <div className="island-account-panel" role="menu">
          <p className="island-account-label">Signed in</p>
          <p className="island-account-email">{user?.email}</p>
          <div className="island-account-divider" />
          <Link
            role="menuitem"
            to="/"
            className="island-account-link"
            onClick={() => {
              setOpen(false)
              closeMobileMenu?.()
            }}
          >
            Back to home
          </Link>
          <p className="island-account-hint">
            Profile, language preferences, and notification settings will be
            managed in the mobile app.
          </p>
          <button type="button" role="menuitem" className="island-account-signout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  )
}
