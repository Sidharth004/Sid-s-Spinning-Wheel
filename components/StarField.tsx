import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function createStarTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext("2d")!
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, "rgba(255,255,255,1)")
  gradient.addColorStop(0.3, "rgba(255,255,255,0.9)")
  gradient.addColorStop(0.7, "rgba(255,255,255,0.3)")
  gradient.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(canvas)
}

export function StarField() {
  const groupRef = useRef<THREE.Group>(null!)

  const { geometry, texture } = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - 2 * (i / count))
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      const distance = 10 + Math.random() * 30
      const x = distance * Math.sin(phi) * Math.cos(theta)
      const y = distance * Math.sin(phi) * Math.sin(theta)
      const z = distance * Math.cos(phi)

      const offsetX = (Math.random() - 0.5) * 5
      const offsetY = (Math.random() - 0.5) * 5
      const offsetZ = (Math.random() - 0.5) * 5

      positions[i * 3] = x + offsetX
      positions[i * 3 + 1] = y + offsetY
      positions[i * 3 + 2] = z + offsetZ
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const tex = createStarTexture()

    return { geometry: geo, texture: tex }
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          map={texture}
          color="white"
          size={0.5}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.9}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
