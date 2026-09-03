"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, locales } from "@/i18n/config";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

// ============================================================================
// LOCALE METADATA — Single source of truth for display names & flag emoji
// ============================================================================
const LOCALE_META: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "English" },
  ur: { flag: "🇵🇰", label: "اردو" },
  de: { flag: "🇩🇪", label: "Deutsch" },
  ar: { flag: "🇸🇦", label: "العربية" },
  fr: { flag: "🇫🇷", label: "Français" },
  es: { flag: "🇪🇸", label: "Español" },
  ja: { flag: "🇯🇵", label: "日本語" },
  tr: { flag: "🇹🇷", label: "Türkçe" },
};

// ============================================================================
// HELPERS
// ============================================================================

/** Replaces the locale segment in the current URL path */
function buildLocalizedPath(pathname: string, newLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length >= 2 && (locales as readonly string[]).includes(segments[1])) {
    segments[1] = newLocale;
  } else {
    segments.splice(1, 0, newLocale);
  }
  return segments.join("/") || `/${newLocale}`;
}

/** Extracts the active locale from the URL path */
function getActiveLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return (locales as readonly string[]).includes(segment) ? (segment as Locale) : null;
}

// ============================================================================
interface LanguageSwitcherProps {
  className?: string;
  direction?: "up" | "down";
  align?: "left" | "right";
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function LanguageSwitcher({
  className,
  direction = "down",
  align = "right",
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const contextLocale = useLocale() as Locale;

  // Derive active locale from URL (source of truth), fallback to context
  const activeLocale = getActiveLocaleFromPath(pathname) ?? contextLocale;
  const meta = LOCALE_META[activeLocale] || LOCALE_META.en;

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const handleSelect = useCallback(
    (newLocale: Locale) => {
      if (newLocale === activeLocale) {
        setOpen(false);
        return;
      }
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      const newPath = buildLocalizedPath(pathname, newLocale);
      router.push(newPath);
      setOpen(false);
    },
    [activeLocale, pathname, router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
        const activeIdx = locales.indexOf(activeLocale);
        setFocusedIndex(activeIdx >= 0 ? activeIdx : 0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % locales.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + locales.length) % locales.length);
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(locales.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < locales.length) {
          handleSelect(locales[focusedIndex]);
        }
        break;
    }
  };

  useEffect(() => {
    if (open && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [open, focusedIndex]);

  return (
    <div ref={ref} className={cn("relative inline-block text-left", className)} onKeyDown={handleKeyDown}>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${meta.label}. Change language`}
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono font-medium transition-all duration-200 min-h-[36px]",
          "border-border/30 bg-surface/60 text-muted backdrop-blur-md",
          "hover:border-primary/40 hover:bg-surface hover:text-heading",
          open && "border-primary/40 bg-surface text-heading shadow-md"
        )}
      >
        <span className="text-base leading-none" aria-hidden="true">
          {meta.flag}
        </span>
        <span className="uppercase">{activeLocale}</span>
        <svg
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            direction === "up"
              ? open ? "rotate-0" : "rotate-180"
              : open ? "rotate-180" : "rotate-0"
          )}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className={cn(
            "absolute z-[99999] min-w-[170px] max-h-64 overflow-y-auto rounded-xl",
            "border border-border/40 bg-surface/95 py-1.5 shadow-2xl backdrop-blur-xl",
            align === "right" ? "right-0" : "left-0",
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2",
            direction === "up"
              ? "animate-[fade-up_0.15s_ease-out_forwards]"
              : "animate-[fade-up_0.15s_ease-out_forwards]"
          )}
        >
          {locales.map((loc, idx) => {
            const locMeta = LOCALE_META[loc];
            const isActive = loc === activeLocale;
            return (
              <li key={loc} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  onClick={() => handleSelect(loc)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3.5 py-2 text-left text-xs font-medium transition-colors duration-150 outline-none focus-visible:bg-surface-elevated/80 focus-visible:text-heading",
                    isActive
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-muted hover:bg-surface-elevated/60 hover:text-heading"
                  )}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {locMeta.flag}
                  </span>
                  <span className="flex-1">{locMeta.label}</span>
                  {isActive && (
                    <svg
                      className="h-3.5 w-3.5 text-primary"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.5 4.5L6.5 11.5L2.5 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
