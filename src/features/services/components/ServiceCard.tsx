"use client";

import {
  SERVICES_ICON_MAP,
  type LocalizedServiceItem,
} from "../configs/services-config";
import { StackOutlinedIcon } from "@/components/icons";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface ServiceCardProps {
  service: LocalizedServiceItem;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = SERVICES_ICON_MAP[service.iconName] ?? StackOutlinedIcon;

  return (
    <article
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl 
                 border border-white/10 border-t-white/25 
                 bg-gradient-to-b from-white/[0.08] to-white/[0.02] 
                 p-6 sm:p-7 backdrop-blur-sm sm:backdrop-blur-md 
                 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
                 transition-all duration-300 hover:-translate-y-1 
                 hover:border-primary/50 hover:from-white/[0.12] hover:to-white/[0.04] 
                 [content-visibility:auto]"
    >
      {/* Top Glass Inner Glow/Highlight Effect */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-primary/10 blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Upper Content */}
      {/* UPPER CONTENT */}
      <div className="relative z-10">
        {/* Glass Icon Container */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-primary-light shadow-inner backdrop-blur-md transition-transform duration-500 group-hover:scale-105 group-hover:border-primary/40">
          <IconComponent size={22} aria-hidden="true" />
        </div>

        <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-heading transition-colors duration-300 group-hover:text-primary-light">
          {service.title}
        </h2>

        <p className="mt-2.5 text-sm leading-relaxed text-foreground/80">
          {service.description}
        </p>
      </div>

      {/* Tech Stack Glass Badges */}
      <div className="relative z-10 mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
        {service.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-medium text-muted transition-all duration-300 hover:border-white/20 group-hover:text-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}