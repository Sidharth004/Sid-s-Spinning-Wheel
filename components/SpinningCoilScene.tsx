
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import { SpinningCoil } from "./SpinningCoil"
import { CentralObject } from "./CentralObject"
import { Modal } from "@/components/Modal" 

const dotInfo = [
  {
    title: "Web Development",
    content: "Expert in modern web technologies including React, Next.js, and TypeScript. Building responsive, performant, and accessible web applications with a focus on user experience and clean code architecture."
  },
  {
    title: "UI/UX Design",
    content: "Creating intuitive and beautiful user interfaces with a deep understanding of user behavior, accessibility standards, and modern design principles. Proficient in design tools and prototyping workflows."
  },
  {
    title: "3D Graphics",
    content: "Specialized in Three.js and WebGL for creating immersive 3D experiences on the web. Building interactive visualizations, 3D models, and engaging animations that push the boundaries of web graphics."
  },
  {
    title: "Mobile Development",
    content: "Crafting cross-platform mobile applications using React Native and modern mobile development frameworks. Focus on performance optimization and native-like user experience."
  },
  {
    title: "Backend Development",
    content: "Full-stack expertise with Node.js, Express, and various database technologies. Building scalable microservices, RESTful APIs, and real-time applications with a focus on security and performance."
  }
]

export default function SpinningCoilScene() {
  const [selectedDot, setSelectedDot] = useState<number | null>(null)

  return (
    <>
      <Canvas camera={{ position: [0, 4, 6], fov: 50 }} style={{ background: "white" }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[0, 5, 0]} intensity={0.5} penumbra={1} />
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <SpinningCoil onDotClick={setSelectedDot} />
          <CentralObject />
          <Grid
            args={[30, 30]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#e0e0e0"
            fadeDistance={5}
            fadeStrength={1}
          />
        </group>
        <OrbitControls
          enableRotate={true}
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minDistance={8}
          maxDistance={600}
        />
      </Canvas>
      <Modal
        isOpen={selectedDot !== null}
        onClose={() => setSelectedDot(null)}
        title={selectedDot !== null ? dotInfo[selectedDot].title : ""}
        content={selectedDot !== null ? dotInfo[selectedDot].content : ""}
      />
    </>
  )
}
  