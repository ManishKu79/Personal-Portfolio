import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Calendar, Code, Award, TrendingUp, Sparkles } from 'lucide-react'

const TimelineItem = ({ item, index, isLeft }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -100 : 100,
      rotateY: isLeft ? -15 : 15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.15,
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'achievement': return <Award className="w-5 h-5 text-accent-cyan" />
      case 'career': return <TrendingUp className="w-5 h-5 text-accent-green" />
      case 'project': return <Code className="w-5 h-5 text-accent-purple" />
      case 'education': return <Calendar className="w-5 h-5 text-accent-cyan" />
      default: return <Sparkles className="w-5 h-5 text-accent-purple" />
    }
  }
  
  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-16`}
    >
      {/* Timeline Line Connector */}
      <div className={`absolute top-1/2 ${isLeft ? 'right-0' : 'left-0'} w-1/2 h-0.5 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 -translate-y-1/2`} />
      
      {/* Content Card */}
      <div className={`w-5/12 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className="glassmorphism rounded-2xl p-6 border border-accent-cyan/20 hover:border-accent-cyan/50 transition-all duration-300 group"
        >
          {/* Year Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${item.gradient} mb-4`}>
            <span className="text-primary font-mono text-sm font-bold">{item.year}</span>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-gradient">{item.title}</h3>
          
          {/* Description */}
          <p className="text-text/60 text-sm mb-4">{item.description}</p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.technologies.map((tech, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary text-text/60">
                {tech}
              </span>
            ))}
          </div>
          
          {/* Achievements */}
          <div className="space-y-2">
            {item.achievements.map((achievement, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-text/50">
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`} />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-cyan/0 via-accent-purple/0 to-accent-green/0 group-hover:from-accent-cyan/5 group-hover:via-accent-purple/5 group-hover:to-accent-green/5 transition-all duration-500 pointer-events-none" />
        </motion.div>
      </div>
      
      {/* Center Icon */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={isInView ? { scale: 1, rotate: 360 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg ring-4 ring-secondary`}
        >
          <span className="text-2xl">{item.icon}</span>
        </motion.div>
      </div>
      
      {/* Empty spacer */}
      <div className="w-5/12" />
    </motion.div>
  )
}

export default TimelineItem