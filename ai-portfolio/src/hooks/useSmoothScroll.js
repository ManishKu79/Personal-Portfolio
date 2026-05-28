// src/hooks/useSmoothScroll.js - NEW optimized hook
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export const useSmoothScroll = () => {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      if (lenisRef.current) {
        lenisRef.current.raf(time)
      }
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  return lenisRef.current
}