import type { Metadata } from "next";

import { Service3DCard } from "@/components/ui/service-card"
import portfolioData from "@/data/portfolio.json";
import { SectionWrapper } from "@/components/ui/section-wrapper"

export const metadata: Metadata = {
  title: "Mobile Development Services — Android, Flutter & Android TV",
  description:
    "Hire a senior mobile architect for custom Android, Flutter, and Android TV solutions. Scalable architectures, Jetpack Compose expertise, and enterprise-grade performance for healthcare, fintech, and gaming platforms.",
  alternates: {
    canonical: "https://devawais.com/service",
  },
  openGraph: {
    title: "Mobile Development Services — Android, Flutter & Android TV",
    description:
      "Hire a senior mobile architect for custom Android, Flutter, and Android TV solutions. Scalable architectures for enterprise platforms.",
    url: "https://devawais.com/service",
  },
};

export default function ServiceSection()  {
  const currentSection = portfolioData.sections.services
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
  )
}
