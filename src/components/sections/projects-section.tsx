"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../ui/section-wrapper";
import portfolioData from "@/data/portfolio.json";
import { RecentProjects } from "./recent-projects"; 

export const FeatureProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const currentSection = portfolioData.sections.projects;
  const tabs = ["All", "Mobile", "Flutter", "Android", "iOS"];

  return (
    <SectionWrapper
      id={currentSection.id}
      title={currentSection.title}
      subTitle={currentSection.subtitle}
      description={currentSection.description}
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 relative z-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-colors duration-300 ${
              activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>
      
      <RecentProjects activeTab={activeTab} />
    </SectionWrapper>
  );
};