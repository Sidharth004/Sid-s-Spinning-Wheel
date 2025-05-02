"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string | null
  ctaText: string
  ctaLink: string
}

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  projects: Project[];
}

export function ProjectsModal({
  isOpen,
  onClose,
  title = "Projects",
  projects = [
    {
      id: "1",
      title: "Digital Transformation",
      description: "Helping businesses adapt to the digital age with innovative solutions and strategies.",
      image: null,
      ctaText: "Learn More",
      ctaLink: "#",
    },
    {
      id: "2",
      title: "AI Integration",
      description: "Implementing artificial intelligence to streamline operations and enhance decision making.",
      image: null,
      ctaText: "View Case Study",
      ctaLink: "#",
    },
    {
      id: "3",
      title: "UX Research",
      description: "Understanding user behavior to create intuitive and effective digital experiences.",
      image: null,
      ctaText: "See Results",
      ctaLink: "#",
    },
    {
      id: "4",
      title: "Cloud Migration",
      description: "Moving legacy systems to cloud infrastructure for improved scalability and security.",
      image: null,
      ctaText: "Explore",
      ctaLink: "#",
    },
  ],
}: ProjectsModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Navigate to previous project
  const prevProject = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Navigate to next project
  const nextProject = () => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        nextProject();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        prevProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, projects.length]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-[800px] p-0 overflow-hidden bg-white flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 pt-4 pb-2 border-b bg-white z-10">
          <DialogTitle className="text-2xl font-light tracking-wide">{title}</DialogTitle>
        </DialogHeader>

        {/* Project container - Fixed height with single project view */}
        <div className="flex-1 p-4 overflow-hidden">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`w-full transition-all duration-300 transform ${
                index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 absolute pointer-events-none'
              }`}
              style={{ height: index === activeIndex ? 'auto' : 0 }}
            >
              <div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Content */}
                  <div className="flex flex-col justify-between p-6 md:w-[60%]">
                    <div>
                      <h3 className="font-medium text-xl mb-3">{project.title}</h3>
                      <p className="text-gray-600 mb-6">{project.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full md:w-auto justify-between border-gray-300 hover:bg-gray-50"
                      asChild
                    >
                      <a href={project.ctaLink} target="_blank" rel="noopener noreferrer">
                        {project.ctaText}
                        <ArrowRightIcon className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>

                  {/* Image */}
                  <div className="md:w-[40%] h-[200px] md:h-auto bg-gray-100 flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                        <ImageIcon className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation controls */}
        <div className="border-t border-gray-100 p-3 flex justify-between items-center bg-white z-10">
          {/* Dot indicators */}
          <div className="flex-1 flex justify-center space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-black' : 'bg-gray-300'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={prevProject}
              disabled={activeIndex === 0}
              className={`text-gray-500 hover:text-black ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ChevronUpIcon className="h-4 w-4" />
            </Button>
            
            <span className="text-sm text-gray-500">{activeIndex + 1} / {projects.length}</span>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={nextProject}
              disabled={activeIndex === projects.length - 1}
              className={`text-gray-500 hover:text-black ${activeIndex === projects.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}