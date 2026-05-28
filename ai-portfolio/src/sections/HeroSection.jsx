import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import HeroScene from '../scenes/HeroScene'
import TypewriterText from '../components/animations/TypewriterText'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import { useResponsive } from '../hooks/useResponsive'
import { magneticEffect } from '../utils/animations'

const HeroSection = () => {
  const { isMobile } = useResponsive()
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  
  const heroTexts = [
    "AI/ML Developer",
    "Full Stack Engineer",
    "3D Web Specialist",
    "Creative Technologist"
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(0.5)", delay: 0.5 }
      )
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
      )
      gsap.fromTo(buttonsRef.current?.children,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "elastic.out(1, 0.5)", delay: 1 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Magnetic buttons effect
  useEffect(() => {
    if (!isMobile && buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('.magnetic-button')
      const cleanups = []
      buttons.forEach(button => {
        const cleanup = magneticEffect(button, 0.3)
        cleanups.push(cleanup)
      })
      return () => cleanups.forEach(cleanup => cleanup())
    }
  }, [isMobile])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <HeroScene />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/80 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Glow Effect Behind Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-3xl animate-pulse" />
        </div>
        
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block px-4 py-2 rounded-full glassmorphism mb-6"
        >
          <span className="text-sm font-mono text-accent-cyan">
            ✦ WELCOME TO MY AI ECOSYSTEM ✦
          </span>
        </motion.div>
        
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 opacity-0"
        >
          <span className="text-gradient">Manish Kumar</span>
        </h1>
        
        {/* Animated Subtitle */}
        <div
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-text/80 mb-8 font-mono opacity-0"
        >
          <TypewriterText
            texts={heroTexts}
            typingSpeed={100}
            deletingSpeed={50}
            pauseDuration={2000}
          />
        </div>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="max-w-2xl mx-auto text-text/60 mb-12 text-lg"
        >
          Building immersive digital experiences with cutting-edge AI technology
          and cinematic 3D interactions. Pushing the boundaries of web innovation.
        </motion.p>
        
        {/* Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-wrap gap-6 justify-center"
        >
          <motion.button
            className="magnetic-button px-8 py-4 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary font-semibold relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 flex items-center gap-2">
              ✨ VIEW PROJECTS
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          <motion.button
            className="magnetic-button px-8 py-4 rounded-full border-2 border-accent-cyan/50 text-accent-cyan font-semibold relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('/resume.pdf', '_blank')}
          >
            <span className="relative z-10 flex items-center gap-2">
              📄 DOWNLOAD RESUME
            </span>
            <div className="absolute inset-0 bg-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          <motion.button
            className="magnetic-button px-8 py-4 rounded-full glassmorphism text-text font-semibold relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const assistant = document.querySelector('.assistant-trigger')
              assistant?.click()
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              🤖 CHAT WITH AI
            </span>
          </motion.button>
        </div>
        
        {/* Tech Stack Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 text-xs font-mono text-text/40"
        >
          <span>REACT 19</span>
          <span>✦</span>
          <span>THREE.JS</span>
          <span>✦</span>
          <span>AI INTEGRATION</span>
          <span>✦</span>
          <span>WEBGL</span>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}

export default HeroSection