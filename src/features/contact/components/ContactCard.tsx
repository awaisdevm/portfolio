"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ObfuscatedContact } from "@/components/ui/ObfuscatedContact";
import type { ContactOption } from "../types";
import { ArrowUpRightIcon } from "@/components/icons/icons";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface ContactCardProps {
  option: ContactOption;
  variants?: Variants;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ContactCard({ option, variants }: ContactCardProps) {
  const {
    icon: Icon,
    label,
    meta,
    value,
    themeStyles,
    href,
    isObfuscated,
    obfuscateType,
  } = option;

  const displayContent = meta || value;

  const CardContent = (
    <div className="group relative flex w-full items-center overflow-hidden rounded-2xl border border-border/20 bg-surface/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-border-strong hover:bg-surface/70 hover:shadow-lg">
      {/* Edge Energy Highlight Rail */}
      <div className="absolute top-0 left-0 h-full w-1 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon Frame */}
      <div
        className={`mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/20 bg-surface-sunken/60 shadow-inner backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 ${themeStyles?.glow || ""
          }`}
      >
        <Icon
          className={`h-5 w-5 ${themeStyles?.iconColor || "text-primary-light"}`}
        />
      </div>

      {/* Label & Handle/Value */}
      <div className="flex-1 min-w-0">
        <div className="mb-0.5 flex items-center gap-2">
          <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            {label}
          </h3>
        </div>
        <p className="truncate font-display text-base font-semibold tracking-tight text-heading transition-colors group-hover:text-primary-light sm:text-lg">
          {displayContent}
        </p>
      </div>

      {/* Action Arrow Badge (Parent explicitly tracks group hover state) */}
      <div className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/20 bg-surface-sunken/40 opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:opacity-100">
        <ArrowUpRightIcon
          className="h-4 w-4 text-primary-light transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </div>
  );

  if (isObfuscated) {
    return (
      <motion.div variants={variants} className="block w-full">
        <ObfuscatedContact
          type={obfuscateType}
          value={displayContent}
          className="block w-full"
        >
          {CardContent}
        </ObfuscatedContact>
      </motion.div>
    );
  }

  return (
    <motion.a
      variants={variants}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact via ${label}`}
      className="block w-full"
    >
      {CardContent}
    </motion.a>
  );
}