# SEO TODO List

## Quick Wins (ready to implement, content already vetted)

### 1. Create `/public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://sidlovescrypto.xyz/sitemap.xml
```

---

### 2. Create `/public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sidlovescrypto.xyz/</loc>
    <lastmod>2026-05-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

### 3. Update metadata in `app/layout.tsx`
```tsx
export const metadata: Metadata = {
  title: "Sidharth Kumthekar | Web3 Growth & Marketing Lead",
  description: "Portfolio of Sidharth Kumthekar — Growth Marketing Lead at Push Chain. Blockchain researcher, technical writer, and web3 builder with experience at Alchemy, Push Protocol and more.",
  metadataBase: new URL("https://sidlovescrypto.xyz"),
  openGraph: {
    title: "Sidharth Kumthekar | Web3 Growth & Marketing Lead",
    description: "Portfolio of Sidharth Kumthekar — Growth Marketing Lead at Push Chain. Blockchain researcher, technical writer, and web3 builder.",
    url: "https://sidlovescrypto.xyz",
    siteName: "Sid's Cryptoverse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidharth Kumthekar | Web3 Growth & Marketing Lead",
    description: "Portfolio of Sidharth Kumthekar — Growth Marketing Lead at Push Chain.",
    creator: "@sidisgame",
  },
  alternates: {
    canonical: "https://sidlovescrypto.xyz",
  },
}
```

---

### 4. Add JSON-LD structured data inside `<head>` in `app/layout.tsx`
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sidharth Kumthekar",
  "url": "https://sidlovescrypto.xyz",
  "jobTitle": "Growth Marketing Lead",
  "worksFor": { "@type": "Organization", "name": "Push Protocol" },
  "sameAs": [
    "https://x.com/sidisgame",
    "https://www.linkedin.com/in/sidharth-kumthekar04r-70772b1a7/",
    "https://t.me/multichain_sid"
  ]
}
</script>
```

---

### 5. Update H1 in `app/page.tsx`
- **From:** `Welcome to Sid's Cryptoverse 🧑‍🚀`
- **To:** `Sidharth Kumthekar's Cryptoverse 🧑‍🚀`

---

## Bigger Fix (needs scoping + discussion)

### 6. Add static crawlable section below the canvas
All meaningful content (writing, experience, side quests) is locked inside modals — Googlebot won't click to open them, so none of it is indexed.

**Fix:** Add a static HTML section below the canvas that surfaces name, role, and key writing links in plain HTML — no modals, no JS required. This is the single biggest SEO unlock after the quick wins.

---

## Notes
- Site is currently **completely unindexed** on Google (`site:sidlovescrypto.xyz` returns zero results)
- Three.js canvas is an indirect culprit via Core Web Vitals (heavy JS = slower load) but NOT the primary blocker
- Primary blocker is modal architecture hiding all content from crawlers
- After quick wins are live, submit sitemap to Google Search Console
