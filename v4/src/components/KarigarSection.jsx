import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'

export default function KarigarSection() {
  const textRef = useRef(null)
  useReveal(textRef)

  return (
    <section>
      <div style={{ width: '100%', height: '70vh', overflow: 'hidden' }}>
        <img
          src="/images/5.jpg"
          alt="Karigar at work"
          loading="lazy"
          onError={(e) => {
            const parent = e.currentTarget.parentElement
            e.currentTarget.style.display = 'none'
            parent.style.background = 'var(--parchment-deep)'
            parent.style.display = 'flex'
            parent.style.alignItems = 'center'
            parent.style.justifyContent = 'center'
            const label = document.createElement('span')
            label.textContent = 'karigar.jpg'
            label.style.cssText = 'font-family:Jost,sans-serif;font-weight:200;font-size:0.6rem;letter-spacing:0.15em;color:var(--muted)'
            parent.appendChild(label)
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
      </div>

      <div style={{ background: 'var(--parchment)', padding: '4rem 6vw 6rem' }}>
        <div ref={textRef} style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '6vw',
        }}>
          <div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              color: 'var(--ink)',
              lineHeight: 1.1,
            }}>
              Threadtales
            </h2>
          </div>

          <div>
            <p style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 200,
              fontSize: '0.82rem',
              lineHeight: 2.3,
              color: 'var(--ink-light)',
              maxWidth: 520,
              marginBottom: '2rem',
            }}>
              Before it becomes something you wear, it lives in the hands. 250 karigars — block printers, embroiderers, weavers — many of whom have worked with Vrisa since 2013. Their generational knowledge lives inside every stitch. When your piece arrives, it comes with its own archive: the story of its making, the hands behind it.
            </p>

            <a
              href="#"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontWeight: 300,
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'var(--terra)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(196,120,74,0.3)',
                paddingBottom: 2,
                display: 'inline-block',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'rgba(196,120,74,1)'}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'rgba(196,120,74,0.3)'}
            >
              Read about our karigars →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
