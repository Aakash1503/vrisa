import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      gsap.set(dot, { x: e.clientX, y: e.clientY })
    }

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.08
      pos.current.y += (mouse.current.y - pos.current.y) * 0.08
      gsap.set(ring, { x: pos.current.x, y: pos.current.y })
    }

    window.addEventListener('mousemove', onMove)
    gsap.ticker.add(tick)

    const onEnter = () => {
      gsap.to(ring, { scale: 1.6, opacity: 0.8, duration: 0.3, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' })
    }

    const bindHoverTargets = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    bindHoverTargets()

    const observer = new MutationObserver(bindHoverTargets)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      observer.disconnect()
    }
  }, [])

  const ringStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 34,
    height: 34,
    border: '1px solid rgba(196,120,74,0.4)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    willChange: 'transform',
  }

  const dotStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 6,
    height: 6,
    background: 'var(--terra)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    willChange: 'transform',
  }

  return (
    <>
      <div ref={ringRef} style={ringStyle} />
      <div ref={dotRef} style={dotStyle} />
    </>
  )
}
