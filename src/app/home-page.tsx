"use client"

import { SocialIcons } from '@/components/layout/social-links';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FeatureProjectsSection } from '@/components/sections/projects-section';
import { ContactSection } from '@/components/sections/contact-section';
import { TestimonialSection } from '@/components/sections/testimonial-section';
import { Service3DCard } from "@/components/ui/service-card";
import { SectionWrapper } from '@/components/ui/section-wrapper';
import portfolioData from '@/data/portfolio.json';

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
      <TestimonialSection />
      <ContactSection />

      <Footer />
    </div>
  )
};