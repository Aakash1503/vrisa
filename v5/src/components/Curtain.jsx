import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import TextType from './TextType'

export default function Curtain({ contentRef, brandRef }) {
  const curtainRef = useRef(null)
  const textWrapRef = useRef(null)
  const blurObj = useRef({ val: 16 })

  useEffect(() => {
    const curtain = curtainRef.current
    const content = contentRef?.current
    const brand = brandRef?.current
    const textWrap = textWrapRef.current

    if (!curtain || !content) return

    // --- INITIAL STATES ---
    gsap.set(content, { opacity: 0.4 })
    content.style.filter = 'blur(16px)'
    gsap.set(curtain, { opacity: 1 })
    gsap.set(textWrap, { opacity: 1 })
    if (brand) gsap.set(brand, { opacity: 0 })

    const applyBlur = () => {
      if (content) {
        content.style.filter = `blur(${blurObj.current.val}px)`
      }
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // --- PHASE 1: TEXT TYPES ITSELF ---
      // TextType handles the typing animation independently.
      // The full string "Made slowly. For you." at 65ms per
      // character takes approximately 1.43s to complete.
      // The GSAP timeline runs the blur and curtain sequence
      // alongside it — they are synchronised by timing only.

      // --- PHASE 2: BLUR CLEARS ---
      // Starts at 0.8s — site world begins emerging
      // while typing is still in progress
      tl.to(content, {
        opacity: 1,
        duration: 2.4,
        ease: 'power2.inOut',
      }, 0.8)

      tl.to(blurObj.current, {
        val: 0,
        duration: 2.6,
        ease: 'power2.inOut',
        onUpdate: applyBlur,
      }, 0.8)

      // --- PHASE 3: TEXT EXIT ---
      // At 2.2s — typing is complete, text has been read,
      // now it lifts and fades as the site arrives
      tl.to(textWrap, {
        opacity: 0,
        y: -12,
        duration: 0.6,
        ease: 'power2.in',
      }, 2.8)

      // --- PHASE 4: CURTAIN FADES ---
      tl.to(curtain, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.in',
        onComplete: () => {
          curtain.style.display = 'none'
        },
      }, 2.6)

      // --- PHASE 5: BRAND ARRIVES ---
      if (brand) {
        tl.to(brand, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }, 2.9)
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={curtainRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'var(--parchment)',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={textWrapRef}
        style={{
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <TextType
            text="Made slowly."
            typingSpeed={70}
            initialDelay={400}
            loop={false}
            showCursor={false}
            className="curtain-typetext"
          />
          <TextType
            text="For you."
            typingSpeed={80}
            initialDelay={1600}
            loop={false}
            showCursor={true}
            cursorCharacter="|"
            cursorBlinkDuration={0.6}
            className="curtain-typetext"
          />
        </div>
      </div>
    </div>
  )
}
