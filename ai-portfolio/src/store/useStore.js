import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // UI State
      isLoading: true,
      isMenuOpen: false,
      isTerminalOpen: false,  // Make sure this exists
      isAssistantOpen: false,
      currentSection: 'hero',
      theme: 'dark',
      
      // Performance State
      reducedMotion: false,
      highPerformance: true,
      
      // Terminal State
      terminalHistory: [],
      terminalCommands: [],
      
      // Assistant State
      assistantMessages: [],
      isThinking: false,
      
      // UI Actions
      setLoading: (value) => set({ isLoading: value }),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      toggleTerminal: () => set((state) => ({ 
        isTerminalOpen: !state.isTerminalOpen,
        // Close assistant if opening terminal (optional)
        isAssistantOpen: state.isAssistantOpen ? false : state.isAssistantOpen
      })),
      toggleAssistant: () => set((state) => ({ 
        isAssistantOpen: !state.isAssistantOpen,
        isTerminalOpen: state.isTerminalOpen ? false : state.isTerminalOpen
      })),
      setCurrentSection: (section) => set({ currentSection: section }),
      
      // Performance Actions
      setReducedMotion: (value) => set({ reducedMotion: value }),
      setHighPerformance: (value) => set({ highPerformance: value }),
      
      // Terminal Actions
      addTerminalCommand: (command) => set((state) => ({
        terminalCommands: [...state.terminalCommands, command]
      })),
      clearTerminal: () => set({ terminalCommands: [] }),
      
      // Assistant Actions
      addAssistantMessage: (message) => set((state) => ({
        assistantMessages: [...state.assistantMessages, message]
      })),
      setIsThinking: (value) => set({ isThinking: value }),
    }),
    {
      name: 'ai-portfolio-storage',
      partialize: (state) => ({ 
        theme: state.theme, 
        reducedMotion: state.reducedMotion,
        isTerminalOpen: false, // Don't persist terminal state
        isAssistantOpen: false // Don't persist assistant state
      }),
    }
  )
)

export default useStore