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
    <div className="relative w-full h-full min-h-screen bg-[#030014] selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      {/* Premium Background Mesh Gradient */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse delay-1000" style={{ animationDuration: '7s' }} />
        <div className="absolute inset-0 bg-[#030014]/60 backdrop-blur-[100px]" />
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
// ... (rest of the component)          key={pathname}
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
