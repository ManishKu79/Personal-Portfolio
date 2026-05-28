// src/components/terminal/Terminal.jsx - FIXED version
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minimize2, Maximize2, Terminal as TerminalIcon } from 'lucide-react'
import { terminalCommands, commandAliases } from './TerminalCommands'
import useStore from '../../store/useStore'

const Terminal = () => {
  const { isTerminalOpen, toggleTerminal } = useStore()
  const [history, setHistory] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandIndex, setCommandIndex] = useState(-1)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  
  const inputRef = useRef(null)
  const historyRef = useRef(null)

  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isTerminalOpen])

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight
    }
  }, [history])

  const addToHistory = useCallback((entry) => {
    setHistory(prev => [...prev, { ...entry, id: Date.now() + Math.random() }])
  }, [])

  const executeCommand = useCallback(async (command) => {
    const trimmedCommand = command.trim().toLowerCase()
    
    addToHistory({ type: 'command', content: command, timestamp: Date.now() })

    if (!trimmedCommand) return

    let actualCommand = commandAliases[trimmedCommand] || trimmedCommand

    if (terminalCommands[actualCommand]) {
      try {
        const result = await terminalCommands[actualCommand].execute()
        addToHistory({ type: 'output', content: result.content, timestamp: Date.now() })
      } catch (error) {
        addToHistory({ type: 'error', content: 'Command execution failed', timestamp: Date.now() })
      }
    } else {
      addToHistory({ 
        type: 'error', 
        content: `Command not found: ${command}. Type 'help' for available commands.`,
        timestamp: Date.now() 
      })
    }
  }, [addToHistory])

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
      setCurrentCommand('')
      setCommandIndex(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const previousCommands = history.filter(h => h.type === 'command').map(h => h.content)
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
        const previousCommands = history.filter(h => h.type === 'command').map(h => h.content)
        setCurrentCommand(previousCommands[previousCommands.length - 1 - newIndex])
      } else if (commandIndex === 0) {
        setCommandIndex(-1)
        setCurrentCommand('')
      }
    }
  }, [currentCommand, executeCommand, commandIndex, history])

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
          position: 'fixed',
          bottom: isMaximized ? 0 : 20,
          left: isMaximized ? 0 : '50%',
          transform: isMaximized ? 'none' : 'translateX(-50%)',
          borderRadius: isMaximized ? 0 : '12px',
          zIndex: 1000
        }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="glassmorphism-strong overflow-hidden shadow-2xl border border-accent-cyan/30"
      >
        <div className="flex items-center justify-between px-4 py-3 bg-secondary/80 border-b border-accent-cyan/20">
          <div className="flex items-center gap-3">
            <TerminalIcon className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm font-mono text-accent-cyan">AI_TERMINAL</span>
            <div className="flex gap-2 ml-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-text/10 rounded">
              <Minimize2 className="w-4 h-4 text-text/60" />
            </button>
            <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 hover:bg-text/10 rounded">
              <Maximize2 className="w-4 h-4 text-text/60" />
            </button>
            <button onClick={toggleTerminal} className="p-1 hover:bg-text/10 rounded">
              <X className="w-4 h-4 text-text/60" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="bg-primary/95 backdrop-blur-sm">
            <div
              ref={historyRef}
              className="h-[400px] overflow-y-auto p-4 font-mono text-sm"
            >
              {history.length === 0 && (
                <div className="mb-4">
                  <div className="text-accent-cyan mb-2">Welcome to AI Terminal v2.0</div>
                  <div className="text-text/60">Type 'help' to see available commands.</div>
                </div>
              )}
              
              {history.map((entry) => (
                <div key={entry.id} className="mb-2">
                  {entry.type === 'command' && (
                    <div className="flex items-start gap-2">
                      <span className="text-accent-cyan">➜</span>
                      <span className="text-accent-green">~/portfolio</span>
                      <span className="text-text">$ {entry.content}</span>
                    </div>
                  )}
                  {entry.type === 'output' && (
                    <div className="ml-6 text-text/80 whitespace-pre-wrap">{entry.content}</div>
                  )}
                  {entry.type === 'error' && (
                    <div className="ml-6 text-red-500">{entry.content}</div>
                  )}
                </div>
              ))}
              
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
            
            <div className="px-4 py-2 bg-secondary/50 border-t border-accent-cyan/10 text-xs font-mono text-text/40 flex justify-between">
              <span>🔒 SECURE</span>
              <span>📊 READY</span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Terminal