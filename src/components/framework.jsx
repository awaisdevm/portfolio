import { OrbitingCircles } from "@/components/orbiting-circle";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import React, { useState, useEffect } from "react";

export function Frameworks({ compact = false }) {
  const skills = [
    "Android Studio",
    "Flutter",
    "git",
    "github",
    "java",
    "Kotlin",
    "nodejs",
    "sqlite",
    "tailwindcss",
    "visualstudiocode",
    "xcode",
    "nextjs",
    "react",
    "typescript"
  ];
  
  return (
    <div className={`relative flex ${compact ? 'h-full' : 'h-[18rem]'} w-full flex-col items-center justify-center overflow-hidden bg-[#02020a]/40`}>
      
      {/* 1. Dynamic Star Field Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: Math.random(), scale: Math.random() }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>

      {/* 2. Shooting Star Animation */}
      <ShootingStar />

      {/* 3. Constellation Line Effect (Atmospheric) */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#3b82f6" />
            <stop offset="80%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <motion.path 
          d="M -100 50 Q 50 45, 200 52 T 500 48 T 800 53 T 1200 49" 
          stroke="url(#lineGrad)" 
          strokeWidth="0.5" 
          fill="none"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ strokeDasharray: "4 4" }}
        />
      </svg>
      
      {compact ? (
        /* CELESTIAL TECH STREAM (Linear Star Shape Mode) */
        <div className="relative w-full flex items-center h-full px-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] z-10">
          <motion.div 
            className="flex gap-14 items-center whitespace-nowrap py-10"
            animate={{ x: [0, -1200] }}
            transition={{ 
              repeat: Infinity, 
              duration: 35, 
              ease: "linear",
            }}
          >
            {[...skills, ...skills, ...skills].map((skill, index) => (
              <div key={index} className="flex-shrink-0 relative group/star">
                 {/* Connecting Ray */}
                 <div className="absolute top-1/2 left-full w-14 h-[1px] bg-gradient-to-r from-blue-500/20 to-transparent -translate-y-1/2" />
                 <Icon src={`assets/logos/${skill}.svg`} name={skill} />
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        /* ORIGINAL ORBITING HUB (Full Mode) */
        <div className="relative z-20">
          <OrbitingCircles iconSize={32} radius={100} speed={1}>
            {skills.slice(0, 6).map((skill, index) => (
              <Icon key={index} src={`assets/logos/${skill}.svg`} name={skill} />
            ))}
          </OrbitingCircles>
          <OrbitingCircles iconSize={32} radius={140} reverse speed={1.5}>
            {skills.slice(6, 12).map((skill, index) => (
              <Icon key={index} src={`assets/logos/${skill}.svg`} name={skill} />
            ))}
          </OrbitingCircles>
        </div>
      )}

    </div>
  );
}

function ShootingStar() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        initial={{ x: "-10%", y: "20%", opacity: 0 }}
        animate={{ 
          x: ["0%", "120%"], 
          y: ["20%", "40%"],
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          repeatDelay: 8,
          ease: "easeOut"
        }}
        className="absolute w-20 h-[1px] bg-gradient-to-r from-blue-400 to-transparent rotate-12"
      >
        <div className="w-1 h-1 bg-white rounded-full blur-[1px]" />
      </motion.div>
    </div>
  );
}

const Icon = ({ src, name }) => (
  <div className="group relative flex flex-col items-center">
    {/* Star Burst Effect Background */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="size-16 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-400/20 group-hover:opacity-100 transition-all"
      />
      
      {/* HUD Crosshair Star nodes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Star className="w-10 h-10 text-blue-400/20 fill-blue-400/5 rotate-45 animate-pulse" />
      </div>
    </div>

    <div className="relative">
      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <img 
        src={src} 
        alt={name}
        className="relative w-8 h-8 object-contain transition-all duration-500 contrast-125 saturate-150 grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-125 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
      />
      
      {/* Orbital sparkle nodes */}
      <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 animate-bounce transition-opacity delay-75" />
    </div>

    {/* Star Name Label */}
    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
      <div className="flex items-center gap-1">
        <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
        <span className="text-[7px] font-mono text-blue-400 font-black uppercase tracking-[0.2em] whitespace-nowrap bg-blue-950/40 px-2 py-0.5 rounded-full border border-blue-500/30">
          NODE_{name}
        </span>
      </div>
    </div>
  </div>
);