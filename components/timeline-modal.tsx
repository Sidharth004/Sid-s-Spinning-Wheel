// components/timeline-modal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface Milestone {
  id: string
  x: number // x position (time)
  y: number // y position (degree of experimentation)
  image: string | null
  caption: string
  xLabel: string // The label for the x-axis (e.g., "2010")
}

interface TimelineModalProps {
  title?: string
  xAxisLabel?: string
  yAxisLabel?: string
  yAxisValues?: string[]
  milestones: Milestone[]
  buttonText?: string
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function TimelineModal({
  title = "Experimentation Timeline",
  xAxisLabel = "Time",
  yAxisLabel = "Degree of Experimentation",
  yAxisValues = ["a", "z", "y", "x"],
  milestones = [],
  buttonText = "View My Journey",
  buttonVariant = "outline"
}: TimelineModalProps) {
  const [open, setOpen] = useState(false)
  const graphRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Sort milestones by x position explicitly (ascending order - from left to right)
  const sortedMilestones = [...milestones].sort((a, b) => {
    // Primary sort by xLabel (numeric value within the label)
    const aYear = parseInt(a.xLabel.match(/\d+/)?.[0] || "0");
    const bYear = parseInt(b.xLabel.match(/\d+/)?.[0] || "0");
    
    if (aYear !== bYear) {
      return aYear - bYear;
    }
    
    // Secondary sort by x position if years are the same
    return a.x - b.x;
  });

  // Scroll to center of content when modal opens
  useEffect(() => {
    if (open && scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          // Get the total width of the content
          const totalWidth = scrollRef.current.scrollWidth;
          // Scroll to position where the first few items are visible but we still have room to scroll right
          scrollRef.current.scrollLeft = 0;
        }
      }, 200); // Small delay to ensure content is rendered
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[90vh] w-[1000px] h-[700px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold mb-2">{title}</DialogTitle>
        </DialogHeader>

        <div 
          ref={scrollRef}
          className="flex h-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-2"
        >
          <div className="min-w-[2000px] w-max p-4 relative">
            <div className="ml-6 text-sm font-medium text-gray-600">{yAxisLabel}</div>

            {/* Graph container */}
            <div className="relative mt-2 h-[600px]">
              {/* Y-axis */}
              <div className="absolute left-10 top-10 bottom-10 w-px bg-gray-800">
                {yAxisValues.map((value, index) => (
                  <div
                    key={index}
                    className="absolute w-3 h-px bg-gray-800"
                    style={{
                      left: -6,
                      top: `${10 + (index * ((80) / (yAxisValues.length - 1)))}%`,
                    }}
                  >
                    <span className="absolute right-4 transform -translate-y-1/2 text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* X-axis */}
              <div className="absolute left-10 right-10 bottom-10 h-px bg-gray-800">
                {sortedMilestones.map((milestone) => (
                  <div
                    key={`x-${milestone.id}`}
                    className="absolute w-px h-3 bg-gray-800"
                    style={{
                      left: `${milestone.x}%`,
                      bottom: -6,
                    }}
                  >
                    <span className="absolute top-2 transform -translate-x-1/2 text-sm font-medium whitespace-nowrap">
                      {milestone.xLabel}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center text-sm font-medium text-gray-600 absolute bottom-0 left-1/2 transform -translate-x-1/2">
                {xAxisLabel}
              </div>

              {/* Diagonal line */}
              <div className="absolute left-10 right-10 top-10 bottom-10 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <line 
                    x1="0%" 
                    y1="100%" 
                    x2="100%" 
                    y2="0%" 
                    stroke="black" 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* Milestones */}
              {sortedMilestones.map((milestone, index) => {
                // Calculate position on the diagonal line
                // We use a modified approach to ensure the dots and containers 
                // are well distributed across the visible area
                const totalMilestones = sortedMilestones.length;
                const padding = 10; // Percentage from edges
                const usableWidth = 100 - (padding * 2);
                const segmentWidth = usableWidth / (totalMilestones - 1);
                
                // Position dots with appropriate spread along the diagonal
                const xPos = padding + (index * segmentWidth);
                const yPos = 100 - padding - (index * segmentWidth);
                
                // Alternate image containers above/below
                const isAbove = index % 2 === 0;

                // Calculate appropriate margin to ensure visibility
                const xMargin = index < 1 ? 0 : 
                               index >= totalMilestones - 1 ? -220 : -110;

                return (
                  <div
                    key={milestone.id}
                    className="absolute"
                    style={{
                      left: `${xPos}%`,
                      top: `${yPos}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Milestone dot - exactly on the line */}
                    <div className="w-4 h-4 bg-black rounded-full relative z-10" />

                    {/* Image and caption container - alternating above/below */}
                    <div 
                      className={cn(
                        "absolute z-20 p-3 bg-white border border-gray-200 rounded-lg shadow-md",
                        isAbove ? "bottom-full mb-6" : "top-full mt-6"
                      )}
                      style={{ 
                        width: "220px",
                        marginLeft: `${xMargin}px`
                      }}
                    >
                      <div className="w-full h-36 border border-gray-200 rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
                        {milestone.image ? (
                          <img
                            src={milestone.image}
                            alt={milestone.caption}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            <ImageIcon size={32} />
                            <span className="text-xs mt-1">img</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-center text-sm font-medium text-gray-700">
                        {milestone.caption}
                        <div className="text-xs text-gray-500 mt-1">{milestone.xLabel}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}