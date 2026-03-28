import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DynamicIslandNav } from './DynamicIslandNav'
import './Layout.css'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [activeSection, setActiveSection] = useState('top')
  const [scrolled, setScrolled] = useState(false)

  const onSectionChange = useCallback((id) => {
    setActiveSection(id)
  }, [])

  const outletContext = useMemo(
    () => ({ onHomeSectionChange: onSectionChange }),
    [onSectionChange],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  return (
    <div className={`shell${isHome ? ' shell--home' : ''}`}>
      <DynamicIslandNav
        key={location.pathname}
        activeSection={activeSection}
        scrolled={scrolled}
      />
      <main className="main">
        <Outlet context={outletContext} />
      </main>
      {!isHome ? (
        <footer className="footer footer--compact">
          <p>
            Apomuden — general information only, not medical advice.{' '}
            <a href="/#how-disclaimer">Disclaimer</a>
          </p>
        </footer>
      ) : null}
    </div>
  )
}
