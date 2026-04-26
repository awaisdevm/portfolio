"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json"; 
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  altText?: string;
  url: string;
  category: string;
  tech: string[];
  technology: string;
  ctaText?: string;
}

export const RecentProjects = memo(function RecentProjects({ activeTab = "All" }: { activeTab?: string }) {
    
    // Filter projects based on the active tab matches in category, technology, or simply "All"
    const filteredProjects = portfolioData.projects.filter((project) => 
        activeTab === "All" || 
        project.category === activeTab || 
        project.technology.includes(activeTab) || 
        project.title.includes(activeTab) ||
        project.tech.some(t => t.includes(activeTab))
    );

    return (
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    );
});

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="group relative w-full flex flex-col items-center justify-center p-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Flat HUD Card Shell */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[2rem] glass-strong shadow-2xl border border-white/10 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-primary/20">
          
          {/* Energy Rail: Top & Bottom Glowing Borders */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-50 opacity-0 group-hover:opacity-100"
            animate={{ x: isHovered ? ['-100%', '100%'] : '-100%' }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent z-50 opacity-0 group-hover:opacity-100"
            animate={{ x: isHovered ? ['100%', '-100%'] : '100%' }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />

          {/* Tactical HUD: Static Corner Brackets */}
          <div className="absolute inset-0 z-40 pointer-events-none p-6">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
              <path d="M 6 2 L 2 2 L 2 6" stroke="#8b5cf6" strokeWidth="0.5" className="opacity-40 group-hover:opacity-100 transition-opacity" />
              <path d="M 94 2 L 98 2 L 98 6" stroke="#8b5cf6" strokeWidth="0.5" className="opacity-40 group-hover:opacity-100 transition-opacity" />
              <path d="M 6 98 L 2 98 L 2 94" stroke="#8b5cf6" strokeWidth="0.5" className="opacity-40 group-hover:opacity-100 transition-opacity" />
              <path d="M 94 98 L 98 98 L 98 94" stroke="#8b5cf6" strokeWidth="0.5" className="opacity-40 group-hover:opacity-100 transition-opacity" />
            </svg>
          </div>

          {/* Rapid System Scan Line (Sweeps once on hover) */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-[10%] bg-gradient-to-b from-primary/20 to-transparent z-30 pointer-events-none opacity-0 group-hover:opacity-100"
            initial={{ top: "-10%" }}
            animate={{ top: isHovered ? "100%" : "-10%" }}
            transition={{ duration: 0.8, ease: "circIn" }}
          />


          {/* Main Content Area */}
          <div className="relative w-full h-full">
            <Image 
              src={project.image || "/placeholder.svg"} 
              alt={project.altText || project.title} 
              fill 
              className={`object-cover transition-all duration-700 ${isHovered ? 'scale-110 blur-[2px] brightness-75 contrast-125' : 'scale-100'}`} 
            />
            
            {/* Holographic Digital Overlay on Hover */}
            <div className={`absolute inset-0 bg-blue-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
            
            {/* Top Badges (High-Tech design - Improved Readability) */}
            <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-40 group-hover:translate-x-1 transition-transform duration-500">
              <span className="bg-primary/90 backdrop-blur-2xl text-white px-3 py-1 border border-primary/30 text-[9px] font-bold tracking-widest uppercase rounded-sm shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all">
                {project.technology}
              </span>
              <span className="bg-slate-950/90 backdrop-blur-2xl text-blue-100/90 px-3 py-1 border border-white/10 text-[9px] font-bold tracking-widest uppercase rounded-sm shadow-xl">
                {project.category}
              </span>
            </div>

            {/* Bottom Data Panel (Initialization Style) */}
            <div className="absolute bottom-0 left-0 right-0 z-40 pt-20 pb-8 px-8 bg-gradient-to-t from-background/95 via-background/80 to-transparent">
              <div className="space-y-4">
                <motion.h3 
                  className="text-white text-left font-black text-2xl sm:text-3xl tracking-tighter"
                  animate={{ x: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.8 }}
                >
                   {project.title}
                </motion.h3>

                <div className={`transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden'}`}>
                  <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((feature: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] font-mono font-bold text-primary/80 uppercase">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Tactical CTA Button */}
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-white px-6 py-3 rounded-sm transition-all duration-300 group/btn relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    <span className="text-[10px] font-bold tracking-widest uppercase font-mono">{project.ctaText || "Initialize_Link"}</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
});


