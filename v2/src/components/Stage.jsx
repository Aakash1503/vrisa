import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const POEMS = [
  'A garden blooms on her back',
  'She stands like a memory the city refuses to forget',
  "Not where she's going. Just where she is.",
  'Earth remembers and the heart already knows',
  'A window that has learned the language of waiting',
  'Before it becomes something you wear, it lives in the hands',
]

const CREDITS = [
  'Bagh-E-Gul · Jaipur',
  'The Haveli Series · Jaipur',
  'A Postcard from Tuscany',
  'Ahir · Kutch',
  'Field of Daisies · Bhutan',
  'Threadtales · Jaipur',
]

const NAV_LINKS_LEFT = ['Story', 'Collections']
const NAV_LINKS_RIGHT = ['Threadtales', 'Commission']

const linkStyle = {
  fontFamily: "'Jost', sans-serif",
  fontSize: '0.55rem',
  fontWeight: 300,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(245,239,228,0.55)',
  textDecoration: 'none',
  transition: 'color 250ms',
}

export default function Stage() {
  const [activeIndex, setActiveIndex] = useState(0)

  const brandRef = useRef(null)
  const poemRef = useRef(null)
  const creditRef = useRef(null)
  const navRef = useRef(null)
  const lineRef = useRef(null)

  const prevIndexRef = useRef(0)
  const nextDisplayRef = useRef(0)
  const navVisibleRef = useRef(false)

  // Brand name fade in on load
  useEffect(() => {
    gsap.fromTo(
      brandRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, delay: 0.5, ease: 'power2.out' }
    )
  }, [])

  // Scroll invitation pulse
  useEffect(() => {
    const line = lineRef.current
    gsap.to(line, {
      opacity: 0.6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => { gsap.killTweensOf(line) }
  }, [])

  // Nav hidden on load
  useEffect(() => {
    gsap.set(navRef.current, { y: '-100%', opacity: 0 })
  }, [])

  // Nav reveal/hide on scroll and swipe
  useEffect(() => {
    let touchStartY = 0
    const nav = navRef.current

    const showNav = () => {
      if (navVisibleRef.current) return
      navVisibleRef.current = true
      gsap.to(nav, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    }

    const hideNav = () => {
      if (!navVisibleRef.current) return
      navVisibleRef.current = false
      gsap.to(nav, { y: '-100%', opacity: 0, duration: 0.4, ease: 'power2.in' })
    }

    const onWheel = (e) => {
      if (e.deltaY > 0) showNav()
      else hideNav()
    }

    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY }

    const onTouchMove = (e) => {
      const delta = touchStartY - e.touches[0].clientY
      if (delta > 5) showNav()
      else if (delta < -5) hideNav()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  // Auto-advance poetry — 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 6)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  // Poetry + credit transition on activeIndex change
  useEffect(() => {
    const prev = prevIndexRef.current
    const next = activeIndex
    prevIndexRef.current = next

    if (prev === next) return

    nextDisplayRef.current = next

    // Breathe out → pause → breathe in
    gsap.to([poemRef.current, creditRef.current], {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => {
        if (poemRef.current) poemRef.current.textContent = POEMS[nextDisplayRef.current]
        if (creditRef.current) creditRef.current.textContent = CREDITS[nextDisplayRef.current]
        gsap.delayedCall(0.6, () => {
          if (poemRef.current) {
            gsap.to(poemRef.current, { opacity: 0.75, duration: 1.2, ease: 'power2.out' })
          }
          if (creditRef.current) {
            gsap.to(creditRef.current, { opacity: 0.3, duration: 1.2, ease: 'power2.out' })
          }
        })
      },
    })
  }, [activeIndex])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>

      {/* Layer 1 — Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      >
        <source src="/Videos/Video8.mp4" type="video/mp4" />
      </video>

      {/* Layer 2 — Vignette top */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(30,20,12,0.5) 0%, transparent 25%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Layer 2 — Vignette bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(30,20,12,0.55) 0%, transparent 30%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Layer 3 — Brand name */}
      <div
        ref={brandRef}
        style={{
          position: 'absolute',
          top: '2.8rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: '0.9rem',
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          color: 'rgba(245,239,228,0.85)',
          whiteSpace: 'nowrap',
          opacity: 0,
          textShadow: '0 0 40px rgba(30,20,12,0.6), 0 1px 3px rgba(30,20,12,0.5)',
        }}
      >
        VRISA
      </div>

      {/* Layer 4 — Poetry line */}
      <p
        ref={poemRef}
        style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: 'italic',
          fontSize: '1.05rem',
          letterSpacing: '0.06em',
          color: 'rgba(245,239,228,1)',
          opacity: 0.75,
          margin: 0,
          textShadow: '0 0 30px rgba(30,20,12,0.7), 0 1px 2px rgba(30,20,12,0.6)',
        }}
      >
        <span style={{
          background: 'rgba(30,20,12,0.15)',
          padding: '0.3rem 1.2rem',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}>
          {POEMS[0]}
        </span>
      </p>

      {/* Layer 5 — Scroll invitation line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 1,
          background: 'rgba(245,239,228,0.25)',
          zIndex: 10,
          opacity: 0.25,
        }}
      />

      {/* Layer 6 — Navigation */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 60,
          background: 'rgba(30,20,12,0.7)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(245,239,228,0.06)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ paddingLeft: '2.5rem', display: 'flex', gap: '2rem', flex: 1 }}>
          {NAV_LINKS_LEFT.map((label) => (
            <a
              key={label}
              href="#"
              style={linkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,239,228,0.9)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,239,228,0.55)' }}
            >
              {label}
            </a>
          ))}
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: '1rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'rgba(245,239,228,0.85)',
            whiteSpace: 'nowrap',
          }}
        >
          VRISA
        </div>

        <div
          style={{
            paddingRight: '2.5rem',
            display: 'flex',
            gap: '2rem',
            justifyContent: 'flex-end',
            flex: 1,
          }}
        >
          {NAV_LINKS_RIGHT.map((label) => (
            <a
              key={label}
              href="#"
              style={linkStyle}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(245,239,228,0.9)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(245,239,228,0.55)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Layer 7 — Credit */}
      <p
        ref={creditRef}
        style={{
          position: 'absolute',
          bottom: '3.5rem',
          right: '2.5rem',
          zIndex: 10,
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.5rem',
          fontWeight: 200,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(245,239,228,1)',
          textAlign: 'right',
          opacity: 0.3,
          margin: 0,
        }}
      >
        {CREDITS[0]}
      </p>

    </div>
  )
}
