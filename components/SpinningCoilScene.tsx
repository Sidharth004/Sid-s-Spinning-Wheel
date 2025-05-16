import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Grid } from "@react-three/drei"
import { SpinningCoil } from "./SpinningCoil"
import { CentralObject } from "./CentralObject"
import { Modal } from "@/components/Modal" 
import { StarField } from './StarField'

type DotInfoKey = 'writing' | 'experience' | 'sideQuests' | 'github' | 'contact'|'growthJams';
const dotLabels: DotInfoKey[] = ['writing', 'experience', 'sideQuests', 'github', 'contact','growthJams'];

// Keep your existing dotInfo object unchanged
const dotInfo = {
  // Your existing dotInfo configuration
  github: {
    title: "GitHub Activity",
    type: "github" as const,
    content: null
  },
  aboutMe: {
    title: "About Me",
    type: "about" as const,
    content: {
      mainContent: "**Hey, I'm Sidharth!** A 22-year-old CS Engineer with a deep love for crypto.\n\nIn my *tiny* 2.5-year journey in Web3, I've had the chance to wear multiple hats—ranging from development and research analysis to PM, growth, and BD. And honestly? I love them all.\n\nRight now, I'm diving deep into Growth and Product roles.\n\nI started my professional Web3 journey in my sophomore year with Ethereum, and lately, I've been focusing more on state-aggregated chains like Push Chain and Solana (loving it so far!).\n\nThough crypto takes up ¾ of my day—whether it's work, research, or trenching—when it's time to touch grass, you'll find me:\n⚽ Playing football (*Man City for life!*)\n📺 Binge-watching *Suits*\n🚗 Going on long drives with my pals\n\nMy near-term goal? To contribute my best to consumer crypto applications and travel the world—living the true digital nomad life.",
      socialLinks: {
        solscan: "https://solscan.io/address/YOUR_SOL_WALLET_ADDRESS",
        twitter: "https://twitter.com/multichain_sid",
        telegram: "https://t.me/multichain_sid",
        linkedin: "https://www.linkedin.com/in/sidharth-kumthekar/"
      }
    }
  },
  sideQuests: {
    title: "Side Quests",
    type: "sideQuests" as const,
    content: [
      {
        id: "1",
        title: "Scrap It",
        description: "Uber for door to door domestic scrap collection. Find nearby scrap collectors - schedule pickup from doorstep. Dignifying lives of domestic scrap pedlars :) ",
        image: '/scrapit.png',
        ctaText: "Copyright Granted",
        ctaLink: "https://drive.google.com/file/d/1pb4pXkibDCQ8lhc1VYRMq77WH1PjlWZ-/view",
      },
      {
        id: "2",
        title: "Get Me a Tshirt Daddy",
        description: "Meme merch clothing brand for nerds.",
        image: "/tee.png",
        ctaText: "Learn More",
        ctaLink: "https://slight-imagine-556149.framer.app/",
      },
      
    ]
  },
  growthJams: {
    title: "growthJams",
    type: "growthJams" as const,
    content: [
      {
      id: "1",
      title: "Growth Tips for Superscaling Dynamic",
      description: "Focussed on strengthening 3 key pillars: 1) Narrative & Brand Positioning || 2) Distribution & Activation || 3) Education & Thought Leadership ",
      image: "/dynamic_growthtips.jpg",
      ctaText: "Complete Revealation",
      ctaLink: "https://www.notion.so/Growth-Marketing-Tips-to-Super-Scale-Dynamic-1ce3f0bf4809806da9fcf4b35aa443b4?pvs=4",
    },
    {
      id: "2",
      title: "Content & Growth Hacking Tips for Crossmint",
      description: "Crossmint is a dev tool provider for crypto apps - known best for its user onboarding tools, payment rails and AI agent SDKs",
      image: "/crossmint_growthtips.png",
      ctaText: "Know More",
      ctaLink: "https://docs.google.com/document/d/1WfQIx86dZHiQcpsvrI7XG_RSPAnAJIpwx98o0yuKYjA/edit?usp=sharing",
    },
   
    {
      id: "3",
      title: "Marketing Ideas for super scaling Phantom’s adoption",
      description: "Focussed on User Icentives & Community Love",
      image: "/phantom_growthtips.png",
      ctaText: "Glance in detail",
      ctaLink: "https://docs.google.com/document/d/1jRo-ISJNKPz_2FEaOLZ35OiTt4KZ4HW-mWuHyAqhdm8/edit?usp=sharing",
    },
    ]
  },
  
  writing: {
    title: "Technical Writing",
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
    title: "Experience",
    type: "experience",
    content: [
      {
        company: "Push Protocol",
        companyUrl: "https://push.org",
        role: "Growth",
        duration: "Feb. 2024 – Present",
        location: "Dubai (Remote)",
        achievements: [
          {text:"Directed a use-case-driven social campaign, growing protocol users by 160% (adding 53,000 new users in one month)."},
          {
            text: "Conceptualized and executed a series of reputation-based points programs, driving Push Chain’s journey to Mainnet - onboarding 90,000+ Push Chain users, ~1 Million Devnet Txns and increasing notifications protocol revenue by $76,000 in 7 days.",
            links: [
              { text: "points program", url: "https://push.org/points" }
            ]
          },
          {text:"Onboarded eight Tier A/B partners like SpaceID, QuickSwap for joint points program activities."},
          {text:"Designed an acquisition funnel for Push’s NFT gated group chat feature, achieving 87% VIP user conversion within 3 hours of launch."},
          {text:"Authored 15+ research pieces, product case studies, and ecosystem blogs to establish Push as a leader in Omni chain tech and Web3 communications."},
          {text:"Managed Galxe campaigns, KOL onboarding and investor communications to amplify Push's market presence."}
        ]
      },
      {
        company: "Doge Capital",
        companyUrl: "https://thedogecapital.com/",
        role: "Product Manager",
        duration: "May. 2023 – Nov. 2023",
        location: "Dubai (Remote)",
        achievements: [
          { 
            text:" Led 10-member team across design, dev, and marketing to launch ‘Wardrobe.live’- Solana’s first NFT traits marketplace and NFT customization platform - from 0 to launch in 5 months.",
            links:[{text:"Wardrobe", url:"https://wardrobe.com"}]
          },
          {
            text:"Represented Wardrobe.live on the main stage at Solana Hacker House- Mumbai ’23, securing multiple partnerships and a 45% growth in first-time transactions.",
            links:[{text:"Solana Hacker House Mumbai '23",url:"https:youtube.com"}]
          },
          {
            text:"Designed product pitch deck, onboarded 7+ NFT collections(incl. Doge Capital, MMCC and Gruuvies) within the first month post-launch."

          }
        ]
      },
      {
        company: "Alchemy",
        companyUrl: "https://push.org",
        role: "Analyst",
        duration: "Nov. 2022 – Oct. 2024",
        location: "San Francisco (Remote)",
        achievements: [
          {
            text:"Authored technical guides on Solana Programming Library, Rollups, Modular Blockchains, and Subgraphs, averaging 50,000 monthly views."
          },
          {
            text:"Researched and published short-form insights on 100+ Web3 DApps and tools for Alchemy DappStore - helping scale the world’s largest blockchain tools directory."
          }
        ]
      },
      {
        company: "Reblue Ventures",
        companyUrl: "https://push.org",
        role: "Gen.AI Backend Developer Intern",
        duration: "Nov.2023 – Feb 2024",
        location: "India, Onsite",
        achievements: [
          {
            text:"Designed and inplemented a serverless Retrieval-Augmented Generation (RAG) workflow to process 400+ corporate sustainability reports, enabling complex graph + text extraction, reasoning, achieving 86% accuracy."
          }
        ],
        tech: "Python, Google Cloud Suite, Google Gemini, Text-Bison, Cloud Functions, Langchain, SQL."
      }
    ]
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
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device and adjust camera and controls
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Set custom viewport height variable to handle mobile browsers correctly
  useEffect(() => {
    // Set custom viewport height variable
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Initial call
    setVH();
    
    // Set on resize
    window.addEventListener('resize', setVH);
    
    // Cleanup
    return () => window.removeEventListener('resize', setVH);
  }, []);

  const handleDotClick = (index: number) => {
    const keys: DotInfoKey[] = ['writing', 'experience', 'sideQuests', 'github', 'contact','growthJams'];
    setSelectedDot(keys[index]);
  };

  // Adjust camera position and field of view based on device size
  const cameraPosition: [number, number, number] = isMobile ? [0, 10, 15] : [0, 8, 12];
  const cameraFov = isMobile ? 50 : 35;
  
  // Adjust control constraints based on device
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
        // className="canvas-container" style={{ width: '100%', height: 'calc(var(--vh, 1vh) * 100)', position: 'relative' }}>
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
        dpr={[1, 2]} // Optimize for different device pixel ratios
        performance={{ min: 0.5 }} // Better performance on low-end devices
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }} // Optimize resize performance
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <spotLight position={[0, 5, 0]} intensity={0.5} penumbra={1} />
        <group rotation={[-Math.PI / -0.4, -0.5, 0]}>
          <StarField /> 
          <SpinningCoil onDotClick={handleDotClick} />
          <CentralObject onClick={() => setShowAboutMe(true)} />
          {/* <Grid
            args={[40, 40]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#e0e0e0"
            fadeDistance={5}
            fadeStrength={1}
          /> */}
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