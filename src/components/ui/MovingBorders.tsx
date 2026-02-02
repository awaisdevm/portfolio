"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

// === Types ===
type MovingBordersProps = {
  children: React.ReactNode;
  borderRadius?: string;
  className?: string;
  containerClassName?: string;
  duration?: number;
  sizeClassName?: string;
};

type MovingBorderProps = {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
};

// === Main Component ===
export function MovingBorders({
  children,
  borderRadius = "1.75rem",
  className,
  containerClassName,
  duration = 10000,
  sizeClassName = "h-20 w-20",
}: MovingBordersProps) {
  return (
    <div
      className={cn(
        "relative inline-flex w-full h-full p-[1px] overflow-hidden bg-transparent",
        containerClassName
      )}
      style={{ borderRadius }}
    >
      {/* Moving border gradient layer */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              sizeClassName,
              "opacity-80",
              "bg-[radial-gradient(#593185_80%,transparent_60%)]",
              "dark:bg-[radial-gradient(#7B61FF_40%,transparent_60%)]"
            )}
          />
        </MovingBorder>
      </div>

      {/* Content area */}
      <div
        className={cn(
          "relative flex items-center justify-center w-full h-full border text-sm antialiased backdrop-blur-xl",
          "bg-[#F2F3F5]/80 text-black border-black/10",
          "dark:bg-slate-900/50 dark:text-white dark:border-slate-800",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <div className="group relative transform-gpu p-4 text-center w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl" />
          <div className="relative p-8 rounded-2xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// === Moving Border Animation ===
function MovingBorder({
  children,
  duration = 2000,
  rx,
  ry,
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const speed = length / duration;
      progress.set((time * speed) % length);
    }
  });

  const x = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(progress, (val) =>
    pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`
    translateX(${x}px) translateY(${y}px) 
    translateX(-50%) translateY(-50%)
  `;

  return (
    <>
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect ref={pathRef} fill="none" width="100%" height="100%" rx={rx} ry={ry} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
