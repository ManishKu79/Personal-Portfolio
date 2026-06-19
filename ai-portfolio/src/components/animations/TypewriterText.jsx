
import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const TypewriterText = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const fullText = texts[currentTextIndex]

  useEffect(() => {
    let timeout

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(timeout)
    }

    if (!isDeleting && currentText.length < fullText.length) {
      timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1))
      }, typingSpeed)
    } 
    else if (isDeleting && currentText.length > 0) {
      timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length - 1))
      }, deletingSpeed)
    }
    else if (!isDeleting && currentText.length === fullText.length) {
      setIsPaused(true)
    }
    else if (isDeleting && currentText.length === 0) {
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, isPaused, fullText, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <div className="inline-flex items-center gap-1">
      <span className="whitespace-pre">{currentText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="w-0.5 h-8 bg-accent-cyan"
      />
    </div>
  )
}

export default TypewriterText
