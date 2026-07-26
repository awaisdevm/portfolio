
"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { navLinks } from "@/lib/site-config";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { ObfuscatedContact } from "../ui/ObfuscatedContact";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface MobileDrawerProps {
  isOpen: boolean;
  getLocalizedHref: (href: string) => string;
  translate: (key: string) => string;
  onClose: () => void;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const drawerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "-100%",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function MobileDrawer({
  isOpen,
  getLocalizedHref,
  translate,
  onClose,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const socialLinks = useSocialLinks();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // Lock body scroll when drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const isActive = (href: string) => {
    const localized = getLocalizedHref(href);
    return pathname === localized; 
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* BACKDROP OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-background/80 backdrop-blur-md md:hidden"
            aria-hidden="true"
          />

          {/* MAIN DRAWER CONTAINER */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed left-0 top-16 z-[9999] flex h-[calc(100vh-4rem)] w-full flex-col justify-between overflow-y-auto border-t border-border/30 bg-surface/95 p-6 backdrop-blur-xl md:hidden"
          >
            {/* NAVIGATION LINKS GRID */}
            <div className="grid grid-cols-1 gap-3 py-6">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={getLocalizedHref(link.href)}
                      onClick={onClose}
                      className={
                        active
                          ? "flex items-center justify-between rounded-xl border border-primary/30 bg-primary/15 p-4 font-semibold text-heading transition-all duration-200"
                          : "flex items-center justify-between rounded-xl p-4 text-muted transition-all duration-200 hover:bg-surface/60 hover:text-heading"
                      }
                    >
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        {translate(`nav.${link.label.toLowerCase()}`)}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* SEPARATOR & SOCIAL LINKS */}
            <div className="mt-auto flex flex-col gap-6">
              <motion.div
                variants={itemVariants}
                className="border-t border-border/20"
              />

              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-4 py-4"
              >
                {socialLinks.map((social) =>
                  social.isEmail ? (
                    <ObfuscatedContact
                      key={social.label}
                      type="email"
                      value={social.href}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-surface/60 text-muted transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-accent-light"
                    >
                      <social.icon className="h-5 w-5" aria-hidden="true" />
                    </ObfuscatedContact>
                  ) : (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit my ${social.label} profile`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-surface/60 text-muted transition-all duration-200 hover:border-accent/40 hover:bg-surface hover:text-accent-light"
                      onClick={onClose}
                    >
                      <social.icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}