import React, { useEffect, Suspense, lazy } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Lenis from '@studio-freight/lenis'
import LoadingScreen from './components/ui/LoadingScreen'
import CustomCursor from './components/ui/CustomCursor'
import Terminal from './components/terminal/Terminal'
import TerminalToggle from './components/terminal/TerminalToggle'
import Assistant from './components/assistant/Assistant'
import AssistantToggle from './components/assistant/AssistantToggle'
import useStore from './store/useStore'
import { useResponsive } from './hooks/useResponsive'

// Lazy load sections for performance
const HeroSection = lazy(() => import('./sections/HeroSection'))
const TerminalSection = lazy(() => import('./sections/TerminalSection'))
const AssistantSection = lazy(() => import('./sections/AssistantSection'))
const GitHubSection = lazy(() => import('./sections/GitHubSection'))
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'))
const TimelineSection = lazy(() => import('./sections/TimelineSection'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  const { isLoading, setLoading } = useStore()
  const { isMobile } = useResponsive()

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const loadingTimer = setTimeout(() => setLoading(false), 3000)

    return () => {
      lenis.destroy()
      clearTimeout(loadingTimer)
    }
  }, [setLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <QueryClientProvider client={queryClient}>
      {!isMobile && <CustomCursor />}
      <Terminal />
      <TerminalToggle />
      <Assistant />
      <AssistantToggle />
      <div className="relative bg-primary overflow-x-hidden">
        <Suspense fallback={
          <div className="fixed inset-0 bg-primary z-50 flex items-center justify-center">
            <div className="text-accent-cyan font-mono">Loading Modules...</div>
          </div>
        }>
          <HeroSection />
          <TerminalSection />
          <AssistantSection />
          <GitHubSection />
          <ProjectsSection />
          <TimelineSection />
        </Suspense>
      </div>
    </QueryClientProvider>
  )
}

export default App