"use client";

import { motion } from "framer-motion";
import { Building2, Laptop, Gamepad2, BrainCircuit } from "lucide-react";

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

const companyIcons: Record<string, React.ReactNode> = {
  "Egora Pvt Ltd": <BrainCircuit className="w-8 h-8 text-cyan-400" />,
  "Healthwire Pvt Ltd": <Laptop className="w-8 h-8 text-green-400" />,
  "DonGamers": <Gamepad2 className="w-8 h-8 text-purple-400" />,
  "Netroots Technologies LLC": <Building2 className="w-8 h-8 text-blue-400" />
};

export const InfiniteJourneySlider = ({ timeline }: { timeline: TimelineItem[] }) => {
  // Duplicate timeline to create seamless loop
  const slides = [...timeline, ...timeline, ...timeline, ...timeline];

  return (
    <div className="relative w-full overflow-hidden py-10 flex">
      {/* Fade edges removed per user request */}

      <motion.div
        className="flex gap-6"
        animate={{ x: [0, -1000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      // Adjust width calculation or let it flow naturally
      >
        {slides.map((item, index) => {
          const Icon = companyIcons[item.company] || <Building2 className="w-8 h-8 text-blue-400" />;
          return (
            <div
              key={`${item.company}-${index}`}
              className="flex-shrink-0 w-[400px] bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {Icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">{item.company}</h4>
                  <div className="inline-block mt-1 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-300">
                    {item.year}
                  </div>
                </div>
              </div>
              <h5 className="text-lg font-semibold text-gray-200">{item.title}</h5>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
