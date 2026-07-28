
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "../layout/AnimatedSection";
import Head from "next/head";
import { ArrowUpRightIcon } from "../icons";

// ============================================================================
// STYLING CONFIGURATION (Aligned with globals.css Design Tokens)
// ============================================================================
const sectionHeaderStyles = {
  container: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
  eyebrow: "eyebrow",
  title: "mt-3 font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl",
  actionLink:
    "inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-light focus-visible:underline focus-visible:outline-none",
} as const;

// ============================================================================
// TYPES
// ============================================================================
export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

// ============================================================================
// COMPONENT
// ============================================================================
/**
 * SectionHeader
 * Standard section heading block featuring an eyebrow label, main section title,
 * and an optional right-aligned action link with entry animation.
 */
export default function SectionHeader({
  eyebrow,
  title,
  actionText,
  actionHref,
  className = "",
  as: Heading = "h2"
}: SectionHeaderProps) {
  return (
    <AnimatedSection
      className={cn(sectionHeaderStyles.container, className)}
    >
      <div>
        <p className={sectionHeaderStyles.eyebrow}>{eyebrow}</p>
        <Heading className={sectionHeaderStyles.title}>{title}</Heading>
      </div>

      {actionText && actionHref && (
        <Link href={actionHref} className={sectionHeaderStyles.actionLink}>
          <span>{actionText}</span>
          <ArrowUpRightIcon size={15} />
        </Link>
      )}
    </AnimatedSection>
  );
}