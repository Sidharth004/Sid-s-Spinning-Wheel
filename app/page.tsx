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
      
      {/* Overlay content with responsive sizing */}
      <div className="relative z-10 flex flex-col items-center pt-8 px-4 text-white">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-6xl font-regular mb-4 text-center">
            Welcome to Sid's Cryptoverse 🧑‍🚀
          </h1>
          <h2 className="text-lg md:text-xl font-regular text-center mb-8 px-2 md:px-8 max-w-3xl mx-auto text-[#D6E6EE]">
            This is my digital directory where you'll find most of the stuff about my life, work, weekend experiments, and my ultra nobelist writing
          </h2>
        </div>
        
        {/* Footer text - positioned at bottom with responsive margin */}
        <div className="fixed bottom-4 md:bottom-6 left-0 right-0 px-4">
          <section className="text-center max-w-md md:max-w-2xl mx-auto">
            <p className="text-sm md:text-base text-white/70">
              Like this ever-spinning spiral, my creative journey is continuous and evolving. Click on the orbs to explore my skills and expertise.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}