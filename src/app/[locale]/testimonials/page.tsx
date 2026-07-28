

import { getTranslationServer } from "@/i18n/i18n-server";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { testimonials as rawTestimonials } from "@/data";
import { getStandardPageLabels } from "@/lib/utils";
import { resolveLocale } from "@/i18n/config";
import type { RawTestimonial, Testimonial } from "@/features/testimonials/types";
import TestimonialsView from "@/features/testimonials/components/TestimonialsView";

interface TestimonialsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TestimonialsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata(resolveLocale(locale), "testimonials");
}

export default async function TestimonialsPage({ params }: TestimonialsPageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  const translate = await  getTranslationServer(locale);
  const labels = getStandardPageLabels(translate, "testimonials");


  const testimonials: Testimonial[] = (rawTestimonials as RawTestimonial[]).map((item) => ({
    ...item,
    message: translate(`testimonials.items.${item.slug}.message`),
  }));

  return <TestimonialsView labels={labels} testimonials={testimonials} />;
}