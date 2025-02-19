// SpinningCoil.tsx
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Dot } from "./Dot"

interface SpinningCoilProps {
  onDotClick: (index: number) => void
}

// Match these labels with the actual display text you want
const dotLabels = ["About", "Experience", "Projects", "GitHub", "Contact"]

export function SpinningCoil({ onDotClick }: SpinningCoilProps) {
  const coilRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    coilRef.current.rotation.z += 0.002
  })

  const points: THREE.Vector3[] = []
  const revolutions = 3
  const pointsPerRevolution = 64
  const totalPoints = revolutions * pointsPerRevolution
  const radiusScale = 3

  for (let i = 0; i <= totalPoints; i++) {
    const t = i / pointsPerRevolution
    const angle = t * Math.PI * 2
    const radius = (t / revolutions) * 3 * radiusScale
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0
    ))
  }

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <group ref={coilRef} position={[0, 0, 0.01]}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="black" linewidth={1} />
      </line>
      {dotLabels.map((label, index) => (
        <Dot 
          key={index} 
          index={index} 
          totalDots={dotLabels.length} 
          onClick={() => onDotClick(index)}
          label={label}
        />
      ))}
    </group>
  )
}