
"use client";

import PageHeader from "@/components/ui/PageHeader";
import type { StandardPageLabels } from "@/lib/utils";


import AboutBioCard from "./AboutBioCard";
import AboutExpertise from "./AboutExpertise";
import AboutTimeline from "./AboutTimeline";
import type { AboutData } from "../types";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface AboutViewProps {
  labels: StandardPageLabels;
  data: AboutData;
  tagline: string;
  availability: string;
}

// ============================================================================
// MAIN VIEW COMPONENT
// ============================================================================
export default function AboutView({
  labels,
  data,
  tagline,
  availability,
}: AboutViewProps) {
  return (
    <>
      {/* Top Page Header */}
      <PageHeader
        eyebrow={labels.title}
        title={labels.headerTitle}
        description={labels.headerDesc}
      />

      {/* Main Bio & Expertise Grid Section */}
      <section className="pb-20 md:pb-28">
        <div className="container-page grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Column: Bio & Deliverable Stats */}
          <AboutBioCard
            stats={data.stats}
            tagline={tagline}
            availability={availability}
          />

          {/* Right Column: Skill & Tech Stack Groups */}
          <AboutExpertise expertiseGroups={data.expertiseGroups} />
        </div>
      </section>

      {/* Career Experience Timeline Section */}
      <AboutTimeline experiences={data.experiences} />
    </>
  );
}