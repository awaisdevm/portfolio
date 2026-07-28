"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) => {
  const shouldReduceMotion = useReducedMotion();


  const initial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };

  return (
    <m.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "0px", amount: 0.1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};