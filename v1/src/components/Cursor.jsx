import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.set(dot, { x: mouseX, y: mouseY })
    }

    const ticker = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX, y: ringY })
    }

    window.addEventListener('mousemove', onMouseMove)
    gsap.ticker.add(ticker)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      gsap.ticker.remove(ticker)
    }
  }, [])

  const base = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          ...base,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'var(--terra)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...base,
          width: 38,
          height: 38,
          borderRadius: '50%',
          border: '1px solid var(--ivory)',
          background: 'transparent',
        }}
      />
    </>
  )
}
