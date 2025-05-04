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

const auraColors = {
  0: ["#ff6b6b", "#ff000022"], // Writing
  1: ["#4ecdc4", "#00fff222"], // Experience
  2: ["#9d65c9", "#8a2be222"], // Projects
  3: ["#5ca0f2", "#0066ff22"], // Github
  4: ["#95e082", "#00ff0022"]  // Contact
}

export function Dot({ index, totalDots, onClick, label }: DotProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Group>(null!)
  const textRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const baseScale = 0.15
  const maxScale = 0.4

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const angle = (time * 0.1 + (index * (Math.PI * 2)) / totalDots) % (Math.PI * 2)
    //const radius = 5
    const radius = window.innerWidth < 768 ? 3.2 : 5


    // Calculate position
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
      <group ref={meshRef}>
        {/* Outermost aura layer */}
        <mesh scale={[2, 2, 2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color={auraColors[index as keyof typeof auraColors][1]}
            transparent={true}
            opacity={hovered ? 0.4 : 0.2}
            emissive={auraColors[index as keyof typeof auraColors][0]}
            emissiveIntensity={hovered ? 0.4 : 0.2}
            metalness={0}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
         {/* Middle aura layer */}
         <mesh scale={[1.5, 1.5, 1.5]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color={auraColors[index as keyof typeof auraColors][0]}
            transparent={true}
            opacity={hovered ? 0.3 : 0.15}
            emissive={auraColors[index as keyof typeof auraColors][0]}
            emissiveIntensity={hovered ? 0.6 : 0.3}
            metalness={0}
            roughness={1}
            depthWrite={false}
          />
        </mesh>

        {/* Inner aura layer */}
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color={auraColors[index as keyof typeof auraColors][0]}
            transparent={true}
            opacity={hovered ? 0.4 : 0.2}
            emissive={auraColors[index as keyof typeof auraColors][0]}
            emissiveIntensity={hovered ? 1 : 0.5}
            metalness={0}
            roughness={1}
          />
        </mesh>

        {/* Main black orb */}
        <mesh
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
          <meshStandardMaterial
            color="#000000"
            metalness={0}
            roughness={1}
            emissive="#000000"
          />
        </mesh>
      </group>

      {/* Text label with original handling */}
      <mesh
        ref={textRef}
        position={[0, 0, 1.2]}
      >
        <Text
          fontSize={0.8}
          color="white"
          anchorX="center"
          anchorY="middle"
          depthOffset={1}
          renderOrder={1}
          scale={[0.4, 0.4, 0.4]}
        >
          {label}
        </Text>
      </mesh>
    </group>
  )
}