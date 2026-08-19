"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ImageIcon, ArrowRightIcon } from "lucide-react"
import type { SideQuest } from "@/data/portfolio"

interface SideQuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  sideQuests: SideQuest[];
}

export function SideQuestsModal({
  isOpen,
  onClose,
  title = "Side Quests",
  sideQuests,
}: SideQuestsModalProps) {
  // Newest first
  const orderedQuests = [...sideQuests].reverse()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[90vh] w-[1000px] p-0 overflow-hidden bg-white flex flex-col">
        <DialogHeader className="px-6 pt-4 pb-2 border-b bg-white z-10">
          <DialogTitle className="tracking-tight text-3xl font-bold text-gray-900 mb-6">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orderedQuests.map((quest) => (
              <div
                key={quest.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {quest.image ? (
                    <img
                      src={quest.image}
                      alt={quest.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 h-full">
                      <ImageIcon className="h-12 w-12" />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-xl mb-2">{quest.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{quest.description}</p>
                  <Button
                    variant="outline"
                    className="w-full justify-between border-gray-300 hover:bg-gray-50"
                    asChild
                  >
                    <a href={quest.ctaLink} target="_blank" rel="noopener noreferrer">
                      {quest.ctaText}
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
