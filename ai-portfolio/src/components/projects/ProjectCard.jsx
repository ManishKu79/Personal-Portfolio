import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, ExternalLink, Star, GitFork, Cpu, Award, Sparkles, MessageCircle } from 'lucide-react'
import useStore from '../../store/useStore'

const ProjectCard = ({ project, index, onAskAI }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  
  // 3D Tilt values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 400, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 400, damping: 30 })
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }
  
  const complexityColors = {
    Beginner: 'bg-accent-green/20 text-accent-green',
    Intermediate: 'bg-accent-cyan/20 text-accent-cyan',
    Advanced: 'bg-accent-purple/20 text-accent-purple',
    Expert: 'bg-gradient-to-r from-accent-purple/20 to-accent-cyan/20 text-accent-cyan'
  }
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className="relative"
    >
      <div className="glassmorphism rounded-2xl overflow-hidden border border-accent-cyan/20 hover:border-accent-cyan/50 transition-all duration-300">
        {/* Glow Effect on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 via-accent-purple/10 to-accent-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
        
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full glassmorphism text-xs font-mono text-accent-cyan">
            {project.category}
          </div>
          
          {/* Complexity Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono ${complexityColors[project.complexity]}`}>
            {project.complexity}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Title & Stats */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gradient">{project.title}</h3>
            <div className="flex gap-3">
              <div className="flex items-center gap-1 text-text/40 text-sm">
                <Star className="w-4 h-4 text-accent-cyan" />
                <span>{project.stars}</span>
              </div>
              <div className="flex items-center gap-1 text-text/40 text-sm">
                <GitFork className="w-4 h-4 text-accent-purple" />
                <span>{project.forks}</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-text/60 text-sm mb-4 line-clamp-2">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-secondary text-text/60">
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-text/60">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
          
          {/* Key Features Preview */}
          <div className="mb-4">
            <p className="text-xs text-text/40 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Key Features
            </p>
            <div className="flex flex-wrap gap-2">
              {project.keyFeatures.slice(0, 3).map((feature, i) => (
                <span key={i} className="text-xs text-text/60">• {feature.substring(0, 30)}...</span>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(project.githubLink, '_blank')}
              className="flex-1 px-4 py-2 rounded-lg glassmorphism hover:border-accent-cyan/50 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(project.liveLink, '_blank')}
              className="flex-1 px-4 py-2 rounded-lg glassmorphism hover:border-accent-cyan/50 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAskAI(project)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 hover:from-accent-cyan/30 hover:to-accent-purple/30 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4 text-accent-cyan" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard