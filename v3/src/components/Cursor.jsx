import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const mouse = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
      }
    }

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.1
      ring.y += (mouse.y - ring.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
    }

    gsap.ticker.add(tick)
    window.addEventListener('mousemove', onMove)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('mousemove', onMove)
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
          width: '8px',
          height: '8px',
          background: 'var(--terra)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: '-4px',
          marginTop: '-4px',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1px solid var(--terra)',
          borderRadius: '50%',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 9999,
          marginLeft: '-16px',
          marginTop: '-16px',
          willChange: 'transform',
        }}
      />
    </>
  )
}
