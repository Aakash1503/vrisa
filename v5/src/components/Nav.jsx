import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Nav({ brandRef }) {
  const navRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    ScrollTrigger.create({
      start: '80px top',
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: 'rgba(237,232,223,0.92)',
          backdropFilter: 'blur(8px)',
          borderBottomColor: 'rgba(44,33,24,0.06)',
          duration: 0.4,
          ease: 'power2.out',
        })
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: 'transparent',
          duration: 0.4,
          ease: 'power2.out',
        })
      },
    })
  }, [])

  const handleMenuClick = () => {
    setIsOpen(prev => !prev)
    console.log('Menu overlay — coming soon')
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 52,
        background: 'transparent',
        borderBottom: '1px solid transparent',
        padding: '0 2.8rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1.2rem',
      }}
    >
      <button
        onClick={handleMenuClick}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          opacity: 0.6,
        }}
      >
        <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--ink)' }} />
        <span style={{ display: 'block', width: '16px', height: '1px', background: 'var(--ink)' }} />
        <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--ink)' }} />
      </button>

      <span ref={brandRef} style={{ opacity: 0, display: 'flex', alignItems: 'center' }}>
        <img
          src="/Logo.webp"
          alt="Vrisá"
          style={{
            height: '22px',
            width: 'auto',
            display: 'block',
          }}
        />
      </span>
    </nav>
  )
}
