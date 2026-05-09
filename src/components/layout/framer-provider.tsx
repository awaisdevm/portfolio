"use client";

import { LazyMotion, domAnimation } from "framer-motion";

export const FramerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
};
