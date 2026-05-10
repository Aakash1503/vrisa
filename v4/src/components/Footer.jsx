const linkStyle = {
  fontFamily: 'Jost, sans-serif',
  fontWeight: 200,
  fontSize: '0.68rem',
  color: 'rgba(245,239,228,0.4)',
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
      onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(245,239,228,0.85)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,239,228,0.4)'}
    >
      {children}
    </a>
  )
}

const colHeaderStyle = {
  fontFamily: 'Jost, sans-serif',
  fontWeight: 300,
  fontSize: '0.5rem',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: 'var(--terra)',
  marginBottom: '1.5rem',
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', borderTop: '1px solid rgba(245,239,228,0.06)', padding: '4rem 6vw 3rem' }}>
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
            color: 'var(--ivory)',
            marginBottom: '1.2rem',
          }}>
            Vrisa
          </p>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 200,
            fontSize: '0.62rem',
            lineHeight: 2,
            letterSpacing: '0.1em',
            color: 'rgba(245,239,228,0.3)',
          }}>
            Narain Niwas Palace, Kanota Courtyard<br />
            Jaipur, Rajasthan · Est. 2013
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <p style={colHeaderStyle}>Explore</p>
          {['Story', 'Collections', 'Threadtales', 'Atelier', 'Commission'].map((label) => (
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
        borderTop: '1px solid rgba(245,239,228,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 200,
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          color: 'rgba(245,239,228,0.2)',
        }}>
          © 2025 Vrisa. All rights reserved.
        </p>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 200,
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          color: 'rgba(245,239,228,0.2)',
        }}>
          Made with intention · Jaipur
        </p>
      </div>
    </footer>
  )
}
