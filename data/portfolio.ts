// ============================================================
// SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
// Edit your content here — it flows to every part of the site.
// ============================================================

// ---------- Shared Types ----------

export interface SideQuest {
  id: string
  title: string
  description: string
  image: string | null
  ctaText: string
  ctaLink: string
}

export interface GrowthJam {
  id: string
  title: string
  description: string
  image: string | null
  ctaText: string
  ctaLink: string
}

export interface Achievement {
  text: string
  links?: { text: string; url: string }[]
}

export interface Experience {
  company: string
  companyUrl?: string
  role: string
  duration: string
  location: string
  achievements: Achievement[]
  tech?: string
}

export interface ContactInfo {
  value: string
  url: string
}

export interface Contact {
  [key: string]: ContactInfo
}

export interface WritingContent {
  professional: Array<{
    year: number
    blogs: Array<{
      title: string
      url: string
      label: string
    }>
  }>
  personal: Array<{
    title: string
    url: string
    label: string
  }>
}

export interface AboutContent {
  mainContent: string
  socialLinks: {
    twitter: string
    telegram: string
    linkedin: string
  }
}

export interface Milestone {
  id: string
  x: number
  y: number
  image: string
  caption: string
  xLabel: string
}

// ---------- Section Keys ----------

export type DotInfoKey = 'writing' | 'experience' | 'sideQuests' | 'github' | 'contact' | 'growthJams'
export const dotKeys: DotInfoKey[] = ['writing', 'experience', 'sideQuests', 'github', 'contact', 'growthJams']

// ---------- Content Data ----------

export const aboutMe = {
  title: "About Me",
  type: "about" as const,
  content: {
    mainContent: "",
    socialLinks: {
      twitter: "https://twitter.com/multichain_sid",
      telegram: "https://t.me/multichain_sid",
      linkedin: "https://www.linkedin.com/in/sidharth-kumthekar04r-70772b1a7/",
    },
  } satisfies AboutContent,
}

export const milestones: Milestone[] = [
  { id: "1", x: 10, y: 15, image: "/schoolbiz.jpg", caption: "School time Bizznesss", xLabel: "2014" },
  { id: "2", x: 25, y: 35, image: "/act.jpg", caption: "Sid + Humor + Acting = Housefull Show", xLabel: "2017" },
  { id: "3", x: 40, y: 55, image: "/standup.mp4", caption: "First Highschool standup", xLabel: "2019" },
  { id: "4", x: 60, y: 75, image: "/demo.jpeg", caption: "Genesis demo - Solana HH'23", xLabel: "2023" },
  { id: "5", x: 75, y: 85, image: "/football.jpeg", caption: "Always in the game", xLabel: "2023" },
  { id: "6", x: 90, y: 95, image: "/award.jpeg", caption: "Won best Int'l achievements award", xLabel: "2024" },
  { id: "7", x: 95, y: 80, image: "/tshirtpilot.jpeg", caption: "Launched clothing brand for nerds", xLabel: "2024" },
]

export const sideQuests: SideQuest[] = [
  {
    id: "1",
    title: "Scrap It",
    description: "Uber for door to door domestic scrap collection. Find nearby scrap collectors - schedule pickup from doorstep. Dignifying lives of domestic scrap pedlars :) ",
    image: "/scrapit.png",
    ctaText: "Copyright Granted",
    ctaLink: "https://drive.google.com/file/d/1pb4pXkibDCQ8lhc1VYRMq77WH1PjlWZ-/view",
  },
  {
    id: "2",
    title: "BaldyCollector",
    description: "Scan Bald Legends at Solana Baldpoint'25 (Breakpoint). Top the Bald Counter Leadboard. Win $bald airdrop from the Baldcoin community (NFA!!)  ",
    image: "/baldycollector.jpeg",
    ctaText: "Try Here (no wallet connection required)",
    ctaLink: "https://baldycollector.vercel.app",
  },
  {
    id: "3",
    title: "Get Me a Tshirt Daddy",
    description: "Meme merch clothing brand for nerds.",
    image: "/tee.png",
    ctaText: "Learn More",
    ctaLink: "https://slight-imagine-556149.framer.app/",
  },
]

export const growthJams: GrowthJam[] = [
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
    title: "Marketing Ideas for super scaling Phantom's adoption",
    description: "Focussed on User Icentives & Community Love",
    image: "/phantom_growthtips.png",
    ctaText: "Glance in detail",
    ctaLink: "https://docs.google.com/document/d/1jRo-ISJNKPz_2FEaOLZ35OiTt4KZ4HW-mWuHyAqhdm8/edit?usp=sharing",
  },
  {
    id: "4",
    title: "3 Easy tips for turbocharging the Eclipse Ecosystem",
    description: "marketing-focused tips for shaping, sustaining, and expanding Eclipse's ecosystem around the globe!",
    image: "/eclipse_growthtips.png",
    ctaText: "Here's How",
    ctaLink: "https://docs.google.com/document/d/1fCZSz4u4iXt0oObJUA6Lw-ng4yRsTwgHmKSAtw6uBcc/edit?usp=sharing",
  },
]

export const writing: WritingContent = {
  professional: [
    {
      year: 2025,
      blogs: [
        { title: "Is Push Chain Another L1?", url: "https://push.org/blog/another-l1/", label: "Explainer" },
        { title: "What are Universal Executor Accounts (UEAs) and How do they work?", url: "https://push.org/blog/what-are-universal-executor-accounts/", label: "Explainer" },
      ],
    },
    {
      year: 2024,
      blogs: [
        { title: "Understanding Proof of Stake and Push Chain", url: "https://push.org/blog/understand-proof-of-stake-and-push-chain/", label: "Explainer" },
        { title: "Why Push Chain?", url: "https://push.org/blog/why-push-chain/", label: "Case Study & Research" },
        { title: "How Wallets Use Push to Become a Super App", url: "https://push.org/blog/how-wallets-use-push-to-become-a-super-app/", label: "Case Study & Research" },
        { title: "Interoperable Communications: Moving Across an Open Web with Push", url: "https://push.org/blog/interoperable-communications-moving-across-an-open-web-with-push/", label: "Case Study & Research" },
      ],
    },
    {
      year: 2023,
      blogs: [
        { title: "Modular vs Monolithic Blockchains", url: "https://www.alchemy.com/overviews/modular-vs-monolithic-blockchains", label: "Explainer" },
        { title: "Permissionless vs Permissioned Blockchains", url: "https://www.alchemy.com/overviews/permissionless-vs-permissioned-blockchains", label: "Explainer" },
        { title: "Solana Program Library", url: "https://www.alchemy.com/overviews/solana-program-library", label: "Tutorial" },
      ],
    },
    {
      year: 2022,
      blogs: [
        { title: "Polkadot vs Ethereum: The Full Comparison", url: "https://vitto.cc/polkadot-vs-ethereum-the-full-comparison/", label: "Explainer" },
      ],
    },
  ],
  personal: [
    { title: "Understanding Push Protocol: A Web3 Communication Tale from A to P", url: "https://medium.com/@kumthekarsid/understanding-push-protocol-a-web3-communication-tale-from-a-to-p-c0c29274211f", label: "Explainer" },
    { title: "The Google-Powered Blockchain Node Engine", url: "https://medium.com/@kumthekarsid/the-google-powered-blockchain-node-engine-8009b33a3ef1", label: "Explainer" },
  ],
}

export const experiences: Experience[] = [
  {
    company: "Push Protocol (Push Chain)",
    companyUrl: "https://push.org",
    role: "Growth",
    duration: "Feb. 2024 – Present",
    location: "Dubai (Remote)",
    achievements: [
      { text: "Directed 15+ marketing campaigns. One of which, grew protocol users by 160% (adding 53,000 new users in one month)." },
      {
        text: "Conceptualized and executed a series of reputation-based points programs, driving Push Chain's journey to Mainnet - onboarding 90,000+ Push Chain users, ~ 5 Million Testnet Txns and increasing notifications protocol revenue by $76,000 in 7 days.",
        links: [{ text: "points programs", url: "https://portal.push.org/" }],
      },
      { text: "Onboarded 8+ Tier A partners like SpaceID, QuickSwap for joint points program activities." },
      { text: "Designed an acquisition funnel for Push's NFT gated group chat feature, achieving 87% VIP user conversion within 3 hours of launch." },
      { text: "Authored 15+ research pieces, product case studies, and ecosystem blogs to establish Push as a leader in Omni chain tech and Web3 communications." },
      { text: "Managed Galxe campaigns, KOL onboarding and investor communications to amplify Push's market presence." },
      {
        text: "Scribed the rebranding lore for Push Communications Protocol -> Push Chain",
        links: [
          { text: "Push Communications Protocol", url: "https://x.com/PushChain/status/1951645144832152007" },
          { text: "Push Chain", url: "https://x.com/PushChain/status/1953464954767442241" },
        ],
      },
    ],
  },
  {
    company: "Doge Capital",
    companyUrl: "https://thedogecapital.com/",
    role: "Product Manager",
    duration: "May. 2023 – Nov. 2023",
    location: "Dubai (Remote)",
    achievements: [
      {
        text: " Led 10-member team across design, dev, and marketing to launch 'Wardrobe.live'- Solana's first NFT traits marketplace and NFT customization platform - from 0 to launch in 5 months.",
        links: [{ text: "Wardrobe.live", url: "https://wardrobe.com" }],
      },
      {
        text: "Represented Wardrobe.live on the main stage at Solana Hacker House- Mumbai '23, securing multiple partnerships and a 45% growth in first-time transactions.",
        links: [{ text: "Solana Hacker House Mumbai '23", url: "https://youtube.com" }],
      },
      { text: "Designed product pitch deck, onboarded 7+ NFT collections(incl. Doge Capital, MMCC and Gruuvies) within the first month post-launch." },
    ],
  },
  {
    company: "Alchemy",
    companyUrl: "https://www.alchemy.com",
    role: "Analyst",
    duration: "Nov. 2022 – Oct. 2024",
    location: "San Francisco (Remote)",
    achievements: [
      {
        text: "Authored technical guides on Solana Programming Library, Rollups, Modular Blockchains, and Subgraphs, averaging 50,000 monthly views.",
        links: [{ text: "Authored technical guides", url: "https://www.alchemy.com/author/sidharth-kumthekar" }],
      },
      {
        text: "Researched and published short-form insights on 100+ Web3 DApps and tools for Alchemy DappStore - helping scale the world's largest blockchain tools directory.",
        links: [{ text: "world's largest blockchain tools directory", url: "https://www.alchemy.com/dapps" }],
      },
    ],
  },
  {
    company: "Reblue Ventures",
    companyUrl: "https://www.reblueventures.com",
    role: "Gen.AI Backend Developer Intern",
    duration: "Nov.2023 – Feb 2024",
    location: "India, Onsite",
    achievements: [
      {
        text: "Designed and inplemented a serverless Retrieval-Augmented Generation (RAG) workflow to process 400+ corporate sustainability reports, enabling complex graph + text extraction, reasoning, achieving 86% accuracy.",
        links: [{ text: "serverless Retrieval-Augmented Generation (RAG) workflow", url: "https://www.reblueventures.com/SustainSwift" }],
      },
    ],
    tech: "Python, Google Cloud Suite, Google Gemini, Text-Bison, Cloud Functions, Langchain, SQL.",
  },
]

export const contact: Contact = {
  Email: { value: "kumthekarsid@gmail.com", url: "mailto:kumthekarsid@gmail.com" },
  X: { value: "@multichain_sid", url: "https://twitter.com/multichain_sid" },
  Telegram: { value: "@multichain_sid", url: "https://t.me/multichain_sid" },
  LinkedIn: { value: "Sidharth Kumthekar", url: "https://www.linkedin.com/in/sidharth-kumthekar04r-70772b1a7/" },
}

// ---------- Assembled dot info (used by SpinningCoilScene) ----------

export const dotInfo = {
  github: { title: "GitHub Activity", type: "github" as const, content: null },
  aboutMe: aboutMe,
  sideQuests: { title: "Side Quests", type: "sideQuests" as const, content: sideQuests },
  growthJams: { title: "Growth Jams", type: "growthJams" as const, content: growthJams },
  writing: { title: "Technical Writing", type: "writing" as const, content: writing },
  experience: { title: "Experience", type: "experience" as const, content: experiences },
  contact: { title: "Contact", type: "contact" as const, content: contact },
}
