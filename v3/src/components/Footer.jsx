const LINK_GROUPS = [
  {
    header: 'Explore',
    links: ['Story', 'Collections', 'Threadtales', 'Atelier'],
  },
  {
    header: 'Commission',
    links: ['How it Works', 'Begin a Piece', 'Bridal', 'Archive'],
  },
  {
    header: 'Connect',
    links: ['Instagram', 'Pinterest', 'Press', 'Contact'],
  },
]

function FooterLink({ children }) {
  return (
    <a
      href="#"
      style={{
        display: 'block',
        fontFamily: 'Jost, sans-serif',
        fontSize: '0.68rem',
        fontWeight: 200,
        color: 'rgba(245,239,228,0.6)',
        transition: 'color 250ms ease',
        cursor: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,239,228,1)'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,239,228,0.6)'}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer>
      {/* Part One — Terra */}
      <div
        style={{
          background: 'var(--terra)',
          padding: '5rem 4rem',
          display: 'flex',
          gap: '6rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Left column */}
        <div style={{ flexShrink: 0 }}>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(245,239,228,0.7)',
              marginBottom: '1.5rem',
            }}
          >
            Begin a Conversation
          </p>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '2.8rem',
              color: 'var(--ivory)',
              marginBottom: '2rem',
              lineHeight: 1.1,
            }}
          >
            Commission a piece
          </p>
          {/* Email input row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(245,239,228,0.3)',
              width: '320px',
            }}
          >
            <input
              type="email"
              placeholder="Your email"
              className="footer-email"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 200,
                color: 'var(--ivory)',
                padding: '0.6rem 0',
                cursor: 'none',
              }}
            />
            <span
              style={{
                color: 'rgba(245,239,228,0.6)',
                fontSize: '1rem',
                transition: 'opacity 200ms ease',
                cursor: 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
            >
              →
            </span>
          </div>
        </div>

        {/* Right column — link groups */}
        <div style={{ display: 'flex', gap: '4rem', paddingTop: '0.5rem' }}>
          {LINK_GROUPS.map(group => (
            <div key={group.header}>
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.5rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,239,228,0.45)',
                  marginBottom: '1.2rem',
                }}
              >
                {group.header}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {group.links.map(link => (
                  <FooterLink key={link}>{link}</FooterLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part Two — Parchment bar */}
      <div
        style={{
          background: 'var(--parchment)',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '4rem',
          paddingRight: '4rem',
        }}
      >
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.55rem',
            fontWeight: 200,
            letterSpacing: '0.15em',
            color: 'var(--muted)',
          }}
        >
          Narain Niwas Palace, Jaipur · Est. 2013
        </span>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem',
            letterSpacing: '0.4em',
            color: 'var(--ink)',
          }}
        >
          VRISA
        </span>
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.55rem',
            fontWeight: 200,
            color: 'var(--muted)',
          }}
        >
          © 2025 Vrisa. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
