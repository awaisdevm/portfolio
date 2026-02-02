
import { useState } from "react";

// removed unused Image import

import { SectionWrapper } from "../ui/section-wrapper";
import { sectionContent } from "@/constants/section-content";

import { RecentProjects } from "./recent-projects"; 

export const FeatureProjectsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All")
  const currentSection = sectionContent.projects
  const tabs = ["All", "Mobile", "Flutter", "iOS",]
  return (
    <SectionWrapper
              id={currentSection.id}
              title={currentSection.title}
                    subTitle={currentSection.subtitle}
              description={currentSection.description}
             
            >
      
       <RecentProjects/>
        
    </SectionWrapper>
  )
}