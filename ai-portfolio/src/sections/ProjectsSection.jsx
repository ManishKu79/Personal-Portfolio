import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Filter, Sparkles, Grid3X3, List } from 'lucide-react'
import { projectsData } from '../constants/projectsData'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectAIModal from '../components/projects/ProjectAIModal'
import useStore from '../store/useStore'

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const { toggleAssistant, addAssistantMessage } = useStore()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  
  const categories = ['all', ...new Set(projectsData.map(p => p.category))]
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter)
  
  const handleAskAI = (project) => {
    setSelectedProject(project)
    
    // Also send to AI assistant
    addAssistantMessage({
      id: Date.now(),
      type: 'user',
      content: `Tell me more about the ${project.title} project`,
      timestamp: Date.now()
    })
    
    setTimeout(() => {
      addAssistantMessage({
        id: Date.now() + 1,
        type: 'ai',
        content: `🎯 **About ${project.title}:**\n\n${project.aiSummary}\n\n**Key Technologies:** ${project.techStack.join(', ')}\n\nWould you like to know more about specific features or the architecture?`,
        timestamp: Date.now()
      })
    }, 500)
    
    // Open assistant if not already open
    if (!useStore.getState().isAssistantOpen) {
      toggleAssistant()
    }
  }
  
  const handleCloseModal = () => {
    setSelectedProject(null)
  }
  
  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-secondary to-primary" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-4">
            <Code2 className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-mono text-accent-cyan">AI-POWERED SHOWCASE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-text/60 max-w-2xl mx-auto">
            Explore my latest work featuring AI, 3D web, and full-stack applications.
            Each project includes AI-generated insights and technical deep-dives.
          </p>
        </motion.div>
        
        {/* Filters & Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-primary'
                    : 'glassmorphism text-text/60 hover:text-text hover:border-accent-cyan/50'
                }`}
              >
                {cat === 'all' ? 'ALL PROJECTS' : cat.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' ? 'glassmorphism text-accent-cyan' : 'text-text/40 hover:text-text/60'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' ? 'glassmorphism text-accent-cyan' : 'text-text/40 hover:text-text/60'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
        
        {/* Projects Grid */}
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'grid-cols-1 gap-4'
        }`}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onAskAI={handleAskAI}
            />
          ))}
        </div>
        
        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 rounded-full glassmorphism hover:border-accent-cyan/50 transition-all inline-flex items-center gap-2 group">
            <span>VIEW ALL ON GITHUB</span>
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </motion.div>
      </div>
      
      {/* AI Modal */}
      <ProjectAIModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default ProjectsSection