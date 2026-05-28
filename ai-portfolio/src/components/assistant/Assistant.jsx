// src/components/assistant/Assistant.jsx - FIXED
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Send, Bot, Sparkles, ChevronUp, ChevronDown } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import useStore from '../../store/useStore'

const Assistant = () => {
  const { isAssistantOpen, toggleAssistant, addAssistantMessage, assistantMessages, isThinking, setIsThinking } = useStore()
  const [inputMessage, setInputMessage] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isAssistantOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
    scrollToBottom()
  }, [isAssistantOpen, assistantMessages])

  useEffect(() => {
    if (assistantMessages.length === 0) {
      addAssistantMessage({
        id: uuidv4(),
        type: 'ai',
        content: "✨ Hello! I'm your AI assistant. I can help you learn about skills, experience, projects, and more. What would you like to know?",
        timestamp: Date.now()
      })
    }
  }, [assistantMessages.length, addAssistantMessage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const generateAIResponse = useCallback(async (message) => {
    setIsThinking(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const lowerMessage = message.toLowerCase()
    let response = ''
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      response = "👋 Hello! How can I help you today?"
    } else if (lowerMessage.includes('project')) {
      response = "🎯 I have several projects including an AI-powered portfolio, neural style transfer app, predictive analytics dashboard, and more! Which one would you like to know about?"
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('tech')) {
      response = "💻 Technical skills include React, Three.js, Python, TensorFlow, Node.js, and many more. Any specific area you're interested in?"
    } else if (lowerMessage.includes('contact')) {
      response = "📬 You can reach out via email, LinkedIn, or GitHub. All links are available in the contact section!"
    } else {
      response = "🤔 I'm here to help! Feel free to ask about projects, skills, experience, or contact information."
    }
    
    setIsThinking(false)
    return response
  }, [setIsThinking])

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return
    
    const userMessage = {
      id: uuidv4(),
      type: 'user',
      content: inputMessage,
      timestamp: Date.now()
    }
    addAssistantMessage(userMessage)
    
    const question = inputMessage
    setInputMessage('')
    
    const aiResponse = await generateAIResponse(question)
    
    addAssistantMessage({
      id: uuidv4(),
      type: 'ai',
      content: aiResponse,
      timestamp: Date.now()
    })
  }, [inputMessage, addAssistantMessage, generateAIResponse])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isAssistantOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          height: isMinimized ? 'auto' : '550px',
          width: isMinimized ? '300px' : '380px'
        }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-6 right-6 z-[1000] glassmorphism-strong rounded-xl overflow-hidden shadow-2xl border border-accent-cyan/30"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 border-b border-accent-cyan/20">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-accent-cyan" />
            <span className="text-sm font-mono text-accent-cyan font-semibold">AI ASSISTANT</span>
            {isThinking && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 bg-accent-green rounded-full animate-bounce delay-200" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-text/10 rounded">
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button onClick={toggleAssistant} className="p-1 hover:bg-text/10 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="h-[420px] overflow-y-auto p-4 space-y-3">
              {assistantMessages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-primary'
                      : 'glassmorphism border border-accent-cyan/20'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-[10px] opacity-60 block mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-accent-cyan/10">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-secondary/50 rounded-lg px-3 py-2 text-sm text-text outline-none border border-accent-cyan/20 focus:border-accent-cyan/50 transition-colors resize-none"
                  rows="1"
                  style={{ minHeight: '40px', maxHeight: '80px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isThinking}
                  className="p-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Assistant