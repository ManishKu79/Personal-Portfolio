import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const fadeInUp = (element, delay = 0) => {
  return gsap.fromTo(element,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, delay, ease: 'power3.out' }
  )
}

export const staggerFadeIn = (elements, staggerAmount = 0.1) => {
  return gsap.fromTo(elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, stagger: staggerAmount, ease: 'back.out(0.5)' }
  )
}

export const createScrollReveal = (element, start = 'top 80%') => {
  return gsap.fromTo(element,
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: start,
        toggleActions: 'play none none reverse'
      }
    }
  )
}

export const magneticEffect = (element, strength = 0.5) => {
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY
    
    const deltaX = (mouseX - centerX) * strength
    const deltaY = (mouseY - centerY) * strength
    
    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.5,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    })
  }
  
  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}