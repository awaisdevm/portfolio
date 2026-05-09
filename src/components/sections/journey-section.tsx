"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Laptop, Gamepad2, BrainCircuit } from "lucide-react";

interface TimelineEntry {
  title: string;
  company: string;
  year: string;
  description: string;
}

const companyIcons: Record<string, React.ReactNode> = {
  "Egora Pvt Ltd": <BrainCircuit className="w-8 h-8 text-secondary" />,
  "Healthwire Pvt Ltd": <Laptop className="w-8 h-8 text-primary" />,
  "DonGamers": <Gamepad2 className="w-8 h-8 text-accent" />,
  "Netroots Technologies LLC": <Building2 className="w-8 h-8 text-primary" />
};

export const ExpandableJourney = ({ data }: { data: TimelineEntry[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <div className="w-full max-w-7xl mx-auto pb-20 mt-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
          Professional Journey
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-4">
          6+ years as a Senior Android &amp; Flutter Developer — hover to explore each milestone.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 h-[600px] md:h-[650px] lg:h-[220px]">
        {data.map((item, index) => {
          const isActive = hoveredIndex === index;
          const Icon = companyIcons[item.company] || <Building2 className="w-8 h-8 text-blue-400" />;

          return (
            <motion.div
              layout
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => setHoveredIndex(index)}
              className="relative overflow-hidden rounded-[2rem] cursor-pointer flex group min-h-[90px] lg:min-h-0"
              initial={false}
              animate={{
                flex: isActive ? 4 : 1,
              }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
            >
              {/* Background Layer */}
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[2rem] z-0" />

              <motion.div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 z-0 bg-gradient-to-br from-primary/20 to-secondary/20`}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
              />

              {/* Noise/Texture optional overlay */}
              <div className="absolute inset-0 bg-[#030712]/10 backdrop-blur-sm z-0 pointer-events-none" />

              <div className={`relative z-10 flex flex-col w-full h-full p-6 md:p-8 ${isActive ? 'justify-end' : 'justify-center items-center'}`}>

                {/* Info Block (Only visible when active) */}
                <AnimatePresence mode="popLayout">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="mb-auto mt-2 whitespace-normal min-w-[280px]"
                    >
                      <h5 className="text-xl md:text-2xl font-bold text-white leading-tight">{item.title}</h5>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Bar: Icon + Company details */}
                <div className={`flex items-center gap-4 ${isActive ? 'w-full' : ''}`}>
                  <motion.div layout className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive ? 'bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25 scale-110' : 'bg-white/10 border border-white/10 group-hover:scale-110'}`}>
                    {Icon}
                  </motion.div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden flex flex-col justify-center whitespace-nowrap"
                      >
                        <h4 className="text-lg md:text-xl font-bold text-white truncate">{item.company}</h4>
                        <span className="text-primary text-xs md:text-sm font-semibold tracking-wider uppercase">{item.year}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
