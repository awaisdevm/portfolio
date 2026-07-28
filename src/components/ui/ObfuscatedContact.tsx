
"use client";

import { useState, type ReactNode, type MouseEvent } from "react";

// ============================================================================
// TYPES
// ============================================================================
type ObfuscatedContactProps = {
  type: "email" | "phone";
  value: string;
  className?: string;
  children: ReactNode;
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function getHref(type: "email" | "phone", value: string): string {
  return type === "email" ? `mailto:${value}` : `tel:${value}`;
}

// ============================================================================
// COMPONENT
// ============================================================================
/**
 * Renders a contact link without the raw address/number present in the
 * initial static HTML. Protects against scrapers while maintaining full
 * keyboard accessibility and screen reader support.
 */
export function ObfuscatedContact({
  type,
  value,
  className = "",
  children,
}: ObfuscatedContactProps) {
  const [revealed, setRevealed] = useState(false);

  function revealAndAction() {
    if (!revealed) {
      setRevealed(true);
    }
  }

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!revealed) {
      e.preventDefault();
      revealAndAction();
      window.location.href = getHref(type, value);
    }
  }

  const computedHref = revealed ? getHref(type, value) : "#";
  const actionLabel =
    type === "email" ? "Send an email" : "Call contact number";

  return (
    <a
      href={computedHref}
      onClick={handleClick}
      onMouseEnter={revealAndAction}
      onFocus={revealAndAction}
      className={className}
      role={revealed ? undefined : "button"}
      aria-label={actionLabel}
    >
      {children}
    </a>
  );
}