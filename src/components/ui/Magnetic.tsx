
"use client";

import React, { useRef, type ReactNode } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

// ============================================================================
// TYPES
// ============================================================================
type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

// ============================================================================
// COMPONENT
// ============================================================================
/**
 * Wraps a single child element and subtly pulls it toward the cursor on hover,
 * springing back to rest on mouse leave.
 */
export function Magnetic({
  children,
  strength = 0.2,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth, responsive spring configuration
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    // Check for reduced motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </m.div>
  );
}