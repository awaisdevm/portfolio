"use client";

import { type ReactNode } from "react";
import Link from "next/link";

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

function ActionLink({ action }: { action: CardAction }) {
  const isPrimary = action.variant === "primary";
  const href = action.href || "#";

  const baseStyles =
    "relative inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 no-underline min-h-[34px]";

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
        aria-label={action.label}
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
      aria-label={action.label}
      onClick={(e) => e.stopPropagation()}
      className={`${baseStyles} ${variantStyles} ${iconColorClass}`}
    >
      {action.icon}
      <span className={textStyles}>{action.label}</span>
    </Link>
  );
}

export function PreviewCard({
  title,
  summary,
  media,
  badges = [],
  tags = [],
  actions = [],
  className = "",
}: PreviewCardProps) {
  return (
    <div
      className={`group relative flex aspect-[4/5] w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface shadow-xl transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 [content-visibility:auto] ${className}`}
    >
      {/* Ambient hover overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Badges Container */}
      {badges.length > 0 && (
        <div className="absolute right-4 top-4 z-30 flex flex-col items-end gap-1.5">
          {badges.map((badge, idx) => {
            const isPrimary = badge.variant === "primary" || !badge.variant;
            return (
              <span
                key={idx}
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                  isPrimary
                    ? "border-primary/40 bg-primary/20 text-primary-light shadow-sm"
                    : "border-border-strong bg-slate-900/90 text-slate-100"
                }`}
              >
                {badge.text}
              </span>
            );
          })}
        </div>
      )}

      {/* Media Container (55% Height) */}
      <div className="relative flex h-[55%] w-full items-center justify-center border-b border-border/50 bg-surface-sunken/50">
        {media}
      </div>

      {/* Content Area (45% Height) */}
      <div className="relative z-30 flex flex-grow flex-col justify-between bg-surface px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <div>
          {/* ACCESSIBILITY FIX: Changed h3 -> h2 for proper sequential heading hierarchy */}
          <h2 className="font-display text-lg font-bold tracking-tight text-heading transition-colors duration-300 group-hover:text-primary sm:text-xl">
            {title}
          </h2>

          {/* Hover reveal summary & tags */}
          <div className="mt-2 grid grid-rows-[1fr] opacity-100 transition-all duration-500 [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="mt-1 text-xs leading-relaxed text-slate-300 line-clamp-2">
                {summary}
              </p>

              {/* ACCESSIBILITY FIX: Contrast high-contrast background & crisp light text */}
              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-md border border-slate-700 bg-slate-900/90 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-slate-100 shadow-sm"
                    >
                      {tag.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Static Bottom Action Buttons */}
        {actions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 pt-2">
            {actions.map((action, idx) => (
              <ActionLink key={idx} action={action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviewCard;