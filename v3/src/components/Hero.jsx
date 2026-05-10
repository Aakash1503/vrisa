import { useState, useRef, useEffect } from 'react'

const COLLECTIONS = [
  { name: 'The Haveli Series',        video: '/videos/hero-default.mp4' },
  { name: 'Samarkand',                video: '/videos/hero-samarkand.mp4' },
  { name: 'Ahir',                     video: '/videos/hero-ahir.mp4' },
  { name: 'Char Chinar',              video: '/videos/hero-char-chinar.mp4' },
  { name: 'Bagh-E-Gul',              video: '/videos/hero-bagh-e-gul.mp4' },
  { name: 'A Postcard from Tuscany',  video: '/videos/hero-tuscany.mp4' },
]

export default function Hero() {
  const [activeSlot, setActiveSlot] = useState(0)
  const [activeVideo, setActiveVideo] = useState('a') // 'a' | 'b'
  const [muted, setMuted] = useState(true)
  const videoA = useRef(null)
  const videoB = useRef(null)

  // Load initial video on mount
  useEffect(() => {
    if (videoA.current) {
      videoA.current.src = COLLECTIONS[0].video
      videoA.current.play().catch(() => {})
    }
  }, [])

  const switchSlot = (index) => {
    if (index === activeSlot) return
    const incoming = activeVideo === 'a' ? videoB : videoA
    const incomingRef = incoming

    if (incomingRef.current) {
      incomingRef.current.src = COLLECTIONS[index].video
      incomingRef.current.muted = muted
      incomingRef.current.play().catch(() => {})
    }

    setActiveSlot(index)
    setActiveVideo(prev => prev === 'a' ? 'b' : 'a')
  }

  const toggleSound = () => {
    const newMuted = !muted
    setMuted(newMuted)
    const activeRef = activeVideo === 'a' ? videoA : videoB
    if (activeRef.current) activeRef.current.muted = newMuted
  }

  const videoStyle = (isActive) => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: isActive ? 1 : 0,
    transition: 'opacity 600ms ease',
  })

  return (
    <div
      style={{
        position: 'relative',
        height: 'calc(100vh - 108px)',
        width: '100vw',
      }}
    >
      {/* Video wrapper — clips video, does NOT clip card or pagination */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoA}
          muted
          loop
          playsInline
          style={videoStyle(activeVideo === 'a')}
        />
        <video
          ref={videoB}
          muted
          loop
          playsInline
          style={videoStyle(activeVideo === 'b')}
        />
      </div>

      {/* Pagination dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 5,
        }}
      >
        {COLLECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => switchSlot(i)}
            style={{
              width: activeSlot === i ? '20px' : '5px',
              height: '5px',
              background: 'var(--ivory)',
              opacity: activeSlot === i ? 1 : 0.5,
              borderRadius: activeSlot === i ? '3px' : '50%',
              transition: 'width 400ms ease, opacity 400ms ease',
            }}
          />
        ))}
      </div>

      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2.5rem',
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.52rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(245,239,228,0.5)',
          zIndex: 5,
          transition: 'color 200ms ease',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,239,228,0.85)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,239,228,0.5)'}
      >
        {muted ? 'Sound On' : 'Sound Off'}
      </button>

      {/* Floating text card — bleeds 80px below hero */}
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '320px',
          background: 'var(--parchment)',
          padding: '2.5rem 2.5rem 3rem',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: '1.6rem',
            color: 'var(--ink)',
            letterSpacing: '0.04em',
          }}
        >
          {COLLECTIONS[activeSlot].name}
        </p>
        <div style={{ margin: '1.2rem 0' }} />
        <a
          href="#"
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.58rem',
            fontWeight: 300,
            letterSpacing: '0.2em',
            color: 'var(--terra)',
            opacity: 1,
            transition: 'opacity 200ms ease',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          — Explore —
        </a>
      </div>
    </div>
  )
}
