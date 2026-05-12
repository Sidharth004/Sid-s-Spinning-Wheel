// ============================================================
// SINGLE SOURCE OF TRUTH FOR ALL SEO METADATA
// Edit titles, descriptions, OG tags, and JSON-LD here.
// All pages import from this file.
// ============================================================

import type { Metadata } from 'next'

export const siteUrl = 'https://sidlovescrypto.xyz'
export const siteName = "Sid's Cryptoverse"
export const defaultAuthor = 'Sidharth Kumthekar'

// ---------- Page Metadata ----------

export const seoMeta = {

  home: {
    title: "Sidharth Kumthekar | Crypto GTM",
    description: "Portfolio of Sidharth Kumthekar — Contains experience, side quests, writings and more",
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "Sidharth Kumthekar | Crypto GTM",
      description: "Portfolio of Sidharth Kumthekar — Contains experience, side quests, writings and more.",
      url: siteUrl,
      siteName,
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "Sidharth Kumthekar | Crypto GTM",
      description: "Portfolio of Sidharth Kumthekar — Contains experience, side quests, writings and more",
      creator: "@sidisgame",
    },
    alternates: {
      canonical: siteUrl,
    },
  } satisfies Metadata,

  writing: {
    title: "Writing | Sidharth Kumthekar",
    description: "Technical writing, research, and hot takes by Sidharth Kumthekar.",
    alternates: { canonical: `${siteUrl}/writing` },
  } satisfies Metadata,

  experience: {
    title: "Experience | Sidharth Kumthekar",
    description: "Work history of Sidharth Kumthekar — Growth Marketing Lead at Push Chain, PM at Doge Capital, Analyst at Alchemy, and more.",
    alternates: { canonical: `${siteUrl}/experience` },
  } satisfies Metadata,

  sideQuests: {
    title: "Side Quests | Sidharth Kumthekar",
    description: "Side projects by Sidharth Kumthekar.",
    alternates: { canonical: `${siteUrl}/side-quests` },
  } satisfies Metadata,

  growthJams: {
    title: "Growth Jams | Sidharth Kumthekar",
    description: "Growth strategy decks and marketing playbooks by Sidharth Kumthekar for Web3 projects like Dynamic, Crossmint, Phantom, and Eclipse.",
    alternates: { canonical: `${siteUrl}/growth-jams` },
  } satisfies Metadata,

  contact: {
    title: "Contact | Sidharth Kumthekar",
    description: "Get in touch with Sidharth Kumthekar — email, X, Telegram, or LinkedIn.",
    alternates: { canonical: `${siteUrl}/contact` },
  } satisfies Metadata,

  about: {
    title: "About | Sidharth Kumthekar",
    description: "Sidharth Kumthekar — About me",
    alternates: { canonical: `${siteUrl}/about` },
  } satisfies Metadata,

}

// ---------- JSON-LD Structured Data (for layout.tsx <head>) ----------

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sidharth Kumthekar",
  "url": siteUrl,
  "jobTitle": "Growth Marketing Lead",
  "worksFor": { "@type": "Organization", "name": "Push Protocol" },
  "sameAs": [
    "https://x.com/sidisgame",
    "https://www.linkedin.com/in/sidharth-kumthekar04r-70772b1a7/",
    "https://t.me/multichain_sid",
  ],
}
