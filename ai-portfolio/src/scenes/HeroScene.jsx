
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import FloatingGeometries from './FloatingGeometries'
import ParticleField from './ParticleField'
import HolographicRings from './HolographicRings'

const SceneContent = () => {
  const groupRef = useRef()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useFrame((state) => {
    if (groupRef.current && !isMobile) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <FloatingGeometries />
      <ParticleField />
      <HolographicRings />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.4} color="#00F5FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#7B2FF7" />
      <spotLight position={[0, 5, 5]} intensity={0.3} color="#00FFB2" />
    </group>
  )
}

const HeroScene = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          depth: true,
          stencil: false
        }}
        dpr={[1, 1.5]}
        style={{ background: '#050816' }}
        camera={{ position: [0, 0, 8], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#050816')
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <Suspense fallback={null}>
          <SceneContent />
          <Environment preset="city" background={false} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}

export default HeroScene
