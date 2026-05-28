import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Sparkles } from 'lucide-react'
import useStore from '../../store/useStore'

const AssistantToggle = () => {
  const { isAssistantOpen, toggleAssistant } = useStore()

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleAssistant}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-accent-purple to-accent-green shadow-lg flex items-center justify-center group"
      style={{ boxShadow: '0 0 20px rgba(123,47,247,0.5)' }}
    >
      <Bot className="w-6 h-6 text-primary group-hover:rotate-6 transition-transform" />
      <Sparkles className="w-3 h-3 text-accent-cyan absolute -top-1 -right-1 animate-pulse" />
      
      {/* Pulsing ring effect */}
      <div className="absolute inset-0 rounded-full bg-accent-purple/20 animate-ping opacity-0 group-hover:opacity-100" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-secondary text-xs text-accent-purple rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with AI
      </div>
    </motion.button>
  )
}

export default AssistantToggle