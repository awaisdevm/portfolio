
import React from "react";
import { AnimatedSection } from "../layout/AnimatedSection";

// ============================================================================
// TYPES
// ============================================================================
export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================
/**
 * PageHeader
 * Reusable hero header for interior pages providing eyebrow, title, and description
 * with entry animations.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <section className={`relative overflow-hidden pb-12 pt-16 sm:pb-16 sm:pt-24 ${className}`}>
      <div className="container-page relative">
        <AnimatedSection>
          {/* Eyebrow Label */}
          <p className="eyebrow">{eyebrow}</p>

          {/* Main Page Title */}
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-5 max-w-2xl text-base text-foreground/80 sm:text-lg sm:leading-relaxed">
            {description}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}