"use client";

import React from "react";
import { m, type Variants } from "framer-motion";
import { ObfuscatedContact } from "@/components/ui/ObfuscatedContact";
import type { ContactOption } from "../types";
import { ArrowUpRightIcon } from "@/components/icons";
import { clsx, type ClassValue } from "clsx"; 
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ContactCardProps {
  option: ContactOption;
  variants?: Variants;
  className?: string;
}

export default function ContactCard({ option, variants, className }: ContactCardProps) {
  const { icon: Icon, label, meta, value, themeStyles, href, isObfuscated, obfuscateType } = option;
  const displayContent = meta || value || label; 

  // FIX 1: Ensure href is valid for crawlers
  const validHref = href || (value && value.includes("@") ? `mailto:${value}` : "#");

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
        {/* FIX 2: Changed <h3> to <p> to fix Heading Hierarchy accessibility issue */}
        <p className="mb-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          {label}
        </p>
        <p className={cn(
          "truncate font-display text-base font-semibold tracking-tight transition-colors group-hover:text-primary-light",
          className?.includes("p-8") ? "text-xl" : "text-lg"
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
      <m.div variants={variants} className="block w-full">
        <ObfuscatedContact type={obfuscateType} value={displayContent} className="block w-full">
          {CardContent}
        </ObfuscatedContact>
      </m.div>
    );
  }

  return (
    <m.a 
      variants={variants} 
      href={validHref} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={`${label}: ${displayContent}`}
      className="block w-full"
    >
      {CardContent}
    </m.a>
  );
}