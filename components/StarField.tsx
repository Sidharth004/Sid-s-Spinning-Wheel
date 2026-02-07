import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function StarField() {
  const groupRef = useRef<THREE.Group>(null!)
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions, sizes } = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for even spacing
      const phi = Math.acos(1 - 2 * (i / count))
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      // Varying distance from center
      const distance = 10 + Math.random() * 30
      const x = distance * Math.sin(phi) * Math.cos(theta)
      const y = distance * Math.sin(phi) * Math.sin(theta)
      const z = distance * Math.cos(phi)

      // Random offset for natural distribution
      const offsetX = (Math.random() - 0.5) * 5
      const offsetY = (Math.random() - 0.5) * 5
      const offsetZ = (Math.random() - 0.5) * 5

      positions[i * 3] = x + offsetX
      positions[i * 3 + 1] = y + offsetY
      positions[i * 3 + 2] = z + offsetZ

      sizes[i] = Math.random() * 0.08 + 0.02
    }

    return { positions, sizes }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, sizes])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          color="white"
          size={0.15}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.9}
        />
      </points>
    </group>
  )
}
