
"use client";

import { useState, useMemo, ReactNode } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & DATA STRUCTURES
// ============================================================================
export interface FilterGridItem {
  id: string;          // Primitive serializable key
  filterValue: string; // Key used for filtering comparison
  content: ReactNode;  // Pre-rendered server or client component content
}

export interface FilterOption {
  value: string;
  label: string;
}

interface GenericFilterGridProps {
  allLabel: string;
  filters: FilterOption[];
  noItemsLabel: string;
  resetFilterLabel: string;
  items: FilterGridItem[];
}

// ============================================================================
// STYLING CONFIGURATION (Aligned with globals.css Design Tokens)
// ============================================================================
const gridStyles = {
  filterBar: "flex flex-wrap items-center justify-start gap-3",
  filterButtonBase:
    "relative rounded-full px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
  filterButtonActive:
    "liquid-glass border-primary/60 text-primary shadow-lg shadow-primary/10 scale-[1.03]",
  filterButtonInactive:
    "border border-border-subtle bg-surface/40 text-muted hover:border-border-strong hover:bg-surface-elevated hover:text-heading",
  gridContainer: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
  emptyStateWrapper: "card-surface mt-16 py-12 text-center",
  emptyStateText: "text-sm text-muted",
  resetButton:
    "mt-3 text-sm font-medium text-primary transition-colors hover:text-primary-light underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm",
} as const;

export default function GenericFilterGrid({
  allLabel,
  filters,
  noItemsLabel,
  resetFilterLabel,
  items,
}: GenericFilterGridProps) {
  const [active, setActive] = useState<string>("all");

  const filterOptions = useMemo(
    () => [{ value: "all", label: allLabel }, ...filters],
    [allLabel, filters]
  );

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter(
      (item) => item.filterValue.toLowerCase() === active.toLowerCase()
    );
  }, [active, items]);

  return (
    <div>
      {/* FILTER BAR */}
      <div
        className={gridStyles.filterBar}
        role="group"
        aria-label="Filter options"
      >
        {filterOptions.map((filter) => {
          const isActive = active === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              className={cn(
                gridStyles.filterButtonBase,
                isActive
                  ? gridStyles.filterButtonActive
                  : gridStyles.filterButtonInactive
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* FILTERED GRID */}
      {filtered.length > 0 ? (
        <m.div layout className={gridStyles.gridContainer}>
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <m.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {item.content}
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      ) : (
        /* EMPTY STATE */
        <div className={gridStyles.emptyStateWrapper}>
          <p className={gridStyles.emptyStateText}>{noItemsLabel}</p>
          <button
            onClick={() => setActive("all")}
            className={gridStyles.resetButton}
          >
            {resetFilterLabel}
          </button>
        </div>
      )}
    </div>
  );
}