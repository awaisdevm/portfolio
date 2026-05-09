import { Variants } from "framer-motion";

/**
 * Global Animation System
 * Core entrance and transition variants for the portfolio.
 */

export const systemInitVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(5px)",
    scale: 0.98,
    y: 10
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1
    }
  }
};

export const hoverMagnetic: Variants = {
  rest: { x: 0, y: 0, scale: 1 },
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
