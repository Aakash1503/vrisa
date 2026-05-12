const linkStyle = {
  fontFamily: 'Jost, sans-serif',
  fontWeight: 400,
  fontSize: '0.85rem',
  color: 'var(--ink-light)',
  textDecoration: 'none',
  lineHeight: 2.2,
  display: 'block',
  transition: 'color 250ms',
}

function FooterLink({ children }) {
  return (
    <a
      href="#"
      style={linkStyle}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-light)'}
    >
      {children}
    </a>
  )
}

const colHeaderStyle = {
  fontFamily: 'Jost, sans-serif',
  fontWeight: 500,
  fontSize: '0.65rem',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: 'var(--ink-light)',
  marginBottom: '1.5rem',
}

export default function Footer() {
  return (
    <footer style={{ background: '#DFD9CF', borderTop: '1px solid rgba(44,33,24,0.08)', padding: '4rem 6vw 3rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '4rem',
      }}>
        {/* Column 1 */}
        <div>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: '1.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            marginBottom: '1.2rem',
          }}>
            Vrisa
          </p>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 400,
            fontSize: '0.8rem',
            lineHeight: 2,
            letterSpacing: '0.1em',
            color: 'var(--ink-light)',
          }}>
            Narain Niwas Palace, Kanota Courtyard<br />
            Jaipur, Rajasthan · Est. 2013
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <p style={colHeaderStyle}>Explore</p>
          {['Story', 'Collections', 'Threadtales', 'Atelier', 'Commission', 'Foundation'].map((label) => (
            <FooterLink key={label}>{label}</FooterLink>
          ))}
        </div>

        {/* Column 3 */}
        <div>
          <p style={colHeaderStyle}>Connect</p>
          {['Instagram', 'Pinterest', 'Press', 'Contact'].map((label) => (
            <FooterLink key={label}>{label}</FooterLink>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(44,33,24,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 400,
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          color: 'var(--ink-light)',
        }}>
          © 2025 Vrisa. All rights reserved.
        </p>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 400,
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          color: 'var(--ink-light)',
        }}>
          Made with intention · Jaipur
        </p>
      </div>
    </footer>
  )
}
