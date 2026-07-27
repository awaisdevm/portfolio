"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/i18n/i18n-client";
import type { Experience } from "../types";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

interface AboutTimelineProps {
  experiences: Experience[];
}

export default function AboutTimeline({ experiences }: AboutTimelineProps) {
  const { translate } = useI18n();

  return (
    <section className="section-pad border-t border-white/10">
      <div className="container-page">
        <SectionHeader
          eyebrow={translate("about.experienceTitle")}
          title={translate("about.experienceSubtitle")}
          className="mb-12 max-w-xl"
        />

        <div className="mt-12 flex flex-col gap-6">
          {experiences.map((exp, i) => {
            const cardContent = (
              <div
                className="group relative grid grid-cols-1 gap-6 overflow-hidden rounded-2xl 
                           border border-white/10 border-t-white/25 
                           bg-gradient-to-b from-white/[0.08] to-white/[0.02] 
                           p-6 sm:p-8 backdrop-blur-sm sm:backdrop-blur-md 
                           shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
                           transition-all duration-300 hover:-translate-y-0.5 
                           hover:border-primary/50 hover:from-white/[0.12] hover:to-white/[0.04] 
                           md:grid-cols-4 md:gap-10 [content-visibility:auto]"
              >
                {/* Top Corner Glow */}
                <div
                  className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-80"
                  aria-hidden="true"
                />

                {/* Left Column */}
                <div className="relative z-10 flex flex-col gap-1 md:col-span-1">
                  <span className="mb-2 w-fit rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-light backdrop-blur-md">
                    {renderDurationWithTime(exp.duration)}
                  </span>
                  <h3 className="font-display text-base font-bold leading-snug text-heading">
                    {exp.role}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                    {exp.company}
                  </p>
                </div>

                {/* Right Column */}
                <div className="relative z-10 flex flex-col gap-4 md:col-span-3">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 flex flex-col gap-3 border-t border-white/5 pt-3">
                      {exp.achievements.map((achievement, aIdx) => (
                        <li
                          key={`${exp.id}-ach-${aIdx}`}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                        >
                          <span
                            className="mt-1 shrink-0 font-mono text-xs font-bold text-primary-light"
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
              </div>
            );

            if (i < 2) {
              return <div key={exp.id}>{cardContent}</div>;
            }

            return (
              <AnimatedSection key={exp.id} delay={0.05}>
                {cardContent}
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

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