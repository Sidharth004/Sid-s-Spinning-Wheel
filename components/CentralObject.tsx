import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

export function CentralObject() {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    // Rotate the sphere
    meshRef.current.rotation.z += delta * 0.5

    // Make text face camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0.02]}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[0.2, 52, 52]} />
        <meshPhysicalMaterial 
          color="black"
          emissive="black"
          emissiveIntensity={0}
          metalness={0.0}
          roughness={0.0}
          clearcoat={0.0}
          clearcoatRoughness={0.0}
        />
      </mesh>
      <mesh ref={textRef} position={[0, 0, 0.3]}>
        <Text
          fontSize={0.5}
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