
"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useI18n } from "@/i18n/i18n-client";
import { ArrowUpRightIcon } from "../icons";
import { MappedHomeData } from "@/features/home/components/HomeView";
import { AnimatedSection } from "../layout/AnimatedSection";

// ============================================================================
// STYLING CONFIGURATION (Aligned with globals.css Design Tokens)
// ============================================================================
const ctaStyles = {
  sectionPadding: "relative overflow-hidden pb-24",
  boxWrapper:
    "liquid-glass card-surface relative flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-2xl shadow-primary/5 sm:px-16",
  eyebrow: "eyebrow",
  title:
    "max-w-xl font-display text-3xl font-semibold leading-tight text-heading sm:text-4xl",
  description: "max-w-md text-sm leading-relaxed text-muted",
  buttonContainer:
    "mt-2 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row",
} as const;

const btnStyles = {
  solid: "w-full sm:w-auto px-7 py-3.5 btn-primary",
  outline: "w-full sm:w-auto px-7 py-3.5",
} as const;

interface CTASectionProps {
  homeData: MappedHomeData;
}

export default function CTASection({ homeData }: CTASectionProps) {
  const { translate } = useI18n();
  const { contactPath, projectsPath } = homeData;

  return (
    <section className={ctaStyles.sectionPadding}>
      <div className="container-page relative">
        <AnimatedSection className={ctaStyles.boxWrapper}>
          {/* Ambient background accent tint */}
          <div className="pointer-events-none absolute inset-0 bg-primary/5 mix-blend-overlay" />

          <p className={ctaStyles.eyebrow}>{translate("cta.bookedStatus")}</p>

          <h2 className={ctaStyles.title}>{translate("cta.title")}</h2>

          <p className={ctaStyles.description}>{translate("cta.description")}</p>

          <div className={ctaStyles.buttonContainer}>
            {/* Primary "Start Project" Button */}
            <Button asChild className={btnStyles.solid}>
              <Link
                href={contactPath}
                className="flex min-h-[44px] items-center justify-center gap-2"
              >
                {translate("home.buttonStart")} <ArrowUpRightIcon size={16} />
              </Link>
            </Button>

            {/* Secondary "View Projects" Button */}
            <Button asChild variant="outline" className={btnStyles.outline}>
              <Link
                href={projectsPath}
                className="flex min-h-[44px] items-center justify-center"
              >
                {translate("home.buttonView")}
              </Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}