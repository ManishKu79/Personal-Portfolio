import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text3D, Sphere, Torus, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

const FloatingGeometries = () => {
  const groupRef = useRef()
  const geometries = useMemo(() => {
    return [
      { type: 'sphere', position: [-3, -1, -2], scale: 0.8, color: '#00F5FF', speed: 0.5 },
      { type: 'torus', position: [2.5, 1.5, -1], scale: 0.6, color: '#7B2FF7', speed: 0.3 },
      { type: 'icosahedron', position: [-1.5, 2, -3], scale: 0.7, color: '#00FFB2', speed: 0.4 },
      { type: 'sphere', position: [3, -2, -4], scale: 0.5, color: '#FF00FF', speed: 0.6 },
      { type: 'torus', position: [-2.5, -1, -2], scale: 0.9, color: '#00F5FF', speed: 0.2 },
    ]
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += 0.005
        child.rotation.y += 0.01
        child.rotation.z += 0.007
      })
    }
  })

  return (
    <group ref={groupRef}>
      {geometries.map((geo, i) => (
        <Float
          key={i}
          speed={geo.speed}
          rotationIntensity={1}
          floatIntensity={2}
          position={geo.position}
        >
          {geo.type === 'sphere' && (
            <mesh scale={geo.scale}>
              <sphereGeometry args={[1, 64, 64]} />
              <meshStandardMaterial
                color={geo.color}
                emissive={geo.color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )}
          {geo.type === 'torus' && (
            <mesh scale={geo.scale}>
              <torusGeometry args={[1, 0.3, 64, 200]} />
              <meshStandardMaterial
                color={geo.color}
                emissive={geo.color}
                emissiveIntensity={0.4}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          )}
          {geo.type === 'icosahedron' && (
            <mesh scale={geo.scale}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={geo.color}
                emissive={geo.color}
                emissiveIntensity={0.5}
                metalness={0.7}
                roughness={0.3}
                wireframe={false}
              />
            </mesh>
          )}
        </Float>
      ))}
    </group>
  )
}

export default FloatingGeometries