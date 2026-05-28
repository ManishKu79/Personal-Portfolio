import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Maximize2, Terminal as TerminalIcon, ChevronRight } from 'lucide-react'
import { terminalCommands, commandAliases } from './TerminalCommands'
import useStore from '../../store/useStore'

const Terminal = () => {
  const { isTerminalOpen, toggleTerminal } = useStore()
  const [history, setHistory] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandIndex, setCommandIndex] = useState(-1)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [matrixMode, setMatrixMode] = useState(false)
  const [rainbowMode, setRainbowMode] = useState(false)
  
  const inputRef = useRef(null)
  const terminalRef = useRef(null)
  const historyRef = useRef(null)

  // Auto-focus and scroll to bottom
  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [isTerminalOpen, history])

  // Matrix effect
  useEffect(() => {
    if (matrixMode) {
      const interval = setInterval(() => {
        addToHistory({
          type: 'matrix',
          content: generateMatrixChar(),
          timestamp: Date.now()
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [matrixMode])

  const generateMatrixChar = () => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    return chars[Math.floor(Math.random() * chars.length)]
  }

  const addToHistory = (entry) => {
    setHistory(prev => [...prev, entry])
  }

  const executeCommand = useCallback(async (command) => {
    const trimmedCommand = command.trim().toLowerCase()
    
    // Add command to history
    addToHistory({
      type: 'command',
      content: command,
      timestamp: Date.now()
    })

    // Handle empty command
    if (!trimmedCommand) return

    // Handle special effects
    if (trimmedCommand === 'stop' && matrixMode) {
      setMatrixMode(false)
      addToHistory({
        type: 'system',
        content: 'Matrix mode deactivated.',
        timestamp: Date.now()
      })
      return
    }

    // Check for aliases
    let actualCommand = commandAliases[trimmedCommand] || trimmedCommand

    // Check if command exists
    if (terminalCommands[actualCommand]) {
      const result = await terminalCommands[actualCommand].execute()
      
      // Handle special effects
      if (result.effect === 'matrix') {
        setMatrixMode(true)
      }
      if (result.effect === 'rainbow') {
        setRainbowMode(true)
        setTimeout(() => setRainbowMode(false), 10000)
      }
      
      addToHistory({
        type: 'output',
        content: result.content,
        timestamp: Date.now()
      })
    } else {
      addToHistory({
        type: 'error',
        content: `Command not found: ${command}. Type 'help' for available commands.`,
        timestamp: Date.now()
      })
    }
  }, [matrixMode])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
      setCurrentCommand('')
      setCommandIndex(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const previousCommands = history
        .filter(h => h.type === 'command')
        .map(h => h.content)
      
      if (commandIndex < previousCommands.length - 1) {
        const newIndex = commandIndex + 1
        setCommandIndex(newIndex)
        setCurrentCommand(previousCommands[previousCommands.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1
        setCommandIndex(newIndex)
        const previousCommands = history
          .filter(h => h.type === 'command')
          .map(h => h.content)
        setCurrentCommand(previousCommands[previousCommands.length - 1 - newIndex])
      } else if (commandIndex === 0) {
        setCommandIndex(-1)
        setCurrentCommand('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple autocomplete
      const commands = Object.keys(terminalCommands)
      const matching = commands.filter(cmd => cmd.startsWith(currentCommand.toLowerCase()))
      if (matching.length === 1) {
        setCurrentCommand(matching[0])
      }
    }
  }

  const formatOutput = (content, type) => {
    if (!content) return null
    
    // Handle ASCII art and formatted text
    return (
      <pre className={`font-mono text-sm whitespace-pre-wrap break-words ${
        type === 'error' ? 'text-red-500' : 
        type === 'success' ? 'text-accent-green' :
        'text-text'
      }`}>
        {content}
      </pre>
    )
  }

  if (!isTerminalOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          width: isMaximized ? '100vw' : '800px',
          height: isMaximized ? '100vh' : '500px',
          position: isMaximized ? 'fixed' : 'fixed',
          top: isMaximized ? 0 : 'auto',
          bottom: isMaximized ? 0 : 20,
          left: isMaximized ? 0 : '50%',
          transform: isMaximized ? 'none' : 'translateX(-50%)',
          borderRadius: isMaximized ? 0 : '12px',
          zIndex: 1000
        }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[95%] max-w-4xl glassmorphism-strong rounded-xl overflow-hidden shadow-2xl border border-accent-cyan/30 ${
          rainbowMode ? 'animate-border-flow' : ''
        }`}
        style={{
          boxShadow: rainbowMode ? '0 0 30px rgba(255,0,255,0.5)' : ''
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-secondary/80 border-b border-accent-cyan/20">
          <div className="flex items-center gap-3">
            <TerminalIcon className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-mono text-accent-cyan">AI_TERMINAL v2.0</span>
            <div className="flex gap-2 ml-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-text/10 rounded transition-colors"
            >
              <Minimize2 className="w-4 h-4 text-text/60" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:bg-text/10 rounded transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-text/60" />
            </button>
            <button
              onClick={toggleTerminal}
              className="p-1 hover:bg-text/10 rounded transition-colors"
            >
              <X className="w-4 h-4 text-text/60" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        {!isMinimized && (
          <div
            ref={terminalRef}
            className="bg-primary/95 backdrop-blur-sm"
          >
            <div
              ref={historyRef}
              className="h-[400px] overflow-y-auto p-4 font-mono"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Welcome Message */}
              {history.length === 0 && (
                <div className="mb-4">
                  <div className="text-accent-cyan mb-2">
                    ╔════════════════════════════════════════╗
                    <br />
                    ║     WELCOME TO AI TERMINAL v2.0       ║
                    <br />
                    ╚════════════════════════════════════════╝
                  </div>
                  <div className="text-text/60 mt-2">
                    Type 'help' to see available commands.
                    <br />
                    Type 'matrix' for a fun surprise!
                    <br /><br />
                    Ready to explore? Let's begin! 🚀
                  </div>
                </div>
              )}
              
              {/* Command History */}
              {history.map((entry, index) => (
                <div key={index} className="mb-3">
                  {entry.type === 'command' && (
                    <div className="flex items-start gap-2">
                      <span className="text-accent-cyan">➜</span>
                      <span className="text-accent-green">~/portfolio</span>
                      <span className="text-text">{entry.content}</span>
                    </div>
                  )}
                  {entry.type === 'output' && (
                    <div className="ml-6 border-l-2 border-accent-cyan/20 pl-3">
                      {formatOutput(entry.content, 'output')}
                    </div>
                  )}
                  {entry.type === 'error' && (
                    <div className="ml-6 text-red-500">
                      {entry.content}
                    </div>
                  )}
                  {entry.type === 'matrix' && matrixMode && (
                    <div className="text-accent-green matrix-text">
                      {entry.content}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Current Input Line */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-accent-cyan">➜</span>
                <span className="text-accent-green">~/portfolio</span>
                <span className="text-text">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 bg-transparent outline-none text-text font-mono"
                  autoFocus
                  spellCheck={false}
                />
                <span className="animate-pulse text-accent-cyan">█</span>
              </div>
            </div>
            
            {/* Status Bar */}
            <div className="px-4 py-2 bg-secondary/50 border-t border-accent-cyan/10 text-xs font-mono text-text/40 flex justify-between">
              <span>🔒 SECURE CONNECTION</span>
              <span>📊 COMMANDS: {Object.keys(terminalCommands).length}</span>
              <span>🖥️ READY</span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Terminal