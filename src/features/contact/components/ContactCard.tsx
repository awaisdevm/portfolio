// src/features/contact/components/ContactCard.tsx
"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ObfuscatedContact } from "@/components/ui/ObfuscatedContact";
import type { ContactOption } from "../types";
import { ArrowUpRightIcon } from "@/components/icons/icons";
import { clsx, type ClassValue } from "clsx"; 
import { twMerge } from "tailwind-merge";

// Utility for cleaner class management
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ContactCardProps {
  option: ContactOption;
  variants?: Variants;
  className?: string; // Added to allow scaling in DirectActionGroup
}

export default function ContactCard({ option, variants, className }: ContactCardProps) {
  const { icon: Icon, label, meta, value, themeStyles, href, isObfuscated, obfuscateType } = option;
  const displayContent = meta || value || label; 

  const CardContent = (
    <div className={cn(
      "group relative flex items-center overflow-hidden rounded-2xl border border-border/20 bg-surface/40 p-5 backdrop-blur-md transition-all duration-300 hover:border-border-strong hover:bg-surface/70",
      className
    )}>
      {/* Hover Energy Line */}
      <div className="absolute top-0 left-0 h-full w-1 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className={cn(
        "mr-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/20 bg-surface-sunken/60 shadow-inner transition-transform duration-300 group-hover:scale-110",
        themeStyles?.glow || ""
      )}>
        <Icon className={cn("h-5 w-5", themeStyles?.iconColor || "text-primary-light")} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</h3>
        <p className={cn(
          "truncate font-display text-base font-semibold tracking-tight transition-colors group-hover:text-primary-light",
          className?.includes("p-8") ? "text-xl" : "text-lg" // Larger text for primary cards
        )}>
          {displayContent}
        </p>
      </div>

      <div className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/20 bg-surface-sunken/40 opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
        <ArrowUpRightIcon className="h-4 w-4 text-primary-light transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (isObfuscated) {
    return (
      <motion.div variants={variants} className="block w-full">
        <ObfuscatedContact type={obfuscateType} value={displayContent} className="block w-full">
          {CardContent}
        </ObfuscatedContact>
      </motion.div>
    );
  }

  return (
    <motion.a variants={variants} href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
      {CardContent}
    </motion.a>
  );
}