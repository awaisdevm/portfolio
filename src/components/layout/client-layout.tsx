"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useNav } from "@/app/nav-context";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    filter: "blur(4px)",
    opacity: 0,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    filter: "blur(0px)",
    opacity: 1,
    position: "relative" as const,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    filter: "blur(4px)",
    opacity: 0,
    position: "absolute" as const,
  }),
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { navItems } = useNav();

  // track prev path to determine direction
  const prevPath = useRef(pathname);

  const currentIndex = navItems.findIndex((item) => item.id === pathname);
  const prevIndex = navItems.findIndex((item) => item.id === prevPath.current);

  const direction = currentIndex > prevIndex ? 1 : -1;

  prevPath.current = pathname;

  return (
    <div className="relative w-full h-full min-h-screen selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* Dynamic Background Noise/Texture Overlay runs on top of layout.tsx */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none mix-blend-overlay bg-noise"
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
