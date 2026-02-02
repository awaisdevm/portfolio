"use client"

import type React from "react"

import { Service3DCard } from "@/components/sections/service-3d-card" 
import  { services } from "@/constants/my-services"
import { sectionContent } from "@/constants/section-content"
// removed unused useState import
import { SectionWrapper } from "@/components/ui/section-wrapper"

export default function ServiceSection()  {
  const currentSection = sectionContent.services
  return (
    <SectionWrapper
      id={currentSection.id}
      title={currentSection.title}
      subTitle={currentSection.subtitle}
      description={currentSection.description}
    >
      {/* Services Grid */}
      <div className="relative">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="transform hover:scale-110 hover:-translate-y-4 transition-all duration-700 "
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Service3DCard service={service} />
                </div>
              ))}
            </div>
          </div>
    
    </SectionWrapper>
  )
}
