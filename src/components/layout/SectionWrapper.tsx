import React from "react";
import GradientBlob from "../ui/GradientBlob";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  blobColorLeft?: string;
  blobColorRight?: string;
  showBlobs?: boolean;
  watermarkText?: string;
  id?: string;
}

export default function SectionWrapper({
  children,
  className = "",
  blobColorLeft = "var(--color-brand-subtle)",
  blobColorRight = "var(--color-accent-subtle)",
  showBlobs = true,
  watermarkText,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative overflow-hidden", className)}>
      {/* 1. Background Gradient Blobs */}
      {showBlobs && (
        <>
          <GradientBlob className="-left-32 -top-32" />
          <GradientBlob
            color="var(--accent)"
            className="-bottom-40 -right-40"
            size={600}
          />
        </>
      )}

      {/* 2. Responsive Tailwind v4 Watermark */}
      {watermarkText && (
        <div 
          className="pointer-events-none absolute inset-x-0 top-12 z-0 mx-auto flex w-full select-none justify-center px-4 text-center leading-none opacity-5 sm:top-16 md:top-24 lg:top-28"
          aria-hidden="true"
        >
          <h1 className="font-display text-[clamp(2.75rem,10vw,9.5rem)] font-black uppercase tracking-widest text-heading transition-all duration-300">
            {watermarkText}
          </h1>
        </div>
      )}

      {/* 3. Section Content Slot */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}