
"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { HUDFrame } from "./HUDFrame";

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
// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function ActionLink({ action }: { action: CardAction }) {
  const isPrimary = action.variant === "primary";
  const href = action.href || "#";

  const baseStyles =
    "relative inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 no-underline";

  // Explicitly enforcing text colors and overriding any global anchor styles
  const variantStyles = isPrimary
    ? "border border-primary bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
    : "border border-border-strong bg-surface-elevated text-heading shadow-sm hover:border-primary hover:bg-surface";


  const textStyles = isPrimary ? "!text-primary-foreground font-extrabold" : "!text-heading hover:!text-accent";
  const iconColorClass = isPrimary ? "[&_svg]:text-primary-foreground [&_svg]:fill-primary-foreground" : "[&_svg]:text-accent";

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
// COMPONENT
// ============================================================================
/**
 * PreviewCard (GenericCard)
 * Interactive card component featuring media previews, hover animated HUD frame overlays,
 * badges, tag lists, and action buttons.
 */
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
      className={`group relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-xl transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 ${isHovered ? "is-hovered" : ""
        } ${className}`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered((prev) => !prev)}
    >
      {/* HUD Effect overlay */}
      <HUDFrame isHovered={isHovered} />

      {/* Dynamic hover overlay highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/5 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Badges Container */}
      {badges.length > 0 && (
        <div className="absolute right-4 top-4 z-40 flex flex-col items-end gap-1.5">
          {badges.map((badge, idx) => {
            const isPrimary = badge.variant === "primary" || !badge.variant;
            return (
              <span
                key={idx}
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 ${isPrimary
                  ? "border-accent/40 bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                  : "border-primary/40 bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  }`}
              >
                {badge.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Media Block */}
      <div className="relative flex h-[45%] w-full items-center justify-center overflow-hidden border-b border-border/50 bg-surface-sunken/40">
        <div className="relative flex h-full w-full items-center justify-center p-6 brightness-125 contrast-110 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] transition-all duration-500 group-hover:scale-105">
          {media}
        </div>
      </div>

      {/* <div className="relative flex h-[45%] w-full items-center justify-center overflow-hidden border-b border-border/50 bg-surface-sunken/40">
        <div className="relative h-full w-full flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
          {media}
        </div>
      </div>*/}

      {/* Bottom Content Area - Solid surface background to prevent mixing with page background */}
      <div className="relative z-40 flex flex-grow flex-col justify-end bg-surface px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <h3 className="font-display text-lg font-bold tracking-tight text-heading transition-colors duration-300 group-hover:text-primary sm:text-xl">
          {title}
        </h3>

        <div
          className={`mt-2 grid transition-all duration-500 ${isHovered
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[1fr] opacity-100 sm:grid-rows-[0fr] sm:opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <p className="mt-1 text-xs leading-relaxed text-foreground/80 line-clamp-2 sm:line-clamp-none">
              {summary}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded border border-border/60 bg-surface-elevated px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide text-primary"
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