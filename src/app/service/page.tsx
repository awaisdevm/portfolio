import type { Metadata } from "next";

import { Service3DCard } from "@/components/ui/service-card"
import portfolioData from "@/data/portfolio.json";
import { SectionWrapper } from "@/components/ui/section-wrapper"

export const metadata: Metadata = {
  title: "Mobile App Development Services — Android, Flutter & Android TV",
  description:
    "Hire Awais — Senior Android & Flutter Developer — for custom mobile apps, Android TV, and Jetpack Compose solutions. Enterprise-grade performance for healthcare, fintech, and gaming.",
  keywords: [
    "Awais",
    "Senior Developer",
    "Android",
    "Flutter",
    "Mobile Apps",
    "Android Developer",
    "Flutter Developer",
    "Mobile App Developer",
    "Hire Android Developer",
    "Hire Flutter Developer",
    "Android TV Development",
    "Jetpack Compose",
    "Mobile App Services",
  ],
  alternates: {
    canonical: "https://devawais.com/service",
  },
  openGraph: {
    title: "Mobile App Development Services — Android, Flutter & Android TV | Awais",
    description:
      "Hire Awais — Senior Android & Flutter Developer — for custom mobile apps and enterprise-grade mobile solutions.",
    url: "https://devawais.com/service",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Awais — Mobile App Development Services",
      },
    ],
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
                  style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
                  className="animate-in fade-in slide-in-from-bottom-4 [animation-delay:var(--delay)]"
                >
                  <Service3DCard service={service} />
                </div>
              ))}
            </div>
          </div>
    
    </SectionWrapper>
  )
}
