import React from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import useStore from '../../store/useStore'

const TerminalToggle = () => {
  const { isTerminalOpen, toggleTerminal } = useStore()

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTerminal}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple shadow-lg flex items-center justify-center group"
      style={{ boxShadow: '0 0 20px rgba(0,245,255,0.5)' }}
    >
      <Terminal className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-accent-cyan/20 animate-ping opacity-0 group-hover:opacity-100" />
    </motion.button>
  )
}

export default TerminalToggle