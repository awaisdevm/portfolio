"use client";

import type { Testimonial } from "@/features/testimonials/types";
import { QuoteIcon, StarIcon } from "@/components/icons/icons";
import { getInitials } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = Math.min(Math.max(testimonial.rating || 5, 1), 5);

  return (
    <article 
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl 
                 border border-white/10 border-t-white/25 
                 bg-gradient-to-b from-white/[0.08] to-white/[0.02] 
                 p-6 backdrop-blur-sm sm:backdrop-blur-md 
                 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
                 transition-all duration-300 hover:-translate-y-1 
                 hover:border-primary/50 hover:from-white/[0.12] hover:to-white/[0.04] 
                 [content-visibility:auto]"
    >
      {/* Top Glass Inner Glow/Highlight Effect */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-50" 
        aria-hidden="true" 
      />

      {/* Top Bar: Quote Icon + Rating Stars */}
      <div className="relative z-10 flex items-center justify-between">
        <QuoteIcon
          size={20}
          className="text-primary/80 transition-colors duration-300 group-hover:text-primary"
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
      <blockquote className="relative z-10 my-5 flex-1 font-sans line-clamp-6 text-sm leading-relaxed text-foreground/90">
        &ldquo;{testimonial.message}&rdquo;
      </blockquote>

      {/* Footer: Client Avatar Badge & Identity */}
      <div className="relative z-10 mt-auto flex items-center gap-3.5 border-t border-white/10 pt-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 font-display text-base font-bold text-primary-light backdrop-blur-md shadow-inner">
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