import { useState, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface DotProps {
  index: number
  totalDots: number
  onClick: () => void
  label: string
}

export function Dot({ index, totalDots, onClick, label }: DotProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const baseScale = 0.15
  const maxScale = 0.4

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const angle = (time * 0.1 + (index * (Math.PI * 2)) / totalDots) % (Math.PI * 2)
    const radius = 4

    // Calculate position once and apply to group
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = Math.sin(time + index) * 0.1

    groupRef.current.position.set(x, y, z)

    // Calculate and apply scale
    const frontness = (Math.cos(angle) + 1) / 2
    const scale = baseScale + (maxScale - baseScale) * frontness
    meshRef.current.scale.setScalar(scale * 2)

    // Make text always face camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        castShadow
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial 
          color={hovered ? "#FFFFFF" : "#E0E0E0"}
          emissive={hovered ? "#CCCCCC" : "#A0A0A0"}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          transmission={0.05}
        />
      </mesh>
      <mesh ref={textRef} position={[0, 0, 1.2]}>
        <Text
          fontSize={0.6}
          color="#111111"
          anchorX="center"
          anchorY="middle"
          scale={[0.4, 0.4, 0.4]}
        >
          {label}
        </Text>
      </mesh>
    </group>
  )
}