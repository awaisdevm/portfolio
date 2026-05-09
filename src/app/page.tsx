import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SocialIcons } from '@/components/layout/social-links';
import { HeroSection } from '@/components/sections/hero-section';
import { Footer } from '@/components/layout/footer';

// Dynamic imports for sections below the fold to optimize LCP and reduce initial JS
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(mod => mod.AboutSection));
const FeatureProjectsSection = dynamic(() => import("@/components/sections/projects-section").then(mod => mod.FeatureProjectsSection));
const TestimonialSection = dynamic(() => import("@/components/sections/testimonial-section").then(mod => mod.TestimonialSection));
const ContactSection = dynamic(() => import("@/components/sections/contact-section").then(mod => mod.ContactSection));

export const metadata: Metadata = {
  title: "Awais — Senior Android & Flutter Developer",
  description:
    "Awais is a Senior Android & Flutter Developer with 6+ years building high-performance mobile apps. Hire a top Mobile Developer — 25+ apps shipped.",
  keywords: [
    "Awais",
    "Senior Developer",
    "Android",
    "Flutter",
    "Mobile Apps",
    "Android Developer",
    "Flutter Developer",
    "Senior Android Developer",
    "Senior Flutter Developer",
    "Mobile App Developer",
    "Hire Android Developer",
    "Kotlin Developer",
    "Jetpack Compose",
  ],
  alternates: {
    canonical: "https://devawais.com",
  },
  openGraph: {
    title: "Awais — Senior Android & Flutter Developer",
    description:
      "Senior Mobile App Developer with 6+ years in Android & Flutter. 25+ apps deployed for healthcare, e-sports, and enterprise clients.",
    url: "https://devawais.com",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Awais — Senior Android & Flutter Developer",
      },
    ],
  },
};

export default function Portfolio() {
  return (
    <div className="relative">
      {/* Decorative Atmospheric Orbs - Rendered on Server */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-32 left-32 w-80 h-80 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-40 w-96 h-96 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-3xl" />
        </div>
      </div>

      <SocialIcons />
      <HeroSection />
      
      <div className="space-y-0">
        <AboutSection />
        <FeatureProjectsSection />
        <TestimonialSection />
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
}


