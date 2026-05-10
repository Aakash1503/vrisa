import { useEffect, useState } from 'react'

const linkStyle = {
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.6rem',
  fontWeight: 300,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  transition: 'color 250ms ease',
  cursor: 'none',
}

function NavLink({ children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href="#"
      style={{ ...linkStyle, color: hovered ? 'var(--ink)' : 'var(--muted)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '72px',
        background: 'var(--parchment)',
        borderBottom: scrolled
          ? '1px solid rgba(44,33,24,0.15)'
          : '1px solid rgba(44,33,24,0.08)',
        transition: 'border-bottom 300ms ease',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '3rem',
        paddingRight: '3rem',
      }}
    >
      {/* Left links */}
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        <NavLink>Story</NavLink>
        <NavLink>Atelier</NavLink>
      </div>

      {/* Centre wordmark — absolutely centred */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: '1.4rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
          }}
        >
          VRISA
        </span>
      </div>

      {/* Right links */}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '2.5rem' }}>
        <NavLink>Threadtales</NavLink>
        <NavLink>Commission</NavLink>
      </div>
    </nav>
  )
}
