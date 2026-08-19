"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, ArrowRightIcon } from "lucide-react"
import type { GrowthJam } from "@/data/portfolio"

interface GrowthJamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  portfolioItems: GrowthJam[];
}

export function GrowthJamsModal({
  isOpen,
  onClose,
  title = "Portfolio",
  portfolioItems,
}: GrowthJamsModalProps) {
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
            {portfolioItems.map((item) => (
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
      </DialogContent>
    </Dialog>
  )
}
