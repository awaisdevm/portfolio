"use client"

import { SocialIcons } from '@/components/social-icons';

import { Footer } from '@/components/sections/footer-section';
import { HeroSection } from '@/components/sections/hero-section';
import { FeatureProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Service3DCard } from "@/components/sections/service-3d-card";
import { SectionWrapper } from '@/components/ui/section-wrapper';
import portfolioData from '@/data/portfolio.json';
import { MapPin, Phone, } from 'lucide-react';
import { Rocket, Target, Users, Lightbulb, Briefcase, GraduationCap, Heart, Github, Linkedin, Mail, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Frameworks } from "@/components/framework";
import { Globe } from "@/components/globe";
import { ExpandableJourney } from "@/components/expandable-journey";
import { AboutSection } from "@/components/sections/about-section";
// using portfolioData now

export const MainContent: React.FC = () => {
  const currentSection = portfolioData.sections.services

  // content moved to src/data/site.json (siteData)
  return (

    <div >

      <SocialIcons />
      <HeroSection />
      <AboutSection />
      {/* Services Grid */}
      <SectionWrapper
        id={currentSection.id}
        title={currentSection.title}
        subTitle={currentSection.subtitle}
        description={currentSection.description}
      >
        {/* Services Grid */}
        <div className="relative">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
            {portfolioData.services.map((service, index) => (
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
      <FeatureProjectsSection />
      <ContactSection />

      <Footer />
    </div>
  )
};