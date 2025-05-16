"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface GrowthJams {
  id: string
  title: string
  description: string
  image: string | null
  ctaText: string
  ctaLink: string
}

interface GridPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  portfolioItems: GrowthJams[];
}

export function GrowthJams({
  isOpen,
  onClose,
  title = "Portfolio",
  portfolioItems = [
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
    
  ],
}: GridPortfolioModalProps) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);
  
  // Calculate visible items based on current page
  const visibleItems = portfolioItems.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  );

  // Navigation functions
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] w-[1000px] p-0 overflow-hidden bg-white flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 pt-4 pb-2 border-b bg-white z-10">
          <DialogTitle className="tracking-tight text-3xl font-bold text-gray-900 mb-6">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Grid Layout */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleItems.map((item) => (
              <div 
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                      <ImageIcon className="h-12 w-12" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-medium text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  <Button
                    variant="outline"
                    className="w-full justify-between border-gray-300 hover:bg-gray-50"
                    asChild
                  >
                    <a href={item.ctaLink} target="_blank" rel="noopener noreferrer">
                      {item.ctaText}
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation controls - Only show if more than one page */}
        {totalPages > 1 && (
          <div className="border-t border-gray-100 p-3 flex justify-between items-center bg-white z-10">
            {/* Page indicator */}
            <div className="flex-1 flex justify-center space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPage === index ? 'bg-black' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation buttons */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className={`text-gray-500 hover:text-black ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <span className="text-sm text-gray-500">
                Page {currentPage + 1} of {totalPages}
              </span>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className={`text-gray-500 hover:text-black ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}