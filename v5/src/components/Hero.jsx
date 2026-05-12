import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)

  useEffect(() => {
    const line1 = line1Ref.current
    const line2 = line2Ref.current
    if (!line1 || !line2) return

    gsap.set([line1, line2], { opacity: 0 })

    gsap.to(line1, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 2.4,
    })
    gsap.to(line2, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 2.7,
    })
  }, [])

  return (
    <section style={{ paddingTop: '52px', background: 'var(--parchment)' }}>
      <div style={{
        width: '100%',
        height: 'calc(100vh - 52px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        >
          <source src="/Video8.mp4" type="video/mp4" />
        </video>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(to top, rgba(30,20,12,0.5) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          zIndex: 2,
          width: 'max-content',
        }}>
          <p
            ref={line1Ref}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '1.3rem',
              letterSpacing: '0.04em',
              color: 'rgba(245,239,228,0.85)',
              textShadow: '0 0 40px rgba(30,20,12,0.5)',
              margin: 0,
            }}
          >
            Made for the ones who notice things.
          </p>
          <p
            ref={line2Ref}
            style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 400,
              fontSize: '0.72rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(245,239,228,0.85)',
              textShadow: '0 0 30px rgba(30,20,12,0.6)',
              marginTop: '0.4rem',
              margin: '0.4rem 0 0',
            }}
          >
            Vrisa · Jaipur · Est. 2013
          </p>
        </div>
      </div>
    </section>
  )
}
