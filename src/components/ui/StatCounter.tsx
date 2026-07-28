// src/components/ui/StatCounter.tsx
"use client";

import React, { useRef } from "react";
import { m, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================
export interface StatCounterProps {
  value: string;
  label: string;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================
/**
 * StatCounter
 * Animated statistical key result component triggered on viewport enter.
 */
export default function StatCounter({
  value,
  label,
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className={cn("text-left", className)}
      aria-label={`${value} ${label}`}
    >
      <m.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl"
      >
        {value}
      </m.p>
      <p className="mt-1 text-sm font-medium text-muted">{label}</p>
    </div>
  );
}