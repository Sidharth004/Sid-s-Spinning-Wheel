// Updated page.tsx with mobile sandwich layout
"use client"
import dynamic from "next/dynamic"
import { Suspense, useEffect, useState } from "react"
import { Loader } from "@/components/Loader"

const SpinningCoilScene = dynamic(() => import("@/components/SpinningCoilScene"), { ssr: false })

export default function SyntheticV0PageForDeployment() {
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client-side to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <main className="relative min-h-screen w-full bg-[#121210] overflow-hidden">
      {/* Canvas container */}
      <div className="absolute inset-0 w-full h-full">
        <Suspense fallback={<Loader />}>
          <SpinningCoilScene />
        </Suspense>
      </div>
      
      {/* Top section - Title and subtitle for desktop, only title for mobile */}
      <div className="relative z-10 flex flex-col items-center pt-8 px-4 text-white">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-regular mb-4 text-center">
            Welcome to Sid's Cryptoverse 🧑‍🚀
          </h1>
          
          {/* Subtitle - Hidden on mobile, shown on desktop */}
          <h2 className="hidden md:block text-lg md:text-xl font-regular text-center mb-8 px-2 md:px-8 max-w-3xl mx-auto text-[#D3D3D3]">
            This is my digital directory where you'll find most of the stuff about my life, work, weekend experiments, and my ultra nobelist writing
          </h2>
        </div>
      </div>
      
      {/* Bottom section - Subtitle for mobile only */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 px-4 z-10">
        <div className="max-w-sm mx-auto">
          <h2 className="text-sm font-regular text-center text-[#D3D3D3] leading-relaxed">
            This is my digital directory where you'll find most of the stuff about my life, work, weekend experiments, and my ultra nobelist writing
          </h2>
        </div>
      </div>
      
      {/* Optional: Add a subtle gradient overlay at the bottom for better text readability on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#121210] via-[#121210]/80 to-transparent pointer-events-none z-[5]"></div>
    </main>
  )
}