"use client"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader } from "@/components/Loader"

const SpinningCoilScene = dynamic(() => import("@/components/SpinningCoilScene"), { ssr: false })

export default function SyntheticV0PageForDeployment() {
  return (
     <main className="flex min-h-screen flex-col items-center  p-8 bg-gradient-to-b from-white to-gray-100">
          <div className="w-full ">
            <h1 className="text-5xl font-bold mb-8 text-center text-black">Welcome to Sid's Cryptoverse 🧑‍🚀</h1>
            <h1 className="text-3xl font-bold text-center text-black">Filed with research, growth, writing, code and ofcourse - fun!! 🙂</h1>
            <div className="w-full  h-[90vh] w-full relative rounded-lg ">
              <Suspense fallback={<Loader />}>
                <SpinningCoilScene />
              </Suspense>
            </div>
            <section className="text-center max-w-2xl mx-auto">
              <p className="text-lg text-gray-800">
                Like this ever-spinning spiral, my creative journey is continuous and evolving. Each rotation represents a
                new chapter in my story of growth and innovation. Click on the dots to explore my skills and expertise.
              </p>
            </section>
          </div>
        </main>
  )
}