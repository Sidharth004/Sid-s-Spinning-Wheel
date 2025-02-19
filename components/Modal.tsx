// Modal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface Experience {
  company: string
  role: string
  duration: string
  location: string
  achievements: string[]
  tech?: string
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string | Experience[]
  type?: 'experience' | 'default'
}

export function Modal({ isOpen, onClose, title, content, type = 'default' }: ModalProps) {
  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/your-profile', '_blank')
  }

  if (type === 'experience') {
    const experiences = content as Experience[]
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] bg-white/95 backdrop-blur-sm max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-6">{title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-gray-700 italic">{exp.role}</h4>
                  <span className="text-sm text-gray-600">{exp.location}</span>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700">{achievement}</li>
                  ))}
                </ul>
                {exp.tech && (
                  <div className="mt-4">
                    <p className="font-semibold text-gray-800">Tech Stack:</p>
                    <p className="text-gray-700">{exp.tech}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLinkedInClick}
              className="bg-[#0077B5] hover:bg-[#006399] text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
              View Full Profile
            </button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Default modal rendering for other content types
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{title}</DialogTitle>
          <DialogDescription className="mt-4 text-lg leading-relaxed text-gray-700">
            {content as string}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}