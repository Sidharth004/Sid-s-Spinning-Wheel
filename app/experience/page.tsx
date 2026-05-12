import Link from 'next/link'
import { experiences } from '@/data/portfolio'
import type { Achievement } from '@/data/portfolio'
import { seoMeta } from '@/data/seo'

export const metadata = seoMeta.experience

function RenderAchievement({ achievement }: { achievement: Achievement }) {
  if (!achievement.links) return <span>{achievement.text}</span>

  const parts: React.ReactNode[] = []
  let remaining = achievement.text
  let keyIdx = 0

  for (const link of achievement.links) {
    const idx = remaining.indexOf(link.text)
    if (idx === -1) continue
    if (idx > 0) parts.push(remaining.slice(0, idx))
    parts.push(
      <a
        key={keyIdx++}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline"
      >
        {link.text}
      </a>
    )
    remaining = remaining.slice(idx + link.text.length)
  }
  parts.push(remaining)

  return <>{parts}</>
}

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#121210] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-10 inline-block transition-colors">
          ← Back to Universe
        </Link>

        <h1 className="text-4xl font-bold mb-2">Experience</h1>
        <p className="text-gray-400 mb-12">What I've built and who I've built it with.</p>

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div key={index} className="border-b border-gray-800 pb-10 last:border-0">
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-xl font-bold text-white">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h2>
                <span className="text-sm text-gray-500 shrink-0 ml-4">{exp.duration}</span>
              </div>

              <div className="flex justify-between items-start mb-5">
                <h3 className="text-base font-semibold text-gray-400 italic">{exp.role}</h3>
                <span className="text-sm text-gray-500 shrink-0 ml-4">{exp.location}</span>
              </div>

              <ul className="space-y-2 pl-4 border-l border-gray-800">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-300 leading-relaxed">
                    <RenderAchievement achievement={achievement} />
                  </li>
                ))}
              </ul>

              {exp.tech && (
                <div className="mt-5 text-sm text-gray-500">
                  <span className="font-semibold text-gray-400">Stack: </span>
                  {exp.tech}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
