import Link from 'next/link'
import { sideQuests } from '@/data/portfolio'
import { ArrowRightIcon } from 'lucide-react'
import { seoMeta } from '@/data/seo'

export const metadata = seoMeta.sideQuests

export default function SideQuestsPage() {
  return (
    <main className="min-h-screen bg-[#121210] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-10 inline-block transition-colors">
          ← Back to Universe
        </Link>

        <h1 className="text-4xl font-bold mb-2">Side Quests</h1>
        <p className="text-gray-400 mb-12">Experiments, builds, and random obsessions.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideQuests.map((quest) => (
            <div
              key={quest.id}
              className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-colors flex flex-col"
            >
              <div className="h-48 bg-gray-900">
                {quest.image ? (
                  <img
                    src={quest.image}
                    alt={quest.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700">
                    No image
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-2">{quest.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{quest.description}</p>
                <a
                  href={quest.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between px-4 py-2 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
                >
                  {quest.ctaText}
                  <ArrowRightIcon className="h-4 w-4 ml-2 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
