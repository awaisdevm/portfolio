"use client";

import React from "react";
import { motion } from "framer-motion";
import { systemInitVariants } from "@/lib/animations";

interface SkillNodeProps {
  name: string;
  level?: "High" | "Mastered" | "Architecture" | "Expert";
  index: number;
}

export const SkillNode: React.FC<SkillNodeProps> = ({ name, level = "High", index }) => {
  // Determine proficiency width based on "level" (Simulated for HUD look)
  const width = level === "Mastered" ? "90%" : level === "Architecture" ? "95%" : level === "Expert" ? "85%" : "75%";
  
  return (
    <motion.div
      variants={systemInitVariants}
      className="group relative flex flex-col p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
    >
      {/* Background HUD Grid Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f610_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Top Metadata Row */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[7px] font-mono font-bold text-gray-500 uppercase tracking-widest group-hover:text-blue-400/60 transition-colors">
          [NODE: 0x{index.toString(16).padStart(2, '0').toUpperCase()}]
        </span>
        <span className="text-[7px] font-mono font-bold text-blue-400 group-hover:animate-pulse">
          STATUS_{level.toUpperCase()}
        </span>
      </div>

      {/* Skill Name */}
      <h4 className="text-sm font-black text-white group-hover:translate-x-1 transition-transform mb-4 tracking-tighter">
        {name}
      </h4>

      {/* Energy Rail (Proficiency Gauge) */}
      <div className="relative h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: width }}
          transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "circOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
        />
      </div>

      {/* Optical Glass Flare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.div>
  );
};
