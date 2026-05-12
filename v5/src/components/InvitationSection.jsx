import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import PlaceholderImage from './PlaceholderImage.jsx'

export default function InvitationSection() {
  const rightRef = useRef(null)
  useReveal(rightRef)

  return (
    <section style={{ background: '#DFD9CF', padding: '12rem 6vw' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8vw',
        alignItems: 'center',
      }}>
        {/* Left — image */}
        <PlaceholderImage
          src="/images/4.jpg"
          alt="Private commission"
          aspectRatio="3/4"
        />

        {/* Right — form */}
        <div ref={rightRef}>
          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 400,
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--ink-light)',
            marginBottom: '2rem',
          }}>
            Private Commissions · 2025
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            color: 'var(--ink)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
          }}>
            Begin a<br />conversation.
          </h2>

          <p style={{
            fontFamily: 'Jost, sans-serif',
            fontWeight: 400,
            fontSize: '0.9rem',
            lineHeight: 2.1,
            color: 'var(--ink-light)',
            marginBottom: '3rem',
          }}>
            Limited to 12 commissions per season.<br />
            Each piece takes six to twelve weeks.<br />
            Each piece comes with its own story.
          </p>

          <input
            type="email"
            placeholder="Your email address"
            style={{
              width: '100%',
              maxWidth: 360,
              border: 'none',
              borderBottom: '1px solid rgba(44,33,24,0.25)',
              background: 'transparent',
              padding: '0.8rem 0',
              fontFamily: 'Jost, sans-serif',
              fontWeight: 300,
              fontSize: '0.9rem',
              color: 'var(--ink)',
              letterSpacing: '0.05em',
              outline: 'none',
              display: 'block',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => e.currentTarget.style.borderBottomColor = 'rgba(44,33,24,0.7)'}
            onBlur={(e) => e.currentTarget.style.borderBottomColor = 'rgba(44,33,24,0.25)'}
          />

          <button
            style={{
              marginTop: '1.5rem',
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              cursor: 'none',
              display: 'block',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Send an enquiry →
          </button>
        </div>
      </div>
    </section>
  )
}
