import { useRef, useState } from 'react'

const DEFAULT_VIDEO = '/Videos/HeroVideo.mp4'

const videoMap = {
  samarkand:    '/Videos/HeroVideo2.mp4',
  ahir:         '/Videos/HeroVideo3.mp4',
  'char-chinar':'/videos/hero-char-chinar.mp4',
  bukhara:      '/videos/hero-bukhara.mp4',
  'bagh-e-gul': '/Videos/HeroVideo4.mp4',
  tuscany:      '/videos/hero-tuscany.mp4',
}

const collections = [
  { name: 'SAMARKAND',               region: 'Uzbekistan · Silk Route', year: '2023', videoKey: 'samarkand',    style: { left: '28vw', bottom: '38vh' } },
  { name: 'AHIR',                    region: 'Rajasthan · Kutch',        year: '2022', videoKey: 'ahir',         style: { left: '8vw',  bottom: '22vh' } },
  { name: 'CHAR CHINAR',             region: 'Kashmir · Persia',         year: '2021', videoKey: 'char-chinar',  style: { left: '55vw', bottom: '45vh' } },
  { name: 'BUKHARA',                 region: 'Central Asia',             year: '2022', videoKey: 'bukhara',      style: { left: '72vw', bottom: '28vh' } },
  { name: 'BAGH-E-GUL',              region: 'Mughal · Botanical',       year: '2023', videoKey: 'bagh-e-gul',   style: { left: '42vw', bottom: '18vh' } },
  { name: 'A POSTCARD FROM TUSCANY', region: 'Italy · Cross-cultural',   year: '2024', videoKey: 'tuscany',      style: { left: '62vw', bottom: '52vh' } },
]

const videoStyle = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'opacity 300ms ease',
}

const labelBase = {
  position: 'absolute',
  cursor: 'none',
  padding: '6px 8px',
  border: '1px solid transparent',
  transition: 'border-color 0.25s ease',
  lineHeight: 1.6,
  zIndex: 2,
}

const nameStyle = {
  display: 'block',
  fontSize: '0.55rem',
  textTransform: 'uppercase',
  letterSpacing: '0.25em',
  color: 'var(--ivory)',
}

const regionStyle = {
  display: 'block',
  fontSize: '0.55rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'rgba(245,239,228,0.6)',
}

const yearStyle = {
  display: 'block',
  fontSize: '0.55rem',
  color: 'rgba(245,239,228,0.4)',
}

function IconSound() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="2,6 6,6 10,2 10,16 6,12 2,12" fill="rgba(245,239,228,0.9)" />
      <path d="M12.5 5.5 C14.2 6.8 14.2 11.2 12.5 12.5" stroke="rgba(245,239,228,0.9)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M14.2 3.5 C17 5.5 17 12.5 14.2 14.5" stroke="rgba(245,239,228,0.6)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

function IconMuted() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="2,6 6,6 10,2 10,16 6,12 2,12" fill="rgba(245,239,228,0.4)" />
      <line x1="13" y1="6" x2="17" y2="12" stroke="rgba(245,239,228,0.6)" strokeWidth="1" strokeLinecap="round"/>
      <line x1="17" y1="6" x2="13" y2="12" stroke="rgba(245,239,228,0.6)" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function CollectionLabel({ name, region, year, style, onEnter, onLeave }) {
  return (
    <div
      style={{ ...labelBase, ...style }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(245,239,228,1)'
        onEnter()
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'transparent'
        onLeave()
      }}
    >
      <span style={nameStyle}>{name}</span>
      <span style={regionStyle}>{region}</span>
      <span style={yearStyle}>{year}</span>
    </div>
  )
}

export default function Hero({ onOpenDrawer, drawerOpen }) {
  const videoA     = useRef(null)
  const videoB     = useRef(null)
  const activeSlot = useRef('a')
  const audioRef   = useRef(null)
  const [playing, setPlaying] = useState(false)

  const switchTo = (src) => {
    const current = activeSlot.current === 'a' ? videoA.current : videoB.current
    const next    = activeSlot.current === 'a' ? videoB.current : videoA.current

    next.src = src
    next.load()
    next.play().catch(() => {})

    next.style.opacity    = '1'
    current.style.opacity = '0'

    activeSlot.current = activeSlot.current === 'a' ? 'b' : 'a'
  }

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  return (
    <section style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <audio
        ref={audioRef}
        src="/audio/BgAudio.mp3"
        loop
        style={{ display: 'none' }}
      />

      <video
        ref={videoA}
        autoPlay
        muted
        loop
        playsInline
        src={DEFAULT_VIDEO}
        style={{ ...videoStyle, opacity: 1 }}
      />

      <video
        ref={videoB}
        muted
        loop
        playsInline
        style={{ ...videoStyle, opacity: 0 }}
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to bottom right, rgba(0,0,0,0.35), rgba(0,0,0,0.1))',
      }} />

      <h1 style={{
        position: 'absolute',
        zIndex: 2,
        top: '3vw',
        left: '3vw',
        margin: 0,
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 100,
        fontSize: '18vw',
        color: '#F5EFE4',
        letterSpacing: '0.02em',
        lineHeight: 1,
      }}>
        VRISA
      </h1>

      <button
        onMouseEnter={onOpenDrawer}
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '2.5vw',
          right: '2.5vw',
          background: 'none',
          border: 'none',
          color: 'var(--ivory)',
          fontSize: '1.5rem',
          cursor: 'none',
          padding: 0,
          lineHeight: 1,
          transform: drawerOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 400ms ease',
        }}
      >
        +
      </button>

      {/* Sound toggle — bottom right */}
      <button
        onClick={toggleAudio}
        style={{
          position: 'absolute',
          zIndex: 2,
          bottom: '2.5vw',
          right: '2.5vw',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'none',
          padding: 0,
          opacity: playing ? 1 : 0.5,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,239,228,0.7)',
        }}>
          {playing ? 'SOUND ON' : 'SOUND OFF'}
        </span>
        {playing ? <IconSound /> : <IconMuted />}
      </button>

      {collections.map(c => (
        <CollectionLabel
          key={c.name}
          {...c}
          onEnter={() => switchTo(videoMap[c.videoKey])}
          onLeave={() => switchTo(DEFAULT_VIDEO)}
        />
      ))}
    </section>
  )
}
