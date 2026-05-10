import { useEffect, useState } from 'react'

const navLinks = [
  { name: 'Silhouette',         desc: 'Where form meets fabric',             ghost: 'FORM'    },
  { name: 'Home Collection',    desc: 'Crafted for living spaces',           ghost: 'LIVING'  },
  { name: 'Our Story',          desc: 'The Significant Two since 2013',      ghost: 'ORIGINS' },
  { name: 'Atelier',            desc: 'Where every piece begins',            ghost: 'JAIPUR'  },
  { name: 'Commission a Piece', desc: 'Begin your conversation',             ghost: 'YOURS'   },
]

function NavLink({ name, desc, ghost, onGhostChange }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => { setHovered(true);  onGhostChange(ghost) }}
      onMouseLeave={() => { setHovered(false); onGhostChange('')    }}
      style={{ cursor: 'none' }}
    >
      <div style={{ padding: '1.4rem 0' }}>
        <div style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: '1.05rem',
          fontWeight: 100,
          color: hovered ? '#D4A89A' : '#F5EFE4',
          lineHeight: 1,
          marginBottom: '0.4rem',
          transition: 'color 300ms ease',
          letterSpacing: '0.12em',
        }}>
          {name}
        </div>
        <div style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.5rem',
          fontWeight: 200,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,239,228,0.35)',
        }}>
          {desc}
        </div>
      </div>
      <div style={{ height: '1px', background: 'rgba(196,120,74,0.15)' }} />
    </div>
  )
}

function SocialLink({ label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Jost', sans-serif",
        fontSize: '0.55rem',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: hovered ? '#C4784A' : 'rgba(245,239,228,0.3)',
        transition: 'color 300ms ease',
        cursor: 'none',
      }}
    >
      {label}
    </span>
  )
}

export default function Drawer({ isOpen, onClose }) {
  const [ghostWord, setGhostWord] = useState('')

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <>
      {/* SVG noise filter definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="vrisa-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" />
          </filter>
        </defs>
      </svg>

      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9990,
          background: 'rgba(0,0,0,0.4)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 400ms ease',
          cursor: 'none',
        }}
      />

      {/* Drawer panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 420,
        height: '100vh',
        zIndex: 9995,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 600ms cubic-bezier(0.76, 0, 0.24, 1)',
        overflow: 'hidden',
      }}>

        {/* Background: base color */}
        <div style={{ position: 'absolute', inset: 0, background: '#1E140C' }} />

        {/* Background: terracotta glow top-left */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 0% 0%, rgba(196,120,74,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Background: noise overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          filter: 'url(#vrisa-noise)',
          opacity: 0.045,
          background: '#fff',
          pointerEvents: 'none',
        }} />

        {/* Ghost word */}
        <div style={{
          position: 'absolute',
          right: '-1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: '10rem',
          lineHeight: 1,
          color: 'rgba(245,239,228,0.03)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: ghostWord ? 1 : 0,
          transition: 'opacity 400ms ease',
          zIndex: 0,
        }}>
          {ghostWord}
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '3.5rem',
          boxSizing: 'border-box',
        }}>

          {/* Top bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.5rem',
          }}>
            <span style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 200,
              fontSize: '1rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#B8965A',
            }}>
              VRISA
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ivory)',
                fontSize: '1.5rem',
                cursor: 'none',
                padding: 0,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Top separator */}
          <div style={{ height: '1px', background: 'rgba(196,120,74,0.15)', marginBottom: 0 }} />

          {/* Nav links */}
          <nav style={{ flex: 1 }}>
            {navLinks.map(link => (
              <NavLink
                key={link.name}
                {...link}
                onGhostChange={setGhostWord}
              />
            ))}
          </nav>

          {/* Bottom block */}
          <div>
            <div style={{ height: '1px', background: 'rgba(196,120,74,0.15)', marginBottom: '1.8rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.6rem',
                  fontWeight: 200,
                  letterSpacing: '0.15em',
                  color: 'rgba(245,239,228,0.3)',
                  marginBottom: '0.3rem',
                }}>
                  Narain Niwas Palace
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.6rem',
                  fontWeight: 200,
                  letterSpacing: '0.15em',
                  color: 'rgba(245,239,228,0.3)',
                }}>
                  Kanota Courtyard, Jaipur
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.4rem' }}>
                <SocialLink label="Instagram" />
                <SocialLink label="Pinterest" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
