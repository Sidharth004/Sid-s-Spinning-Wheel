import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type * as THREE from "three"

interface CentralObjectProps {
  onClick: () => void;
}

export function CentralObject({ onClick }: CentralObjectProps) {
  //const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Mesh>(null!)
  //const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    meshRef.current.rotation.z += delta * 0.5

    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group position={[0, 0, 0.02]}>
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
    <mesh ref={textRef} position={[0, 0, 0.5]}>
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