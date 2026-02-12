// SpinningCoil.tsx
import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Dot } from "./Dot"

interface SpinningCoilProps {
  onDotClick: (index: number) => void
}

// Match these labels with the actual display text you want
const dotLabels = ["Writing", "Experience", "Side Quests", "GitHub", "Contact", "Growth Jams"]

export function SpinningCoil({ onDotClick }: SpinningCoilProps) {
  const coilRef = useRef<THREE.Group>(null!)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)

  useFrame((state, delta) => {
    if (coilRef.current) {
      coilRef.current.rotation.z += delta * 0.18
    }
  })

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024
  const radiusScale = screenWidth < 768 ? 2 : 3.5

  const lineGeometry = useMemo(() => {
    // Dispose previous geometry if it exists
    if (geometryRef.current) {
      geometryRef.current.dispose()
    }

    const points: THREE.Vector3[] = []
    const revolutions = 3
    const pointsPerRevolution = 64
    const totalPoints = revolutions * pointsPerRevolution

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

    const geo = new THREE.BufferGeometry().setFromPoints(points)
    geometryRef.current = geo
    return geo
  }, [radiusScale])

  // Cleanup geometry on unmount
  useEffect(() => {
    return () => {
      if (geometryRef.current) {
        geometryRef.current.dispose()
        geometryRef.current = null
      }
    }
  }, [])

  return (
    <group ref={coilRef} position={[0, 0, 0.01]}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="white" linewidth={2} />
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
