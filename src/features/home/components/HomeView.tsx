
import HeroSection from "./HeroSection";
import FeaturedProjects from "./FeaturedProjects";
import ProcessSection from "./ProcessSection";
import TestimonialsSection from "./TestimonialsSection";

import type { getHomeData } from "@/features/home/data";
import type { Locale } from "@/i18n/config";
import { TranslateFn } from "@/i18n/types";

import TechMarquee from "@/components/sections/TechMarquee";

// ============================================================================
// TYPES
// ============================================================================
type RawHomeData = Awaited<ReturnType<typeof getHomeData>>;

export type MappedHomeData = RawHomeData & {
    availabilityText: string;
    contactPath: string;
    projectsPath: string;
    testimonialsPath: string;
};

export interface ProcessStep {
    step: string;
    title: string;
    body: string;
}

interface HomeViewProps {
    locale: Locale;
    translate: TranslateFn;
    homeData: MappedHomeData;
    processSteps: ProcessStep[];
}

// ============================================================================
// COMPONENT
// ============================================================================
/**
 * HomeView Component
 * Main page orchestrator composing the primary sections for the home screen.
 */
export default function HomeView({
    translate,
    homeData,
    processSteps,
}: HomeViewProps) {
    return (
        <main className="flex flex-col gap-16 md:gap-24">
            {/* 1. Hero Landing Area */}
            <HeroSection translate={translate} homeData={homeData} />
            <TechMarquee />
            {/* 2. Portfolio Grid */}
            <FeaturedProjects translate={translate} homeData={homeData} />

            {/* 3. Methodology & Flow Chart */}
            <ProcessSection translate={translate} processSteps={processSteps} />

            {/* 4. Client Feedbacks */}
            <TestimonialsSection translate={translate} homeData={homeData} />
        </main>
    );
}