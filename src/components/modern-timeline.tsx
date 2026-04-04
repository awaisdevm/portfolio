"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Building2, Laptop, Gamepad2, BrainCircuit } from "lucide-react";

interface TimelineEntry {
  title: string;
  company: string;
  year: string;
  description: string;
}

const companyIcons: Record<string, React.ReactNode> = {
  "Egora Pvt Ltd": <BrainCircuit className="w-6 h-6 text-cyan-400" />,
  "Healthwire Pvt Ltd": <Laptop className="w-6 h-6 text-green-400" />,
  "DonGamers": <Gamepad2 className="w-6 h-6 text-purple-400" />,
  "Netroots Technologies LLC": <Building2 className="w-6 h-6 text-blue-400" />
};

export const ModernTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans pb-20"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10 text-center">
        <h2 className="text-3xl md:text-5xl mb-4 text-white font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 inline-block">
          Professional Journey
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mt-4">
          My career progression, highlighting the roles where I engineered and scaled high-performance mobile applications.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const Icon = companyIcons[item.company] || <Building2 className="w-6 h-6 text-blue-400" />;
          return (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 border border-blue-400" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white/20 ">
                  {item.year.split(" - ")[0]}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white/40">
                  {item.year}
                </h3>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 group shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl">
                      {Icon}
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.company}</h4>
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-300">{item.year}</span>
                    </div>
                  </div>
                  <h5 className="text-xl font-semibold text-gray-200 mb-4">{item.title}</h5>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/10 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          />
        </div>
      </div>
    </div>
  );
};
