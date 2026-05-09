"use client"

import type React from "react"
import { m } from "framer-motion"
import { systemInitVariants } from "@/lib/animations"

interface SectionWrapperProps {
  id: string
  title: string
  subTitle: string
  description: string
  children?: React.ReactNode
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, subTitle, description, children }) => {
  const dividerGradient = "bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"

  return (
    <m.section 
      id={id} 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Background HUD Focus */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <m.div 
            variants={systemInitVariants}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className={`w-12 h-px ${dividerGradient}`} />
            <div className="px-4 py-1 bg-blue-500/5 backdrop-blur-md rounded-sm border border-blue-500/20">
              <p className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-[0.3em]">
                {subTitle}
              </p>
            </div>
            <div className={`w-12 h-px ${dividerGradient}`} />
          </m.div>

          <m.h2 
            variants={systemInitVariants}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
          >
            {title}
          </m.h2>

          <m.p 
            variants={systemInitVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            {description}
          </m.p>

          <m.div 
            variants={systemInitVariants}
            className="w-24 h-[1px] mx-auto mt-10 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
          />
        </div>

        <m.div variants={systemInitVariants}>
          {children}
        </m.div>
      </div>
    </m.section>
  )
}
