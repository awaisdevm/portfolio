
"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/i18n/i18n-client";
import type { Experience } from "../types";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface AboutTimelineProps {
  experiences: Experience[];
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function AboutTimeline({ experiences }: AboutTimelineProps) {
  const { translate } = useI18n();

  return (
    <section className="section-pad border-t border-border/20">
      <div className="container-page">
        {/* Section Header */}
        <SectionHeader
          eyebrow={translate("about.experienceTitle")}
          title={translate("about.experienceSubtitle")}
          className="mb-12 max-w-xl"
        />

        {/* Timeline Cards Stream */}
        <div className="mt-12 flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <AnimatedSection
              key={exp.id}
              delay={i * 0.06}
              className="card-surface grid grid-cols-1 gap-6 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-surface/70 md:grid-cols-4 md:gap-10 md:p-8"
            >
              {/* Left Column: Role Meta */}
              <div className="flex flex-col gap-1 md:col-span-1">
                <span className="mb-2 w-fit rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-light">
                  {renderDurationWithTime(exp.duration)}
                </span>
                <h3 className="font-display text-base font-bold leading-snug text-heading">
                  {exp.role}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                  {exp.company}
                </p>
              </div>

              {/* Right Column: Detailed Experience */}
              <div className="flex flex-col gap-4 md:col-span-3">
                <p className="text-sm leading-relaxed text-foreground">
                  {exp.description}
                </p>

                {/* Achievements Bullet List */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-3">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li
                        key={`${exp.id}-ach-${aIdx}`}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          className="mt-1 shrink-0 font-mono text-xs font-bold text-primary"
                          aria-hidden="true"
                        >
                          —
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to render semantic <time> tags
function renderDurationWithTime(duration: string) {
  const parts = duration.split("-").map((p) => p.trim());
  if (parts.length === 2) {
    const startYear = parts[0];
    const endYear = parts[1];
    return (
      <>
        <time dateTime={startYear}>{startYear}</time> -{" "}
        <time dateTime={endYear === "Present" ? new Date().getFullYear().toString() : endYear}>
          {endYear}
        </time>
      </>
    );
  }
  return <time dateTime={duration}>{duration}</time>;
}