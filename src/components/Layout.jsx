import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DynamicIslandNav } from './DynamicIslandNav'
import './Layout.css'

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [activeSection, setActiveSection] = useState('top')
  const [scrolled, setScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('up')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showToTopBtn, setShowToTopBtn] = useState(false)

  const onSectionChange = useCallback((id) => {
    setActiveSection(id)
  }, [])

  const outletContext = useMemo(
    () => ({ onHomeSectionChange: onSectionChange }),
    [onSectionChange],
  )

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY + 5) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY - 5) {
        setScrollDirection('up')
      }
      
      setLastScrollY(currentScrollY)
      setScrolled(currentScrollY > 28)
      setShowToTopBtn(currentScrollY > 300)
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`shell${isHome ? ' shell--home' : ''}`}>
      <DynamicIslandNav
        key={location.pathname}
        activeSection={activeSection}
        scrolled={scrolled}
        hideOnMobileScroll={scrollDirection === 'down' && isHome}
      />
      <main className="main">
        <Outlet context={outletContext} />
      </main>
      
      {/* Sticky Back-to-Top Button - Mobile */}
      {showToTopBtn && isHome && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
      
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
