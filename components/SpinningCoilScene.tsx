import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { SpinningCoil } from "./SpinningCoil"
import { CentralObject } from "./CentralObject"
import { Modal } from "@/components/Modal"
import { StarField } from './StarField'
import { dotInfo, dotKeys, type DotInfoKey } from "@/data/portfolio"

export default function SpinningCoilScene() {
  const [selectedDot, setSelectedDot] = useState<DotInfoKey | null>(null);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  const handleDotClick = (index: number) => {
    setSelectedDot(dotKeys[index]);
  };

  const cameraPosition: [number, number, number] = isMobile ? [0, 10, 15] : [0, 8, 12];
  const cameraFov = isMobile ? 50 : 35;

  const orbitControlProps = {
    enableRotate: true,
    enableZoom: true,
    enablePan: false,
    minPolarAngle: Math.PI / 4,
    maxPolarAngle: Math.PI / 2.5,
    minAzimuthAngle: isMobile ? -Math.PI / 2 : -Math.PI / 4,
    maxAzimuthAngle: isMobile ? Math.PI / 2 : Math.PI / 4,
    minDistance: isMobile ? 8 : 10,
    maxDistance: isMobile ? 25 : 20,
  };

  return (
    <div
        className="canvas-container fixed top-0 left-0 w-screen h-screen z-0"
        style={{
          height: '100dvh',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}>
       <Canvas
        key={isMobile.toString()}
        camera={{
          position: cameraPosition,
          fov: cameraFov,
          near: 0.1,
          far: 1000
        }}
        style={{
          background: "#121210",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100dvh"
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[0, 5, 0]} intensity={0.5} penumbra={1} />
        <group rotation={[-Math.PI / 2.5, -0.5, 0]}>
          <StarField />
          <SpinningCoil onDotClick={handleDotClick} />
          <CentralObject onClick={() => setShowAboutMe(true)} />
        </group>
        <OrbitControls {...orbitControlProps} />
      </Canvas>

      <Modal
        isOpen={selectedDot !== null}
        onClose={() => setSelectedDot(null)}
        title={selectedDot ? dotInfo[selectedDot].title : ""}
        content={selectedDot ? dotInfo[selectedDot].content : ""}
        type={selectedDot ? dotInfo[selectedDot].type : "default"}
      />

      {showAboutMe && (
        <Modal
          isOpen={showAboutMe}
          onClose={() => setShowAboutMe(false)}
          title={dotInfo.aboutMe.title}
          type="about"
          content={dotInfo.aboutMe.content}
        />
      )}
    </div>
  )
}
