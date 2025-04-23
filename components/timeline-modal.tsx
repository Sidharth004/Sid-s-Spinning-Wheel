// components/timeline-modal.tsx
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
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
  milestones = [
    { id: "1", x: 10, y: 10, image: null, caption: "First milestone", xLabel: "2010" },
    { id: "2", x: 30, y: 30, image: null, caption: "Second milestone", xLabel: "2014" },
    { id: "3", x: 50, y: 50, image: null, caption: "Third milestone", xLabel: "2016" },
    { id: "4", x: 70, y: 70, image: null, caption: "Fourth milestone", xLabel: "2020" },
  ],
  buttonText = "View My Journey",
  buttonVariant = "outline"
}: TimelineModalProps) {
  const [open, setOpen] = useState(false)
  const graphRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[90vh] w-[1000px] h-[700px] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex h-full overflow-x-auto">
          <div className="min-w-[1800px] w-max p-4 relative">
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
                {milestones.map((milestone) => (
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
              {milestones.map((milestone, index) => {
                const graphXPercent = milestone.x;
                const xPos = 10 + (graphXPercent * 0.8); // 80% graph width
                const yPos = 10 + ((100 - graphXPercent) * 0.8); // lock to diagonal
                const isAbove = index % 2 === 0;

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
                    <div className="w-4 h-4 bg-black rounded-full relative z-10" />

                    <div 
                      className={cn(
                        "absolute z-20 p-3 bg-white border border-gray-200 rounded-lg shadow-md",
                        isAbove ? "bottom-full mb-6" : "top-full mt-6",
                        "left-1/2 -translate-x-1/2"
                      )}
                      style={{ width: "220px" }}
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
                      <div className="mt-2 text-center text-sm font-medium text-gray-700">{milestone.caption}</div>
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
