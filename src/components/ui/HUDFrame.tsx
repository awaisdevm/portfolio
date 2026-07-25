"use client";
import { motion } from "framer-motion";

// ============================================================================
// CONSTANTS & CONFIGURATION (OCP / Clean Data Layer)
// ============================================================================
const HUD_CORNER_PATHS = [
  "M 5 1.5 L 1.5 1.5 L 1.5 5",
  "M 95 1.5 L 98.5 1.5 L 98.5 5",
  "M 5 98.5 L 1.5 98.5 L 1.5 95",
  "M 95 98.5 L 98.5 98.5 L 98.5 95",
] as const;

interface HUDFrameProps {
  isHovered: boolean;
}

export function HUDFrame({ isHovered }: HUDFrameProps) {
  return (
    <>
      {/* Top Laser Scanner Line */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-30 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />

      {/* Bottom Laser Scanner Line */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-30 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        animate={{ x: isHovered ? ["100%", "-100%"] : "100%" }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
      />

      {/* Cyberpunk HUD Corners */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 p-3 md:p-4"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="none"
        >
          {HUD_CORNER_PATHS.map((pathD) => (
            <path
              key={pathD}
              d={pathD}
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-primary-light/40 transition-colors duration-300 group-hover:text-primary"
            />
          ))}
        </svg>
      </div>

      {/* Vertical Scan Light Grid Sweep */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 h-[15%] w-full bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ top: "-15%" }}
        animate={{ top: isHovered ? "100%" : "-15%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </>
  );
}