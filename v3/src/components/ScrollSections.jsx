import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SECTIONS = [
  {
    region: 'Rajasthan · Jaipur',
    name: 'The Haveli Series',
    line: 'She stands like a memory the city refuses to forget',
    image: '/images/section-1.jpg',
  },
  {
    region: 'Mughal · Botanical',
    name: 'Bagh-E-Gul',
    line: 'A garden blooms on her back',
    image: '/images/section-2.jpg',
  },
  {
    region: 'Italy · Cross-cultural',
    name: 'A Postcard from Tuscany',
    line: 'Soft silhouettes and sunlit stillness',
    image: '/images/section-3.jpg',
  },
  {
    region: 'Rajasthan · Kutch',
    name: 'Ahir',
    line: 'Earth remembers and the heart already knows',
    image: '/images/section-4.jpg',
  },
  {
    region: 'Uzbekistan · Silk Route',
    name: 'Samarkand',
    line: 'Where the archaic breathes again',
    image: '/images/section-5.jpg',
  },
]

export default function ScrollSections() {
  const sectionRefs = useRef([])

  useEffect(() => {
    const tweens = []

    sectionRefs.current.forEach((section) => {
      if (!section) return
      const img = section.querySelector('.parallax-img')
      if (!img) return

      const st = gsap.fromTo(
        img,
        { y: '-6%' },
        {
          y: '6%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
      tweens.push(st)
    })

    return () => {
      tweens.forEach(t => t && t.kill())
    }
  }, [])

  return (
    <div
      style={{
        background: 'var(--parchment)',
        paddingTop: '120px',
      }}
    >
      {SECTIONS.map((section, i) => (
        <div key={section.name}>
          {/* Editorial section */}
          <div
            ref={el => sectionRefs.current[i] = el}
            style={{
              position: 'relative',
              height: '100vh',
              overflow: 'hidden',
            }}
          >
            <img
              className="parallax-img"
              src={section.image}
              alt={section.name}
              style={{
                position: 'absolute',
                top: '-10%',
                left: 0,
                width: '100%',
                height: '120%',
                objectFit: 'cover',
              }}
            />

            {/* Text overlay — bottom left */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: '0 0 4rem 4rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.52rem',
                  fontWeight: 300,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '0.8rem',
                }}
              >
                {section.region}
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  color: 'var(--ivory)',
                  lineHeight: 1.1,
                }}
              >
                {section.name}
              </p>
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 200,
                  letterSpacing: '0.08em',
                  color: 'rgba(245,239,228,0.6)',
                  marginTop: '0.8rem',
                  maxWidth: '380px',
                }}
              >
                {section.line}
              </p>
            </div>
          </div>

          {/* Parchment divider between sections (not after last) */}
          {i < SECTIONS.length - 1 && (
            <div style={{ height: '80px', background: 'var(--parchment)' }} />
          )}
        </div>
      ))}
    </div>
  )
}
