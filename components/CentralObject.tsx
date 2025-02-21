// CentralObject.tsx
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface CentralObjectProps {
  onClick: () => void;
}

export function CentralObject({ onClick }: CentralObjectProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current.rotation.z += delta * 0.5

    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0.02]}>
      {/* Outermost aura layer */}
      <mesh scale={[3, 3, 3]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#FFD700"
          transparent={true}
          opacity={0.1}
          emissive="#FFB900"
          emissiveIntensity={0.2}
          metalness={0}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      {/* Middle aura layer */}
      <mesh scale={[2, 2, 2]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#FFD700"
          transparent={true}
          opacity={0.15}
          emissive="#FFB900"
          emissiveIntensity={0.3}
          metalness={0}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      {/* Inner aura layer */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#FFD700"
          transparent={true}
          opacity={0.2}
          emissive="#FFB900"
          emissiveIntensity={0.4}
          metalness={0}
          roughness={1}
        />
      </mesh>

      {/* Main black sphere */}
      <mesh 
        ref={meshRef} 
        castShadow
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        <sphereGeometry args={[0.4, 52, 52]} />
        <meshStandardMaterial 
          color="black"
          metalness={0}
          roughness={1}
        />
      </mesh>

      <mesh ref={textRef} position={[0, 0, 0.7]}>
        <Text
          fontSize={0.8}
          color="#111111"
          anchorX="center"
          anchorY="middle"
          scale={[0.4, 0.4, 0.4]}
        >
          About Me
        </Text>
      </mesh>
    </group>
  )
}