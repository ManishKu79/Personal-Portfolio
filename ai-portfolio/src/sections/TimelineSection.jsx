import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Calendar, TrendingUp, Sparkles, Star } from 'lucide-react'
import { timelineData } from '../constants/timelineData'
import TimelineItem from '../components/timeline/TimelineItem'
import TimelineStats from '../components/timeline/TimelineStats'

const TimelineSection = () => {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  
  return (
    <section id="timeline" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-cyan/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div ref={containerRef} className="relative container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          style={{ opacity }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-4">
            <Calendar className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-mono text-accent-cyan">CINEMATIC TIMELINE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Journey & Milestones</span>
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto">
            From first line of code to AI innovation leader. A visual journey through
            my professional growth, achievements, and key milestones.
          </p>
        </motion.div>
        
        {/* Statistics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TimelineStats />
        </motion.div>
        
        {/* Timeline */}
        <div className="relative mt-20">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-green"
            style={{ height: "calc(100% - 100px)" }}
          />
          
          {/* Glowing Orbs on Timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-3 h-3 bg-accent-cyan rounded-full animate-pulse shadow-lg shadow-accent-cyan" />
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-3 h-3 bg-accent-green rounded-full animate-pulse shadow-lg shadow-accent-green" />
          
          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
        
        {/* Future Goal Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glassmorphism-strong rounded-2xl p-8 border border-accent-cyan/20 max-w-2xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 via-accent-purple/10 to-accent-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-4"
            >
              <Star className="w-12 h-12 text-accent-cyan" />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-3 text-gradient">What's Next?</h3>
            <p className="text-text/70 mb-4">
              Currently exploring <span className="text-accent-cyan font-semibold">AGI research</span> and 
              <span className="text-accent-purple font-semibold"> Web3 integration</span>. 
              Looking forward to building the next generation of AI-powered developer tools.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-3 py-1 rounded-full glassmorphism text-xs">Open to Opportunities</span>
              <span className="px-3 py-1 rounded-full glassmorphism text-xs">Available for Consulting</span>
              <span className="px-3 py-1 rounded-full glassmorphism text-xs">Speaking Engagements</span>
            </div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl border border-accent-cyan/0 group-hover:border-accent-cyan/30 transition-all duration-500" />
          </div>
        </motion.div>
        
        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => window.open('/resume.pdf', '_blank')}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple text-primary font-semibold inline-flex items-center gap-2 group hover:scale-105 transition-transform"
          >
            <span>DOWNLOAD FULL RESUME</span>
            <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default TimelineSection