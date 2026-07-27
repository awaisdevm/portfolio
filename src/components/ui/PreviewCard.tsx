"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";

// ============================================================================
// TYPES
// ============================================================================
export interface CardBadge {
  text: string;
  variant?: "primary" | "secondary";
}

export interface CardTag {
  text: string;
}

export interface CardAction {
  label: string;
  href?: string;
  isExternal?: boolean;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export interface PreviewCardProps {
  href?: string;
  title: string;
  summary: string;
  media: ReactNode;
  badges?: CardBadge[];
  tags?: CardTag[];
  actions?: CardAction[];
  className?: string;
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function ActionLink({ action }: { action: CardAction }) {
  const isPrimary = action.variant === "primary";
  const href = action.href || "#";

  const baseStyles =
    "relative inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 no-underline min-h-[34px]";

  // Tailwind v4 Design System Variants
  const variantStyles = isPrimary
    ? "border border-primary bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
    : "border border-border-strong bg-surface-elevated text-heading shadow-sm hover:border-primary hover:bg-surface";

  const textStyles = isPrimary
    ? "!text-primary-foreground font-extrabold"
    : "!text-heading hover:!text-primary";

  const iconColorClass = isPrimary
    ? "[&_svg]:text-primary-foreground [&_svg]:fill-primary-foreground"
    : "[&_svg]:text-primary";

  if (action.isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`${baseStyles} ${variantStyles} ${iconColorClass}`}
      >
        {action.icon}
        <span className={textStyles}>{action.label}</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={(e) => e.stopPropagation()}
      className={`${baseStyles} ${variantStyles} ${iconColorClass}`}
    >
      {action.icon}
      <span className={textStyles}>{action.label}</span>
    </Link>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function PreviewCard({
  title,
  summary,
  media,
  badges = [],
  tags = [],
  actions = [],
  className = "",
}: PreviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-xl transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 [content-visibility:auto] ${
        isHovered ? "is-hovered" : ""
      } ${className}`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Hover Highlight Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Badges Container */}
      {badges.length > 0 && (
        <div className="absolute right-4 top-4 z-30 flex flex-col items-end gap-1.5">
          {badges.map((badge, idx) => {
            const isPrimary = badge.variant === "primary" || !badge.variant;
            return (
              <span
                key={idx}
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  isPrimary
                    ? "border-primary/40 bg-primary/15 text-primary shadow-sm backdrop-blur-md"
                    : "border-border-strong bg-surface-elevated/90 text-heading backdrop-blur-md"
                }`}
              >
                {badge.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Media Container (55% Height Ratio) */}
      <div className="relative flex h-[55%] w-full items-center justify-center border-b border-border/50 bg-surface-sunken/50">
        {media}
      </div>

      {/* Content Area (45% Height Ratio) */}
      <div className="relative z-30 flex flex-grow flex-col justify-between bg-surface px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-heading transition-colors duration-300 group-hover:text-primary sm:text-xl">
            {title}
          </h3>
        </div>

        {/* Hover Animation - Active on Web, Static on Mobile */}
        <div
          className={`mt-2 grid transition-all duration-500 ${
            isHovered
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[1fr] opacity-100 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">
              {summary}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-md border border-border-strong bg-surface-elevated px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-muted"
                  >
                    {tag.text}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            {actions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {actions.map((action, idx) => (
                  <ActionLink key={idx} action={action} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewCard;