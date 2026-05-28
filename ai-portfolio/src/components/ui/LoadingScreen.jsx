import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = () => {
  const [bootSequence, setBootSequence] = useState([])
  const [progress, setProgress] = useState(0)
  
  const bootMessages = [
    'Initializing AI System...',
    'Loading Developer Profile...',
    'Activating Neural Networks...',
    'Rendering 3D Environment...',
    'Establishing Secure Connection...',
    'Calibrating Quantum Display...',
    'Loading Portfolio Modules...',
    'System Ready.'
  ]
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        setBootSequence(prev => [...prev, bootMessages[currentIndex]])
        setProgress((currentIndex + 1) / bootMessages.length * 100)
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 400)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-primary"
        exit={{
          opacity: 0,
          transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
        }}
      >
        <div className="relative w-full max-w-2xl px-8">
          {/* Holographic Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 via-accent-purple/20 to-accent-green/20 blur-3xl" />
          
          {/* Terminal Window */}
          <div className="relative glassmorphism-strong rounded-2xl overflow-hidden border border-accent-cyan/20">
            <div className="px-6 py-4 bg-secondary/50 border-b border-accent-cyan/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-4 text-xs font-mono text-accent-cyan/60">AI_BOOT_SEQUENCE.exe</span>
              </div>
            </div>
            
            <div className="p-6 font-mono text-sm">
              {bootSequence.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-2"
                >
                  <span className="text-accent-cyan">$</span>
                  <span className="text-text ml-2">{message}</span>
                </motion.div>
              ))}
              
              {bootSequence.length < bootMessages.length && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-accent-cyan ml-2"
                />
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="h-1 bg-secondary/50">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-green"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          
          {/* Progress Percentage */}
          <div className="mt-4 text-center">
            <span className="text-sm font-mono text-accent-cyan/60">
              {Math.floor(progress)}% COMPLETE
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingScreen