
"use client";

import type { Testimonial } from "@/features/testimonials/types";
import { QuoteIcon, StarIcon } from "@/components/icons/icons";
import { getInitials } from "@/lib/utils";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface TestimonialCardProps {
  testimonial: Testimonial;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = Math.min(Math.max(testimonial.rating, 1), 5);

  return (
    <article className="card-surface group relative flex flex-col justify-between p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface/70 hover:shadow-lg">
      {/* Top Bar: Quote Icon + Rating Stars */}
      <div className="flex items-center justify-between">
        <QuoteIcon
          size={20}
          className="text-primary/70 transition-colors duration-300 group-hover:text-primary"
          aria-hidden="true"
        />

        <div
          role="img"
          className="flex gap-1 text-primary-light"
          aria-label={`Rating: ${rating} out of 5 stars`}
        >
          {Array.from({ length: rating }).map((_, index) => (
            <StarIcon
              key={index}
              size={14}
              className="fill-primary-light text-primary-light"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Testimonial Quote Message */}
      <blockquote className="my-5 flex-1 font-sans line-clamp-6 text-sm leading-relaxed text-foreground/90">
        &ldquo;{testimonial.message}&rdquo;
      </blockquote>

      {/* Footer: Client Avatar Badge & Identity */}
      <div className="mt-auto flex items-center gap-3.5 border-t border-border/15 pt-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/15 font-display text-base font-bold text-primary-light">
          {getInitials(testimonial.clientName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-sm font-semibold text-heading">
            {testimonial.clientName}
          </p>
          <p className="truncate font-sans text-xs text-muted">
            {testimonial.clientRole}
          </p>
        </div>
      </div>
    </article>
  );
}