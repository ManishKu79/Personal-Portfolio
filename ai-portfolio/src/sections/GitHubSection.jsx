import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Sparkles } from 'lucide-react'
import GitHubDashboard from '../components/github/GitHubDashboard'

const GitHubSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id="github" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-4">
            <Github className="w-4 h-4 text-accent-green" />
            <span className="text-sm font-mono text-accent-green">REAL-TIME ANALYTICS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">GitHub Analytics</span>
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto">
            Real-time statistics, contribution graphs, and activity tracking from my GitHub profile.
            See what I'm building and contributing to.
          </p>
        </motion.div>

        {/* Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GitHubDashboard />
        </motion.div>

        {/* Live Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-accent-green">
            <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
            <span>LIVE DATA • UPDATED REAL-TIME</span>
            <Sparkles className="w-3 h-3" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubSection