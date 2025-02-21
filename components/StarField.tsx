import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function StarField() {
  const groupRef = useRef<THREE.Group>(null!)
  
  const stars = useMemo(() => {
    const starData = []
    // Create more stars for better density
    for (let i = 0; i < 300; i++) {
      // Use a fibonacci sphere distribution for more even spacing
      const phi = Math.acos(1 - 2 * (i / 300))
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      
      // Create a spherical distribution with varying distances
      const distance = 10 + Math.random() * 30 // Vary distance from center
      const x = distance * Math.sin(phi) * Math.cos(theta)
      const y = distance * Math.sin(phi) * Math.sin(theta)
      const z = distance * Math.cos(phi)
      
      // Make stars smaller for better appearance
      const size = Math.random() * 0.08 + 0.02

      // Add random offset for more natural distribution
      const offset = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 5
      }
      
      starData.push({ 
        position: [
          x + offset.x,
          y + offset.y,
          z + offset.z
        ],
        size
      })
    }
    return starData
  }, [])

  useFrame((state, delta) => {
    // Slow rotation for subtle movement
    groupRef.current.rotation.y += delta * 0.02
  })

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <mesh
          key={index}
          position={star.position as [number, number, number]}
        >
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial 
            color="black"
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
} 