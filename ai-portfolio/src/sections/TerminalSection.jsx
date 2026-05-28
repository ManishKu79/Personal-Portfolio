import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal, Command, Cpu, Zap } from 'lucide-react'
import useStore from '../store/useStore'

const TerminalSection = () => {
  const { toggleTerminal } = useStore()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const features = [
    {
      icon: <Command className="w-6 h-6 text-accent-cyan" />,
      title: "15+ Commands",
      description: "Interactive terminal with rich command system"
    },
    {
      icon: <Cpu className="w-6 h-6 text-accent-purple" />,
      title: "AI Integration",
      description: "Ask AI directly from terminal"
    },
    {
      icon: <Zap className="w-6 h-6 text-accent-green" />,
      title: "Real-time Responses",
      description: "Instant command execution"
    }
  ]

  const commands = [
    { cmd: "help", desc: "Show all commands" },
    { cmd: "about", desc: "About me" },
    { cmd: "skills", desc: "Technical skills" },
    { cmd: "projects", desc: "Project showcase" },
    { cmd: "matrix", desc: "Matrix rain effect" }
  ]

  return (
    <section id="terminal" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary" />
      
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-4">
            <Terminal className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-mono text-accent-cyan">INTERACTIVE SYSTEM</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Developer Terminal</span>
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto">
            Experience a fully functional Linux-style terminal. Run commands,
            explore my profile, and interact with AI directly.
          </p>
        </motion.div>

        {/* Terminal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glassmorphism-strong rounded-xl overflow-hidden border border-accent-cyan/20">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-accent-cyan/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-accent-cyan/60 ml-4">manish@portfolio:~</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-accent-cyan mb-2">
                ╔════════════════════════════════════════════════════════╗
              </div>
              <div className="text-accent-cyan mb-2">
                ║     INTERACTIVE TERMINAL - Click button to launch       ║
              </div>
              <div className="text-accent-cyan mb-4">
                ╚════════════════════════════════════════════════════════╝
              </div>
              
              <div className="text-text/80 mb-2">
                $ <span className="text-accent-green">help</span>
              </div>
              <div className="ml-6 mb-4 text-text/60">
                Available commands: help, about, skills, projects, matrix, clear...
              </div>
              
              <div className="text-text/80 mb-2">
                $ <span className="text-accent-green">whoami</span>
              </div>
              <div className="ml-6 mb-4 text-text/60">
                manish@ai-portfolio:~$ Currently logged in as: Manish Kumar
              </div>
              
              <div className="flex items-center gap-2 text-text/80">
                <span>$</span>
                <span className="text-accent-green">_</span>
                <span className="animate-pulse text-accent-cyan">█</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="glassmorphism rounded-xl p-6 text-center group hover:glow-effect transition-all duration-300"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-text/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Commands Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-center text-xl font-semibold mb-6">Popular Commands</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {commands.map((command, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glassmorphism rounded-lg p-3 text-center cursor-pointer hover:border-accent-cyan/50 transition-all"
                onClick={toggleTerminal}
              >
                <code className="text-accent-cyan text-sm">{command.cmd}</code>
                <p className="text-text/40 text-xs mt-1">{command.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={toggleTerminal}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary font-semibold inline-flex items-center gap-2 group hover:scale-105 transition-transform"
          >
            <Terminal className="w-5 h-5" />
            <span>LAUNCH TERMINAL</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default TerminalSection