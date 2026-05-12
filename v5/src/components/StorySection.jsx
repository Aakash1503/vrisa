import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import PlaceholderImage from './PlaceholderImage.jsx'

export default function StorySection() {
  const rightRef = useRef(null)
  useReveal(rightRef, { y: 20, duration: 1.2, start: 'top 75%' })

  return (
    <section style={{ background: 'var(--parchment-deep)', padding: '10rem 6vw' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8vw',
        alignItems: 'start',
      }}>
        {/* Left — image */}
        <div>
          <PlaceholderImage
            src="/images/3.jpg"
            alt="Rahul and Shikha Mangal"
            aspectRatio="3/4"
          />
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 200,
            fontSize: '0.52rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginTop: '1rem',
          }}>
            Narain Niwas Palace, Jaipur · 2013
          </p>
        </div>

        {/* Right — story */}
        <div ref={rightRef} style={{ position: 'sticky', top: '8rem' }}>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 300,
            fontSize: '0.52rem',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'var(--terra)',
            marginBottom: '2.5rem',
          }}>
            The Significant Two
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(2rem, 3.2vw, 3rem)',
            color: 'var(--ink)',
            lineHeight: 1.25,
            marginBottom: '2.5rem',
          }}>
            Born from a rejection of everything fast
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 480 }}>
            {[
              `In June 2013, Rahul and Shikha Mangal founded Vrisa as a quiet act of defiance — not against fashion, but against its speed. Rahul, a graduate of NIFT New Delhi, had spent years watching intensified consumerism erode the craft traditions he loved. Shikha brought the technical vision. Together they became what the brand calls the Significant Two.`,
              `What began on small patches of fabric has grown into a living archive of India's greatest craft traditions. Over 250 artisan families — many with the brand since its first stitch — carry the knowledge of Bandhani, Kashmiri running stitch, Central Asian embroidery, and Mughal block printing into every piece.`,
              `Their atelier is housed at Narain Niwas Palace in Jaipur, built in 1928. Every corner offers something new to discover. It is designed to make you feel closest to the old era — because that is precisely where every Vrisa piece begins.`,
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: 'Jost, sans-serif',
                fontWeight: 200,
                fontSize: '0.82rem',
                lineHeight: 2.3,
                color: 'var(--ink-light)',
              }}>
                {para}
              </p>
            ))}
          </div>

          <blockquote style={{
            marginTop: '3rem',
            paddingLeft: '1.5rem',
            borderLeft: '1px solid var(--terra)',
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: '1.1rem',
              color: 'var(--terra)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              "We do not make clothes. We make objects of memory."
            </p>
            <p style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 200,
              fontSize: '0.55rem',
              letterSpacing: '0.15em',
              color: 'var(--muted)',
              marginTop: '0.8rem',
            }}>
              — Rahul Mangal, Founder
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
