import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Torus } from '@react-three/drei'
import * as THREE from 'three'

const HolographicRings = () => {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(time * 0.3) * 0.5
      ring1Ref.current.rotation.y = time * 0.2
      ring1Ref.current.rotation.z = Math.cos(time * 0.2) * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.cos(time * 0.4) * 0.5
      ring2Ref.current.rotation.z = time * 0.15
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = Math.sin(time * 0.5) * 0.5
      ring3Ref.current.rotation.x = time * 0.1
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <Torus ref={ring1Ref} args={[2.5, 0.08, 64, 200]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={0.5} transparent opacity={0.7} />
      </Torus>
      <Torus ref={ring2Ref} args={[3.2, 0.05, 64, 200]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#7B2FF7" emissive="#7B2FF7" emissiveIntensity={0.4} transparent opacity={0.6} />
      </Torus>
      <Torus ref={ring3Ref} args={[1.8, 0.06, 64, 200]} position={[0, -0.3, 0]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#00FFB2" emissive="#00FFB2" emissiveIntensity={0.6} transparent opacity={0.8} />
      </Torus>
    </group>
  )
}

export default HolographicRings