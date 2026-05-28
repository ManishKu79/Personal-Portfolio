import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bot, Sparkles, Cpu, Award, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const ProjectAIModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null)
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glassmorphism-strong rounded-2xl border border-accent-cyan/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-secondary/95 backdrop-blur-sm border-b border-accent-cyan/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gradient">AI Analysis: {project.title}</h2>
                  <p className="text-text/40 text-sm">Powered by GPT-4</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-text/10 transition-colors"
              >
                <X className="w-5 h-5 text-text/60" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* AI Summary */}
            <div className="glassmorphism rounded-xl p-5 border border-accent-cyan/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-accent-cyan" />
                <h3 className="font-semibold text-accent-cyan">AI-Generated Summary</h3>
              </div>
              <p className="text-text/80 leading-relaxed">{project.aiSummary}</p>
            </div>
            
            {/* Architecture */}
            <div className="glassmorphism rounded-xl p-5 border border-accent-purple/20">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-accent-purple" />
                <h3 className="font-semibold text-accent-purple">System Architecture</h3>
              </div>
              <p className="text-text/80 leading-relaxed">{project.architecture}</p>
            </div>
            
            {/* Key Features & Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Features */}
              <div className="glassmorphism rounded-xl p-5 border border-accent-green/20">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-accent-green" />
                  <h3 className="font-semibold text-accent-green">Key Features</h3>
                </div>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-text/70 text-sm">
                      <span className="text-accent-green mt-1">▹</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Challenges & Solutions */}
              <div className="glassmorphism rounded-xl p-5 border border-accent-cyan/20">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-accent-cyan" />
                  <h3 className="font-semibold text-accent-cyan">Challenges & Solutions</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-text/60 text-sm mb-1">🚧 Challenge</p>
                    <p className="text-text/80 text-sm">{project.challenges}</p>
                  </div>
                  <div>
                    <p className="text-text/60 text-sm mb-1">💡 Solution</p>
                    <p className="text-text/80 text-sm">{project.solutions}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tech Stack Details */}
            <div className="glassmorphism rounded-xl p-5 border border-accent-cyan/20">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-accent-purple" />
                <h3 className="font-semibold text-accent-purple">Technologies Used</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-secondary text-text/80 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Project Links */}
            <div className="flex gap-4 pt-4">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-lg glassmorphism text-center hover:border-accent-cyan/50 transition-all flex items-center justify-center gap-2"
              >
                <span>View on GitHub</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-primary text-center font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <span>Live Demo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectAIModal