// src/sections/HeroSection.jsx - FIXED animation glitches
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HeroScene from '../scenes/HeroScene'
import TypewriterText from '../components/animations/TypewriterText'
import ScrollIndicator from '../components/ui/ScrollIndicator'
import { useResponsive } from '../hooks/useResponsive'
import useStore from '../store/useStore'

const HeroSection = () => {
  const { isMobile } = useResponsive()
  const { toggleAssistant } = useStore()
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    // Delay animation for better performance
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const heroTexts = [
    "AI/ML Developer",
    "Full Stack Engineer",
    "3D Web Specialist",
    "Creative Technologist"
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />
      
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/80 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-block px-4 py-2 rounded-full glassmorphism">
              <span className="text-sm font-mono text-accent-cyan">
                ✦ WELCOME TO MY AI ECOSYSTEM ✦
              </span>
            </div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-8xl font-bold">
            <span className="text-gradient">Manish Kumar</span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl text-text/80 font-mono">
            <TypewriterText
              texts={heroTexts}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
            />
          </motion.div>
          
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-text/60 text-lg">
            Building immersive digital experiences with cutting-edge AI technology
            and cinematic 3D interactions. Pushing the boundaries of web innovation.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary font-semibold relative overflow-hidden group"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10 flex items-center gap-2">
                ✨ VIEW PROJECTS
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-accent-cyan/50 text-accent-cyan font-semibold group"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              <span className="flex items-center gap-2">
                📄 DOWNLOAD RESUME
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full glassmorphism text-text font-semibold group"
              onClick={() => toggleAssistant()}
            >
              <span className="flex items-center gap-2">
                🤖 CHAT WITH AI
              </span>
            </motion.button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4 text-xs font-mono text-text/40">
            <span>REACT 19</span>
            <span>✦</span>
            <span>THREE.JS</span>
            <span>✦</span>
            <span>AI INTEGRATION</span>
            <span>✦</span>
            <span>WEBGL</span>
          </motion.div>
        </motion.div>
      </div>
      
      <ScrollIndicator />
    </section>
  )
}

export default HeroSection