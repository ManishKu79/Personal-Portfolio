import { useEffect, useState } from 'react'

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setScreenSize({ width, height })
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsDesktop(width >= 1024)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return { isMobile, isTablet, isDesktop, screenSize }
}