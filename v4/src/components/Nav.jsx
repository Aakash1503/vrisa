import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Nav({ brandRef }) {
  const navRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const underlineRef = useRef(null)
  const menuTextRef = useRef(null)

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

  const handleMouseEnter = () => {
    gsap.to(underlineRef.current, {
      scaleX: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(underlineRef.current, {
      scaleX: 0,
      duration: 0.25,
      ease: 'power2.in',
    })
  }

  useEffect(() => {
    if (!menuTextRef.current) return
    gsap.to(menuTextRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: 'none',
      onComplete: () => {
        if (menuTextRef.current) {
          menuTextRef.current.textContent = isOpen ? 'Close' : 'Menu'
        }
      }
    })
    gsap.to(menuTextRef.current, {
      opacity: 1,
      duration: 0.2,
      ease: 'power1.out',
      delay: 0.15,
    })
  }, [isOpen])

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
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
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

      <button
        onClick={handleMenuClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'none',
          border: 'none',
          padding: '0.4rem 0',
          cursor: 'none',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        <span
          ref={menuTextRef}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '0.75rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            opacity: 0.5,
            display: 'block',
            lineHeight: 1,
            transition: 'color 250ms ease',
          }}
        >
          Menu
        </span>

        <span
          ref={underlineRef}
          style={{
            display: 'block',
            height: '1px',
            width: '100%',
            background: 'var(--ink)',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
        />
      </button>
    </nav>
  )
}
