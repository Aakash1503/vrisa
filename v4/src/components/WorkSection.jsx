import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import PlaceholderImage from './PlaceholderImage.jsx'

const works = [
  { src: '/images/1.jpg', collection: 'The Haveli Series', region: 'Rajasthan · Jaipur', aspectRatio: '3/4' },
  { src: '/images/7.jpg', collection: 'Bagh-E-Gul', region: 'Mughal · Botanical', aspectRatio: '4/5' },
  { src: '/images/8.jpg', collection: 'A Postcard from Tuscany', region: 'Italy · Cross-cultural', aspectRatio: '16/9' },
  { src: '/images/2.jpg', collection: 'Ahir', region: 'Rajasthan · Kutch', aspectRatio: '1/1' },
  { src: '/images/6.jpg', collection: 'Threadtales', region: 'Narain Niwas · Jaipur', aspectRatio: '3/4' },
]

function WorkBlock({ work, style = {} }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 24 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [])

  return (
    <div ref={ref} style={style}>
      <PlaceholderImage src={work.src} alt={work.collection} aspectRatio={work.aspectRatio} />
      <div style={{ marginTop: '0.9rem' }}>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '0.95rem',
          color: 'var(--ink-light)',
          margin: 0,
        }}>
          {work.collection}
        </p>
        <p style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 200,
          fontSize: '0.52rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginTop: '0.6rem',
          margin: '0.6rem 0 0',
        }}>
          {work.region}
        </p>
      </div>
    </div>
  )
}

export default function WorkSection() {
  const labelRef = useRef(null)

  useEffect(() => {
    const el = labelRef.current
    if (!el) return

    gsap.set(el, { opacity: 0, y: 20 })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [])

  return (
    <section style={{ background: 'var(--parchment)', padding: '8rem 6vw' }}>
      <p ref={labelRef} style={{
        fontFamily: 'Jost, sans-serif',
        fontWeight: 300,
        fontSize: '0.55rem',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: 'var(--terra)',
        marginBottom: '5rem',
      }}>
        The Work
      </p>

      {/* Row 1 */}
      <div style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'flex-end',
        marginBottom: '4rem',
      }}>
        <WorkBlock work={works[0]} style={{ width: '42%' }} />
        <WorkBlock work={works[1]} style={{ width: '30%', marginBottom: '4rem' }} />
      </div>

      {/* Row 2 */}
      <div style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'flex-start',
        marginBottom: '4rem',
        justifyContent: 'flex-end',
      }}>
        <WorkBlock work={works[2]} style={{ width: '55%' }} />
      </div>

      {/* Row 3 */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-end',
        marginBottom: '4rem',
      }}>
        <WorkBlock work={works[3]} style={{ width: '28%' }} />
        <WorkBlock work={works[4]} style={{ width: '38%', marginTop: '-4rem' }} />
      </div>
    </section>
  )
}
