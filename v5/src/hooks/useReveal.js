import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      y = 20,
      duration = 1,
      ease = 'power2.out',
      start = 'top 82%',
      delay = 0,
    } = options

    gsap.set(el, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration, ease, delay })
      },
      once: true,
    })

    return () => trigger.kill()
  }, [])
}
