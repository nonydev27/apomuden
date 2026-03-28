import { useEffect } from 'react'
import { Link, useOutletContext, useLocation } from 'react-router-dom'
import { GHANA_LANGUAGES_SHOWCASE } from '../data/ghanaLanguages'
import { useScrollSpySections } from '../hooks/useScrollSpySections'
import '../styles/ui.css'
import './Landing.css'

/** Unsplash — healthcare & community imagery (free to use per Unsplash licence). */
const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=85&auto=format&fit=crop',
    alt: 'Bright, modern hospital corridor suggesting accessible care',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85&auto=format&fit=crop',
    alt: 'Clinician and patient in conversation during a consultation',
  },
  {
    src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=85&auto=format&fit=crop',
    alt: 'Expectant mother smiling gently, representing maternal wellbeing support',
  },
]

const FLOW_STEPS = [
  {
    n: '01',
    title: 'Speak or Type',
    body: 'Use everyday words in Twi, Ga, Adangbe, Ewe, or other Ghanaian languages or English.',
  },
  {
    n: '02',
    title: 'Apomuden AI → English',
    body: 'Non-English messages are translated to English so Apomuden can reason safely and consistently.',
  },
  {
    n: '03',
    title: 'Apomuden Guidance',
    body: 'You receive careful, non-diagnostic guidance: self-care ideas, red flags, and when to seek in-person or emergency care.',
  },
  {
    n: '04',
    title: 'English → You',
    body: 'Answers are translated back through Khaya when needed, so the guidance lands in the language you used.',
  },
]

const DISCLAIMER_POINTS = [
  {
    title: 'Not medical advice.',
    text: 'Information is general and may be incomplete for your situation.',
  },
  {
    title: 'No doctor–patient relationship.',
    text: 'Using this app does not create a duty of care.',
  },
  {
    title: 'Emergencies.',
    text: 'If you or someone else may be in danger, call your local emergency number immediately — do not wait for an AI reply.',
  },
  {
    title: 'Speech & AI errors.',
    text: 'Voice transcription and models can misunderstand; verify anything important with a professional.',
  },
  {
    title: 'Data handling.',
    text: 'This build sends your text to a configured API; host responsibly and never expose secrets in the browser.',
  },
]

/** Two identical runs for seamless CSS marquee loop. */
const MARQUEE_ITEMS = [
  ...GHANA_LANGUAGES_SHOWCASE,
  ...GHANA_LANGUAGES_SHOWCASE,
]

export function Landing() {
  const ctx = useOutletContext() || {}
  const onHomeSectionChange =
      typeof ctx.onHomeSectionChange === 'function'
        ? ctx.onHomeSectionChange
        : () => {}
  const location = useLocation()

  useScrollSpySections(onHomeSectionChange)

  useEffect(() => {
    if (location.pathname !== '/') return
    const hash = location.hash?.replace(/^#/, '')
    if (!hash) return
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => window.clearTimeout(t)
  }, [location.hash, location.pathname])

  return (
    <div className="home-scroll">
      <div className="home-ambient" aria-hidden="true">
        <div className="home-ambient__mesh" />
        <svg
          className="home-ambient__ecg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="home-ambient__ecg-line"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
            d="M0 60 L180 60 L200 60 L220 20 L240 100 L260 35 L280 60 L1200 60"
          />
        </svg>
        <span className="home-ambient__cross home-ambient__cross--1" />
        <span className="home-ambient__cross home-ambient__cross--2" />
        <span className="home-ambient__cross home-ambient__cross--3" />
        <span className="home-ambient__pulse-ring home-ambient__pulse-ring--1" />
        <span className="home-ambient__pulse-ring home-ambient__pulse-ring--2" />
        <div className="home-ambient__nodes">
          <span className="home-ambient__node" />
          <span className="home-ambient__node" />
          <span className="home-ambient__node" />
          <span className="home-ambient__link" />
        </div>
      </div>
      <section id="top" className="viewport-section hero-section">
        <div className="viewport-section__inner hero-grid">
          <div className="hero-copy">
            <div className="ai-status-strip">
              <span className="ai-status-strip__label">Apomuden AI</span>
              <span className="ai-status-strip__dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="ai-status-strip__text">
                Live pipeline · translate → reason → reply
              </span>
            </div>
            <p className="landing-eyebrow">
              Apomuden · companion · Made for Ghana & beyond
            </p>
            <h1 className="brand-font hero-title">
              Apomuden: Care that meets you in your language.
            </h1>
            <p className="hero-lead">
              A medical aid experience powered by AI and African language tech:
              ask health questions in Twi, Ga, Adangbe, Ewe, and more Ghanaian
              languages.
            </p>
            <div className="landing-cta">
              <Link to="/chat" className="btn btn--primary">
                Mobile app
              </Link>
            </div>
          </div>
          <div className="hero-collage" aria-hidden="false">
            {HERO_IMAGES.map((img, i) => (
              <figure key={img.src} className={`hero-fig hero-fig--${i + 1}`}>
                <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="viewport-section section-block section-how section-how--stack">
        <div className="viewport-section__inner section-inner how-inner">
          <div className="how-ai-rail" aria-label="AI-assisted flow">
            <span className="how-ai-rail__glow" />
            <span className="how-ai-rail__track" />
            <span className="how-ai-rail__knob" />
          </div>
          <p className="how-ai-caption">
            <strong className="how-ai-caption__strong">AI stack</strong>
            <span className="how-ai-caption__sep">·</span>
            Speech &amp; text → Khaya → safety-first model → your language
          </p>
          <h2 className="section-title brand-font capitalize">How It Works</h2>
          <p className="section-intro">
            One smooth pipeline: your language, clinical-safety-first reasoning in
            English, then back to you — with zero hype and clear limits.
          </p>
          <ol className="flow-grid">
            {FLOW_STEPS.map((step) => (
              <li key={step.n} className="flow-card card">
                <span className="flow-badge">{step.n}</span>
                <h3 className="brand-font flow-card-title">{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>

          <div id="how-disclaimer" className="how-disclaimer card">
            <h3 className="how-disclaimer__title brand-font">Disclaimer &amp; safety</h3>
            <p className="how-disclaimer__lead">
              Apomuden is an educational assistant. It does not replace licensed
              clinicians or emergency services.
            </p>
            <ul className="how-disclaimer__list">
              {DISCLAIMER_POINTS.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong> {item.text}
                </li>
              ))}
            </ul>
            <p className="how-disclaimer__foot">
              Continue to{' '}
              <a href="#care" className="inline-link">
                urgent care signs
              </a>{' '}
              below or{' '}
              <Link to="/chat" className="inline-link">
                open the mobile app page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section
        id="languages"
        className="viewport-section section-block section-lang section-lang--stack"
      >
        <div className="viewport-section__inner section-inner lang-section-body">
          <h2 className="section-title brand-font">Languages we celebrate</h2>
          <p className="section-intro lang-section-intro">
            Apomuden is designed for Ghanaian voices — Twi, Ga, Adangbe
            (Dangme), Ewe, and neighbours below. Khaya covers many officially;
            others may expand over time.
          </p>

          <div
            className="lang-marquee"
            role="region"
            aria-label="Scrolling list of supported and celebrated languages"
          >
            <div className="lang-marquee__track">
              {MARQUEE_ITEMS.map((L, i) => (
                <article
                  key={`${L.name}-${i}`}
                  className="lang-card lang-card--marquee"
                >
                  <span className="lang-chip">{L.tag}</span>
                  <h3 className="brand-font lang-name">{L.name}</h3>
                  <p className="lang-detail">{L.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="care" className="viewport-section section-block section-care">
        <div className="viewport-section__inner section-care-inner card">
          <h2 className="section-title brand-font">When to seek urgent care</h2>
          <p className="section-intro">
            Apomuden cannot see you, test you, or prescribe. Use emergency
            services for breathing trouble, severe chest pain, stroke signs,
            heavy bleeding, or anything that feels immediately life-threatening.
          </p>
          <ul className="care-list">
            <li>Trouble breathing, choking, or blue lips</li>
            <li>New confusion, fainting, or worst headache of your life</li>
            <li>Possible stroke: face droop, arm weakness, speech trouble</li>
            <li>Severe pain, trauma, or pregnancy bleeding with pain</li>
          </ul>
          <p className="care-foot">
            See our{' '}
            <Link to="/emergency" className="inline-link">
              full urgent-care page
            </Link>{' '}
            or jump to your{' '}
            <Link to="/chat" className="inline-link">
              mobile app
            </Link>
            .
          </p>
        </div>
      </section>

      <footer className="viewport-section site-footer" id="footer">
        <div className="site-footer__glow" aria-hidden />
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <span className="site-footer__mark brand-font">Apomuden</span>
            <p>
              Multilingual health information assistant. Built for Ghana, open to the
              world.
            </p>
          </div>
          <div className="site-footer__cols">
            <div>
              <h4 className="site-footer__heading brand-font">Explore</h4>
              <a href="#top">Home</a>
              <a href="#how">How it works</a>
              <a href="#how-disclaimer">Disclaimer</a>
              <a href="#languages">Languages</a>
              <a href="#care">Urgent care</a>
              <Link to="/chat">Mobile app</Link>
            </div>
            <div>
              <h4 className="site-footer__heading brand-font">Account</h4>
              <Link to="/chat">Mobile app</Link>
            </div>
            <div>
              <h4 className="site-footer__heading brand-font">Trust</h4>
              <a href="#how-disclaimer">Disclaimer &amp; safety</a>
              <Link to="/emergency">Emergency guide</Link>
            </div>
          </div>
          <div className="site-footer__langs" aria-label="Highlighted languages">
            {['Twi', 'Ga', 'Adangbe', 'Ewe', 'Fante', 'Dagbani', 'Hausa', 'English'].map(
              (x) => (
                <span key={x} className="site-footer__pill">
                  {x}
                </span>
              ),
            )}
          </div>
          <p className="site-footer__copy">
            © {new Date().getFullYear()} Apomuden. Not a substitute for
            professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
