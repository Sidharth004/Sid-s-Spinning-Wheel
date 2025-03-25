
import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import { SpinningCoil } from "./SpinningCoil"
import { CentralObject } from "./CentralObject"
import { Modal } from "@/components/Modal" 
import { StarField } from './StarField'

type DotInfoKey = 'writing' | 'experience' | 'projects' | 'github' | 'contact';
const dotLabels: DotInfoKey[] = ['writing', 'experience', 'projects', 'github', 'contact'];


const dotInfo = {
 
  aboutMe: {
    title: "About Me",
    type: "about" as const,
    content: {
      mainContent: "**Hey, I'm Sidharth!** A 22-year-old CS Engineer with a deep love for crypto.\n\nIn my *tiny* 2.5-year journey in Web3, I've had the chance to wear multiple hats—ranging from development and research analysis to PM, growth, and BD. And honestly? I love them all.\n\nRight now, I'm diving deep into Growth and Product roles.\n\nI started my professional Web3 journey in my sophomore year with Ethereum, and lately, I've been focusing more on state-aggregated chains like Push Chain and Solana (loving it so far!).\n\nThough crypto takes up ¾ of my day—whether it's work, research, or trenching—when it's time to touch grass, you'll find me:\n⚽ Playing football (*Man City for life!*)\n📺 Binge-watching *Suits*\n🚗 Going on long drives with my pals\n\nMy near-term goal? To contribute my best to consumer crypto applications and travel the world—living the true digital nomad life.",
      socialLinks: {
        twitter: "https://twitter.com/multichain_sid",
        telegram: "https://t.me/multichain_sid",
        linkedin: "https://www.linkedin.com/in/sidharth-kumthekar04r-70772b1a7/"
      }
    }
  },
  writing: {
    title: "Technical Writing: Favorite works",
    type: "writing" as const,
    content: {
      professional: [
        {
          year: 2024,
          blogs: [
            {
              title: "Understanding Proof of Stake and Push Chain",
              url: "https://push.org/blog/understand-proof-of-stake-and-push-chain/",
              label: "Explainer"
            },
            {
              title: "Why Push Chain?",
              url: "https://push.org/blog/why-push-chain/",
              label: "Case Study & Research"
            },
            {
              title: "How Wallets Use Push to Become a Super App",
              url: "https://push.org/blog/how-wallets-use-push-to-become-a-super-app/",
              label: "Case Study & Research"
            },
            {
              title: "Interoperable Communications: Moving Across an Open Web with Push",
              url: "https://push.org/blog/interoperable-communications-moving-across-an-open-web-with-push/",
              label: "Case Study & Research"
            },
            {
              title:"EIP-3664 - The full guide to advanced NFT Properties",
              url:"https://www.cyfrin.io/blog/eip-3664-full-guide-to-nft-properties",
              label:"Tutorial"
            }
          ]
        },
        {
          year: 2023,
          blogs: [
            {
              title: "Modular vs Monolithic Blockchains",
              url: "https://www.alchemy.com/overviews/modular-vs-monolithic-blockchains",
              label: "Explainer"
            },
            {
              title: "Permissionless vs Permissioned Blockchains",
              url: "https://www.alchemy.com/overviews/permissionless-vs-permissioned-blockchains",
              label: "Explainer"
            },
            {
              title: "Solana Program Library",
              url: "https://www.alchemy.com/overviews/solana-program-library",
              label: "Tutorial"
            }
          ]
        },
        {
          year: 2022,
          blogs: [
            {
              title: "Polkadot vs Ethereum: The Full Comparison",
              url: "https://vitto.cc/polkadot-vs-ethereum-the-full-comparison/",
              label: "Explainer"
            }
          ]
        }
      ],
      personal: [
        {
          title: "Understanding Push Protocol: A Web3 Communication Tale from A to P",
          url: "https://medium.com/@kumthekarsid/understanding-push-protocol-a-web3-communication-tale-from-a-to-p-c0c29274211f",
          label: "Explainer"
        },
        {
          title: "The Google-Powered Blockchain Node Engine",
          url: "https://medium.com/@kumthekarsid/the-google-powered-blockchain-node-engine-8009b33a3ef1",
          label: "Explainer"
        }
      ]
    }
  },
  experience: {
    title: "Professional Experience",
    type: "experience",
    content: [
      {
        company: "🔗 Push Protocol",
        companyUrl: "https://push.org",
        role: "Growth",
        duration: "Feb. 2024 – Present",
        location: "Dubai (Remote)",
        achievements: [
          {text:"Led an informative social content campaign, resulting in 53,000 new protocol users—a 160% increase in monthly user growth"},
          {
            text: "Ideated and executed a reputation-based points program, driving 70,000+ new protocol users and increasing the Fee Pool by $76,000.",
            links: [
              { text: "points program", url: "https://push.org/points" }
            ]
          },
          {text:"Onboarded eight Tier A/B partners like SpaceID, QuickSwap for joint points program activities"},
          {text:"Designed and optimised an acquisition funnel for Push's early user NFT holders, converting 600+ holders into Push's gated Group Chat within 24 hours."},
          {text:"Managed Galxe campaigns, KOL onboarding and investor communications to amplify Push's market presence."}
        ]
      },
      {
        company: "🔗 Merkle Labs",
        companyUrl: "https://merklelabs.xyz/",
        role: "Product Manager",
        duration: "May. 2023 – Nov. 2023",
        location: "Dubai (Remote)",
        achievements: [
          { 
            text:"Led a 10-member team in building and launching 'Wardrobe'—Solana's first NFT traits marketplace and customization platform.",
            links:[{text:"Wardrobe", url:"https://wardrobe.com"}]
          },
          {
            text:"Demonstrated the live product at Solana Hacker House Mumbai '23, forming new partnerships and driving a 35% increase in first-time transactions.",
            links:[{text:"Solana Hacker House Mumbai '23",url:"https:youtube.com"}]
          },
          {
            text:"Designed a product pitch deck, securing onboarding leads from 10+ NFT collections within one month."

          }
        ]
      },
      {
        company: "🔗 Alchemy",
        companyUrl: "https://push.org",
        role: "Analyst",
        duration: "Nov. 2022 – Oct. 2024",
        location: "San Francisco (Remote)",
        achievements: [

          {
            text:"Authored technical guides on Solana Programming Library, Rollups, Modular Blockchains, and Subgraphs, averaging 50,000 monthly views."
          },
          {
            text:"Analyzed and published educative content for 100+ Web3 DApps and tools on Alchemy DappStore—the internet's largest blockchain tools repository."
          }
        ]
      },
      {
        company: "🔗 Reblue Ventures",

        companyUrl: "https://push.org",
        role: "Gen.AI Backend Developer Intern",
        duration: "Nov.2023 – Feb 2024",
        location: "India, Onsite",
        achievements: [
          {
            text:"Designed and developed a serverless Retrieval-Augmented Generation (RAG) workflow to analyze 300+ sustainability reports, extracting complex graphical and analytical data and performing complex reasoning tasks, achieving 86% accuracy."
          }
        ],
        tech: "Python, Google Cloud Suite, Gemini, Text-Bison, Cloud Functions, Langchain, SQL"
      },
      {
        company: "🔗 Dot Names",

        companyUrl: "https://dotnames.me",
        role: "BD Specialist",
        duration: "Nov 2023 - Jan 2024",
        location: "Remote",
        achievements: [
          {
            text:"Onboarded over 26 projects from Taiko zkevm, Blast L2, Omni and Sei Ecosystems under Dot Name's Domain Support cover"
          }
        ]
      },
      {
        company: "🔗 Articleship - Vitto Rivabella",

        companyUrl: "https://vitto.cc",
        role: "Technical Content Writer and Strategist",
        duration: "Oct 2022 – Dec 2022",
        location: "Remote",
        achievements: [
          {
            text:"Wrote technical guides on Web3 development. Received a QRT from Gavin Wood on Polkadot vs Ethereum article"
          }
        ]
      }
    ]
  },
  projects: {
    title: "Projects",
    content: "...",
    type: "default"
  },
  github: {
    title: "GitHub Activity",
    type: "github" as const,
    content: null
  },
  contact: {
    title: "Contact",
    type: "contact" as const,
    content: {
        Email: {
            value: "kumthekarsid@gmail.com",
            url: "mailto:kumthekarsid@gmail.com"
        },
        X: {
            value: "@multichain_sid",
            url: "https://twitter.com/multichain_sid"
        },
        Telegram: {
            value: "@multichain_sid",
            url: "https://t.me/multichain_sid"
        },
        LinkedIn: {
            value: "Sidharth Kumthekar",
            url: "https://linkedin.com/in/your-profile"
        }
    }
}
}


export default function SpinningCoilScene() {
  const [selectedDot, setSelectedDot] = useState<DotInfoKey | null>(null);
  const [showAboutMe, setShowAboutMe] = useState(false);

  const handleDotClick = (index: number) => {
    const keys: DotInfoKey[] = ['writing', 'experience', 'projects', 'github', 'contact'];
    setSelectedDot(keys[index]);
  };


  return (
    <>
    <Canvas camera={{ position: [0, 8, 12], fov: 35, near: 0.1,far:1000 }} style={{ background: "white" }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight position={[0, 5, 0]} intensity={0.5} penumbra={1} />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <StarField /> 
        <SpinningCoil onDotClick={handleDotClick} />
        <CentralObject onClick={() => setShowAboutMe(true)} />
        <Grid
          args={[40, 40]}
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
        minDistance={10}
        maxDistance={20}
      />
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
    </>
  )
}
