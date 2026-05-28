import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bot, MessageCircle, Sparkles, Zap, Brain, Cpu } from 'lucide-react'
import useStore from '../store/useStore'

const AssistantSection = () => {
  const { toggleAssistant } = useStore()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Context-Aware AI",
      description: "Understands your questions and provides relevant information about skills, projects, and experience"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Natural Conversation",
      description: "Chat naturally like talking to a human assistant"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Responses",
      description: "Get immediate answers to your questions"
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-secondary to-primary" />
      
      <div className="relative container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-4">
            <Bot className="w-4 h-4 text-accent-purple" />
            <span className="text-sm font-mono text-accent-purple">AI POWERED</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Intelligent AI Assistant</span>
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto">
            Meet your personal AI guide. Ask questions about my work, skills, projects,
            or anything you'd like to know - get instant, intelligent responses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glassmorphism rounded-2xl p-8 text-center group hover:glow-effect transition-all"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-accent-purple/20 to-accent-green/20 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-text/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glassmorphism-strong rounded-2xl p-6 border border-accent-purple/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-purple to-accent-green flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant Demo</h3>
                <p className="text-text/40 text-sm">Ask me anything!</p>
              </div>
              <Sparkles className="w-4 h-4 text-accent-cyan ml-auto animate-pulse" />
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-accent-purple" />
                </div>
                <div className="glassmorphism rounded-lg p-3 flex-1">
                  <p className="text-sm">Hi! I can tell you about Manish's projects, skills, experience, and more. What would you like to know?</p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <div className="glassmorphism rounded-lg p-3 max-w-[70%]">
                  <p className="text-sm">What projects has he worked on?</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-accent-cyan" />
                </div>
              </div>
            </div>

            <button
              onClick={toggleAssistant}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-purple to-accent-green text-primary font-semibold flex items-center justify-center gap-2 group hover:scale-105 transition-transform"
            >
              <Bot className="w-4 h-4" />
              <span>START CHATTING</span>
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AssistantSection