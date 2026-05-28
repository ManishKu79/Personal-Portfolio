import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > 0.05) setIsVisible(false)
      else setIsVisible(true)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  if (!isVisible) return null

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      style={{ opacity, scale }}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-accent-cyan/60 tracking-wider">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[2px] h-16 bg-gradient-to-b from-accent-cyan to-transparent" />
        <div className="w-4 h-4 border-r-2 border-b-2 border-accent-cyan transform rotate-45" />
      </div>
    </motion.div>
  )
}

export default ScrollIndicator