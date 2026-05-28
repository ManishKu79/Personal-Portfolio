import { useEffect, useState } from 'react'
import useStore from '../store/useStore'

export const usePerformance = () => {
  const [fps, setFps] = useState(60)
  const { setHighPerformance, setReducedMotion } = useStore()
  
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId
    
    const measureFPS = () => {
      frameCount++
      const now = performance.now()
      
      if (now - lastTime >= 1000) {
        const currentFPS = frameCount
        setFps(currentFPS)
        
        // Auto-adjust performance based on FPS
        if (currentFPS < 30) {
          setHighPerformance(false)
          setReducedMotion(true)
        } else if (currentFPS > 50) {
          setHighPerformance(true)
          // Don't auto-enable motion for user preference
        }
        
        frameCount = 0
        lastTime = now
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }
    
    animationId = requestAnimationFrame(measureFPS)
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [setHighPerformance, setReducedMotion])
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handler = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [setReducedMotion])
  
  return { fps }
}