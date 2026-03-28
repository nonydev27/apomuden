import './BrandLogo.css'

/** Mark + ECG pulse — use inside nav or auth cards */
export function BrandLogo({ size = 'md', withWordmark = false }) {
  const sz = size === 'sm' ? 'brand-logo--sm' : size === 'lg' ? 'brand-logo--lg' : ''
  return (
    <span className={`brand-logo ${sz}`} aria-hidden>
      <svg className="brand-logo__svg" viewBox="0 0 56 56" role="img">
        <title>Apomuden</title>
        <defs>
          <linearGradient id="auraHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(70, 146, 100)" />
            <stop offset="100%" stopColor="rgb(33, 74, 68)" />
          </linearGradient>
        </defs>
        <path
          className="brand-logo__heart"
          fill="url(#auraHeartGrad)"
          d="M28 12.2c-3.1-3.4-8.3-3.1-11.3.4-3.1 3.6-2.8 9 .8 12.8L28 39.6l10.5-14.2c3.6-3.8 3.9-9.2.8-12.8-3-3.5-8.2-3.8-11.3-.4z"
        />
        <path
          className="brand-logo__pulse"
          fill="none"
          stroke="rgb(33, 74, 68)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 40h6l3-8 4 16 5-24 4 20 5-14 5 10h14"
        />
      </svg>
      {withWordmark ? (
        <span className="brand-logo__word brand-font">Apomuden</span>
      ) : null}
    </span>
  )
}
