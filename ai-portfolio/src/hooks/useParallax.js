import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const scrolled = window.scrollY
      gsap.to(ref.current, {
        y: scrolled * speed,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}