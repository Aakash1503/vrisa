import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    const mouse = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })
    gsap.set(dot, { x: mouse.x, y: mouse.y })
    gsap.set(ring, { x: pos.x, y: pos.y })

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      gsap.set(dot, { x: mouse.x, y: mouse.y })
    }

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.08
      pos.y += (mouse.y - pos.y) * 0.08
      gsap.set(ring, { x: pos.x, y: pos.y })
    }

    gsap.ticker.add(tick)
    window.addEventListener('mousemove', onMouseMove)

    const onMouseOver = (e) => {
      if (e.target.closest('a, button')) {
        gsap.to(dot, { scale: 1.8, duration: 0.3, ease: 'power2.out' })
        gsap.to(ring, { scale: 1.4, duration: 0.3, ease: 'power2.out' })
      }
    }

    const onMouseOut = (e) => {
      if (e.target.closest('a, button')) {
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 7,
          height: 7,
          background: 'var(--terra)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          border: '1px solid rgba(196,120,74,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  )
}
