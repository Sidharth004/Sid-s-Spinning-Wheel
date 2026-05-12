import Link from 'next/link'
import { writing } from '@/data/portfolio'
import { seoMeta } from '@/data/seo'

export const metadata = seoMeta.writing

const labelColors: Record<string, string> = {
  'Tutorial': 'bg-blue-900/50 text-blue-200 border border-blue-800',
  'Case Study & Research': 'bg-purple-900/50 text-purple-200 border border-purple-800',
  'Explainer': 'bg-green-900/50 text-green-200 border border-green-800',
  'Hot Take': 'bg-yellow-900/50 text-yellow-200 border border-yellow-800',
}

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-[#121210] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-10 inline-block transition-colors">
          ← Back to Universe
        </Link>

        <h1 className="text-4xl font-bold mb-2">Technical Writing</h1>
        <p className="text-gray-400 mb-12">Research, explainers, and hot takes across Web3.</p>

        <section className="mb-14">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-800 pb-3">
            Work
          </h2>
          {writing.professional.map((yearGroup) => (
            <div key={yearGroup.year} className="mb-10">
              <h3 className="text-base font-semibold text-gray-500 mb-4">{yearGroup.year}</h3>
              <div className="space-y-3">
                {yearGroup.blogs.map((blog, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start gap-4 p-4 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors"
                  >
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 font-medium leading-snug transition-colors"
                    >
                      {blog.title}
                    </a>
                    <span
                      className={`shrink-0 px-2 py-1 text-xs font-medium rounded-full ${
                        labelColors[blog.label] || 'bg-gray-800 text-gray-300 border border-gray-700'
                      }`}
                    >
                      {blog.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-800 pb-3">
            Personal
          </h2>
          <div className="space-y-3">
            {writing.personal.map((blog, i) => (
              <div
                key={i}
                className="flex justify-between items-start gap-4 p-4 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors"
              >
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 font-medium leading-snug transition-colors"
                >
                  {blog.title}
                </a>
                <span
                  className={`shrink-0 px-2 py-1 text-xs font-medium rounded-full ${
                    labelColors[blog.label] || 'bg-gray-800 text-gray-300 border border-gray-700'
                  }`}
                >
                  {blog.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
