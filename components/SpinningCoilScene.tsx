
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import { SpinningCoil } from "./SpinningCoil"
import { CentralObject } from "./CentralObject"
import { Modal } from "@/components/Modal" 

type DotInfoKey = 'about' | 'experience' | 'projects' | 'github' | 'contact';
const dotLabels: DotInfoKey[] = ['about', 'experience', 'projects', 'github', 'contact'];

const dotInfo = {
  about: {
    title: "About Me",
    content: "Your about content here...",
    type: "default"
  },
  experience: {
    title: "Professional Experience",
    type: "experience",
    content: [
      {
        company: "Push Protocol",
        role: "Growth Marketer",
        duration: "Feb. 2024 – Present",
        location: "Dubai (Remote)",
        achievements: [
          "Led an informative social content campaign, resulting in 53,000 new protocol users—a 160% increase in monthly user growth.",
          "Ideated and executed a reputation-based points program, driving 70,000+ new protocol users and increasing the Fee Pool by $76,000.",
          "Onboarded eight Tier A/B partners like SpaceID, QuickSwap for joint points program activities",
          "Designed and optimised an acquisition funnel for Push's early user NFT holders, converting 600+ holders into Push's gated Group Chat within 24 hours.",
          "Managed Galxe campaigns, KOL onboarding and investor communications to amplify Push's market presence."
        ]
      },
      {
        company: "Merkle Labs",
        role: "Product Manager",
        duration: "May. 2023 – Nov. 2023",
        location: "Dubai (Remote)",
        achievements: [
          "Led a 10-member team in building and launching 'Wardrobe'—Solana's first NFT traits marketplace and customization platform.",
          "Demonstrated the live product at Solana Hacker House Mumbai '23, forming new partnerships and driving a 35% increase in first-time transactions.",
          "Designed a product pitch deck, securing onboarding leads from 10+ NFT collections within one month."
        ]
      },
      {
        company: "Alchemy",
        role: "Analyst",
        duration: "Nov. 2022 – Oct. 2024",
        location: "San Francisco (Remote)",
        achievements: [
          "Authored technical guides on Solana Programming Library, Rollups, Modular Blockchains, and Subgraphs, averaging 50,000 monthly views.",
          "Analyzed and published educative content for 100+ Web3 DApps and tools on Alchemy DappStore—the internet's largest blockchain tools repository."
        ]
      },
      {
        company: "Reblue Ventures",
        role: "Gen.AI Backend Developer Intern",
        duration: "Nov.2023 – Feb 2024",
        location: "India, Onsite",
        achievements: [
          "Designed and developed a serverless Retrieval-Augmented Generation (RAG) workflow to analyze 300+ sustainability reports, extracting complex graphical and analytical data and performing complex reasoning tasks, achieving 86% accuracy."
        ],
        tech: "Python, Google Cloud Suite, Gemini, Text-Bison, Cloud Functions, Langchain, SQL"
      }
    ]
  },
  projects: {
    title: "Projects",
    content: "Your projects content here...",
    type: "default"
  },
  github: {
    title: "GitHub",
    content: "Your GitHub content here...",
    type: "default"
  },
  contact: {
    title: "Contact",
    content: "Your contact content here...",
    type: "default"
  }
} as const;

export default function SpinningCoilScene() {
  const [selectedDot, setSelectedDot] = useState<DotInfoKey | null>(null);

  const handleDotClick = (index: number) => {
    const keys: DotInfoKey[] = ['about', 'experience', 'projects', 'github', 'contact'];
    setSelectedDot(keys[index]);
  };


  return (
    <>
    <Canvas camera={{ position: [0, 4, 6], fov: 50 }} style={{ background: "white" }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight position={[0, 5, 0]} intensity={0.5} penumbra={1} />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <SpinningCoil onDotClick={handleDotClick} />
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
      title={selectedDot ? dotInfo[selectedDot].title : ""}
      content={selectedDot ? dotInfo[selectedDot].content : ""}
      type={selectedDot ? dotInfo[selectedDot].type : "default"}
    />
  </>
  )
}
  