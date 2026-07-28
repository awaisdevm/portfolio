import React from "react";

interface GradientBlobProps {
  className?: string;
  style?: React.CSSProperties;
  /** Optional override — defaults to theme's --primary (brand peach) */
  color?: string;
  /** Blob size — controls width/height uniformly */
  size?: number;
}

export default function GradientBlob({
  className = "",
  style,
  color,
  size = 480,
}: GradientBlobProps) {
  return (
    <></>
    // <div
    //   aria-hidden
    //   style={{
    //     width: size,
    //     height: size,
    //     background: color
    //       ? `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)`
    //       : `radial-gradient(circle at 30% 30%, var(--primary), transparent 70%)`,
    //     ...style,
    //   }}
    //   className={`
    //     pointer-events-none absolute
    //     rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]
    //     blur-[80px] sm:blur-[120px]
    //     opacity-40 mix-blend-screen
    //     will-change-transform transform-gpu
    //     animate-liquid
    //     ${className}
    //   `}
    // />
  );
}