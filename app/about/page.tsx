import Link from 'next/link'
import { milestones } from '@/data/portfolio'
import { TimelineModal } from '@/components/timeline-modal'
import { seoMeta } from '@/data/seo'

export const metadata = seoMeta.about

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#121210] text-white px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-10 inline-block transition-colors">
          ← Back to Universe
        </Link>

        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-gray-700 mb-6">
            <img
              src="/profile_pic.jpeg"
              alt="Sidharth Kumthekar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-1">Hey, I'm Sidharth!</h1>
          <p className="text-gray-400 text-lg">Growth Marketing Lead · Web3 Builder · Crypto Polymath</p>
        </div>

        <div className="space-y-5 text-gray-300 leading-relaxed text-[1.05rem]">
          <p>
            A 23 year old CS Undergrad who loves to build products and sky rocket brands!
            Got introduced to crypto during covid — got my first industry breakthrough in my sophomore year (2k22) — and now there's nooooo turning back.
          </p>

          <p>
            Till date I've been lucky to wear multiple hats, ranging from development and research analysis to PM, BD, and Growth. And honestly? I love em all.
            Soaking in everything with an open mind with one goal in mind: becoming the best crypto polymath 🧙
          </p>

          <p>
            Right now, I'm locked into Growth and Product roles.
          </p>

          <p>
            Though crypto takes up 7/4th of my day — whether it's work, research, or trenching. When it's time to touch grass, you'll find me:
          </p>

          <ul className="pl-2 space-y-1">
            <li>⚽ Playing football (<em>Man City for life!</em>)</li>
            <li>📺 Binge-watching <em>Suits</em></li>
            <li>🚗 Going on long drives with my pals</li>
            <li>🍞 Studying economics <em>(new hoob..it's really cool!)</em></li>
          </ul>

          <p>
            My near-term goal? To contribute my best towards cross chain infra, consumer crypto apps and travel the world living the true digital nomad life.
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <TimelineModal
            title="My Retardness Timeline"
            xAxisLabel="Timeline"
            yAxisLabel="Retardness"
            yAxisValues={['Beginning', 'Growing', 'Established', 'Advanced']}
            milestones={milestones}
            buttonText="My Retardness Timeline"
            buttonVariant="custom"
            buttonClassName="relative group overflow-hidden px-8 py-3 rounded-full bg-[#1e1e2e] text-white font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/30"
          />
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex justify-center gap-8">
          <a href="https://x.com/sidisgame" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://t.me/multichain_sid" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/sidharth-kumthekar04r-70772b1a7/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </main>
  )
}
