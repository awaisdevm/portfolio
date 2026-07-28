
import SectionHeader from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { ProcessStep } from "./HomeView";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

// ============================================================================
// STYLING CONFIGURATION (Aligned with globals.css Design Tokens)
// ============================================================================
const processCardStyles = {
  card: "group liquid-glass card-surface relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-primary/30 hover:bg-surface-elevated/40 md:hover:-translate-y-1",
  stepNumber:
    "font-mono text-xs font-bold uppercase tracking-wider text-accent",
  title:
    "mt-3 font-display text-base font-bold text-heading transition-colors duration-300 group-hover:text-primary",
  description: "mt-1.5 text-xs leading-relaxed text-muted/90",
  hoverGlow:
    "pointer-events-none absolute inset-0 bg-primary/5 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100",
} as const;

interface ProcessSectionProps {
  translate: (key: string) => string;
  processSteps: ProcessStep[];
}

// ============================================================================
// COMPONENT
// ============================================================================
/**
 * ProcessSection Component
 * Displays the key methodology steps/workflow in a clean, interactive grid.
 */
export default function ProcessSection({
  translate,
  processSteps,
}: ProcessSectionProps) {
  return (
    <SectionWrapper className="section-pad border-t border-border-subtle">
      <div className="container-page">
        <SectionHeader
          eyebrow={translate("home.processTitle")}
          title={translate("home.processSubtitle")}
          className="max-w-2xl"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((item, index) => (
            <AnimatedSection
              key={item.step}
              delay={index * 0.08}
              className={processCardStyles.card}
            >
              {/* Ambient background hover glow */}
              <div className={processCardStyles.hoverGlow} />

              <div>
                {/* Step Number */}
                <span className={processCardStyles.stepNumber}>
                  {item.step}
                </span>

                {/* Step Title */}
                <h3 className={processCardStyles.title}>{item.title}</h3>
              </div>

              {/* Step Description */}
              <p className={processCardStyles.description}>{item.body}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}