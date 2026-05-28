import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Users, Award, Coffee, Rocket, Globe } from 'lucide-react'

const TimelineStats = () => {
  const statsRef = React.useRef(null)
  const isInView = useInView(statsRef, { once: true, amount: 0.3 })
  
  const stats = [
    {
      icon: <Code2 className="w-8 h-8" />,
      value: "20+",
      label: "Projects Completed",
      color: "accent-cyan"
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "15+",
      label: "Happy Clients",
      color: "accent-purple"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "12",
      label: "Awards Won",
      color: "accent-green"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      value: "5000+",
      label: "Cups of Coffee",
      color: "accent-cyan"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      value: "50+",
      label: "GitHub Repos",
      color: "accent-purple"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "10+",
      label: "Countries Reached",
      color: "accent-green"
    }
  ]
  
  return (
    <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="glassmorphism rounded-xl p-6 text-center border border-accent-cyan/20 hover:border-accent-cyan/50 transition-all cursor-pointer"
        >
          <div className={`flex justify-center mb-3 text-${stat.color}`}>
            {stat.icon}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            className="text-2xl font-bold text-gradient mb-1"
          >
            {stat.value}
          </motion.div>
          <div className="text-text/40 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default TimelineStats