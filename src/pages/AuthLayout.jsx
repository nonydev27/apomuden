import { Link, Outlet } from 'react-router-dom'
import { BrandLogo } from '../components/BrandLogo'
import '../styles/ui.css'
import './Auth.css'

export function AuthLayout() {
  return (
    <div className="auth-shell">
      <div className="auth-panel card">
        <Link to="/" className="auth-brand">
          <BrandLogo size="lg" withWordmark />
        </Link>
        <Outlet />
      </div>
    </div>
  )
}
