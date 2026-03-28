import { Link } from 'react-router-dom'
import mobileImg from '../assets/mobile.jpg'
import '../styles/ui.css'
import './ChatMobile.css'

const STEPS = [
  {
    title: 'Download Apomuden',
    text: 'Install the app from the App Store or Google Play when available — the same account you use here carries over.',
  },
  {
    title: 'Choose your language',
    text: 'Set Twi, Ga, Adangbe, Ewe, or English before you start. Voice and text both respect your selection.',
  },
  {
    title: 'Ask in your own words',
    text: 'Describe symptoms or concerns naturally. The app routes through Khaya and our AI stack for careful, non-diagnostic guidance.',
  },
  {
    title: 'Privacy on device',
    text: 'Conversations stay oriented around education and safety — not replacing your clinician or emergency services.',
  },
]

export function ChatCare() {
  return (
    <div className="app-promo">
      <div className="app-promo__intro">
        <p className="app-promo__eyebrow">Mobile-first experience</p>
        <h1 className="app-promo__title brand-font">Use Apomuden on your phone</h1>
        <p className="app-promo__lead">
          Consultations, voice input, and language switching are designed for the
          mobile app. This page is a preview of what you&apos;ll get once you open
          Apomuden on iOS or Android.
        </p>
        <div className="app-promo__stores">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="app-promo__store-badge"
            aria-label="Download on the App Store"
          >
            <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="120" height="40" rx="6" fill="#000"/>
              <text x="38" y="13" fill="#fff" fontSize="7" fontFamily="system-ui,sans-serif">Download on the</text>
              <text x="38" y="27" fill="#fff" fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="600">App Store</text>
              <path d="M18 8.5c1.8-2.1 4.4-2.5 4.4-2.5s.4 2.4-1.4 4.7c-1.9 2.4-4.1 2-4.1 2s-.5-2.1 1.1-4.2zm-1.1 5.8c1 0 2.8-1.3 5.2-1.3 4.1 0 5.7 2.9 5.7 2.9s-3.1 1.6-3.1 5.5c0 4.4 3.9 5.9 3.9 5.9s-2.7 7.7-6.4 7.7c-1.7 0-3-1.1-4.7-1.1-1.8 0-3.6 1.2-4.7 1.2-3.4 0-7.7-7.3-7.7-13.2 0-5.8 3.6-8.8 7-8.8 2.1 0 3.8 1.2 4.8 1.2z" fill="#fff" transform="translate(4,4) scale(0.72)"/>
            </svg>
          </a>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="app-promo__store-badge"
            aria-label="Get it on Google Play"
          >
            <svg viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="135" height="40" rx="6" fill="#000"/>
              <text x="46" y="13" fill="#fff" fontSize="7" fontFamily="system-ui,sans-serif">GET IT ON</text>
              <text x="46" y="27" fill="#fff" fontSize="13" fontFamily="system-ui,sans-serif" fontWeight="600">Google Play</text>
              <path d="M8 5.5l14.5 8.4-3.2 3.1L8 5.5zm-1 .6v28l11.5-14L7 6.1zm16.5 9.6l3.5 2-3.5 2-3.2-2 3.2-2zm-5 8.7l3.2 3.1L7 34.5l11.5-10.1z" fill="url(#gp)" transform="translate(6,4) scale(0.85)"/>
              <defs>
                <linearGradient id="gp" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d2ff"/>
                  <stop offset="33%" stopColor="#00e676"/>
                  <stop offset="66%" stopColor="#ffeb3b"/>
                  <stop offset="100%" stopColor="#ff5252"/>
                </linearGradient>
              </defs>
            </svg>
          </a>
        </div>
        <Link to="/" className="btn btn--ghost app-promo__back">
          ← Back to home
        </Link>
      </div>

      <div className="app-promo__device-wrap">
        <div className="app-promo__device">
          <img
            src={mobileImg}
            alt="Apomuden mobile app preview"
            className="app-promo__mobile-img"
          />
        </div>

        <ul className="app-promo__steps">
          {STEPS.map((s) => (
            <li key={s.title} className="app-promo__step card">
              <h2 className="brand-font app-promo__step-title">{s.title}</h2>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
