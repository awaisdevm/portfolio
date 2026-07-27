"use client";

import PageHeader from "@/components/ui/PageHeader";
import TestimonialCard from "@/features/testimonials/components/TestimonialCard";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import type { StandardPageLabels } from "@/lib/utils";
import type { Testimonial } from "@/features/testimonials/types";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface TestimonialsViewProps {
  labels: StandardPageLabels;
  testimonials: Testimonial[];
}

// ============================================================================
// MAIN VIEW COMPONENT
// ============================================================================
export default function TestimonialsView({
  labels,
  testimonials,
}: TestimonialsViewProps) {
  return (
    <>
      <PageHeader
        eyebrow={labels.title}
        title={labels.headerTitle}
        description={labels.headerDesc}
      />

      <section className="section-pad pt-0">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, i) => {
            // First 2 cards above the fold on mobile should NOT wait for Framer Motion animation (Instant LCP Fix)
            const isAboveFold = i < 2;

            return isAboveFold ? (
              <div key={testimonial.slug || i}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ) : (
              <AnimatedSection key={testimonial.slug || i} delay={(i - 2) * 0.05}>
                <TestimonialCard testimonial={testimonial} />
              </AnimatedSection>
            );
          })}
        </div>
      </section>
    </>
  );
}