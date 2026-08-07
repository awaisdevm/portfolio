"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, locales } from "@/i18n/config";
import { useI18n } from "@/i18n/i18n-client";
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
  // segments[0] is "" (leading slash), segments[1] is the locale
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
// COMPONENT
// ============================================================================
export default function LanguageSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { locale: contextLocale } = useI18n();

  // Derive active locale from URL (source of truth), fallback to context
  const activeLocale = getActiveLocaleFromPath(pathname) ?? contextLocale;
  const meta = LOCALE_META[activeLocale];

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

  // Close on Escape key
  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  const handleSelect = useCallback(
    (newLocale: Locale) => {
      if (newLocale === activeLocale) {
        setOpen(false);
        return;
      }
      // Set cookie for server-side consistency
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      // Navigate to the new locale URL
      const newPath = buildLocalizedPath(pathname, newLocale);
      router.push(newPath);
      setOpen(false);
    },
    [activeLocale, pathname, router]
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${meta.label}. Change language`}
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
          "border-border/30 bg-surface/60 text-muted backdrop-blur-md",
          "hover:border-primary/40 hover:bg-surface hover:text-heading",
          open && "border-primary/40 bg-surface text-heading"
        )}
      >
        <span className="text-base leading-none" aria-hidden="true">
          {meta.flag}
        </span>
        <span className="hidden uppercase sm:inline">{activeLocale}</span>
        <svg
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180"
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
            "absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl",
            "border border-border/30 bg-surface/95 py-1 shadow-2xl backdrop-blur-xl",
            "animate-[fade-up_0.2s_ease-out_forwards]"
          )}
        >
          {locales.map((loc) => {
            const locMeta = LOCALE_META[loc];
            const isActive = loc === activeLocale;
            return (
              <li key={loc} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => handleSelect(loc)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-primary/15 text-heading"
                      : "text-muted hover:bg-surface-elevated/60 hover:text-heading"
                  )}
                >
                  <span className="text-lg leading-none" aria-hidden="true">
                    {locMeta.flag}
                  </span>
                  <span className="flex-1">{locMeta.label}</span>
                  {isActive && (
                    <svg
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M13.5 4.5L6.5 11.5L2.5 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
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
