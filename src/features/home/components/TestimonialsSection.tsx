

import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/features/testimonials/components/TestimonialCard";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import type { MappedHomeData } from "./HomeView";
import { TranslateFn } from "@/i18n/types";

interface TestimonialsSectionProps {
    translate: TranslateFn;
    homeData: MappedHomeData;
}

export default function TestimonialsSection({
    translate,
    homeData,
}: TestimonialsSectionProps) {
    const { featuredTestimonials, testimonialsPath } = homeData;

    return (
        <SectionWrapper className="section-pad" showBlobs={false}>
            <div className="container-page">
                <SectionHeader
                    eyebrow={translate("home.feedbackTitle")}
                    title={translate("home.feedbackSubtitle")}
                    actionText={translate("home.allTestimonialsLink")}
                    actionHref={testimonialsPath}
                />

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredTestimonials.map((testimonial, index) => (
                        <AnimatedSection
                            key={testimonial.slug ?? testimonial.id ?? index}
                            delay={index * 0.08}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}