"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { m } from "framer-motion";
import { navLinks } from "@/lib/site-config";
import { Magnetic } from "../ui/Magnetic";
import { cn } from "@/lib/utils";

interface DesktopNavbarProps {
  getLocalizedHref: (href: string) => string;
  translate: (key: string) => string;
}

export default function DesktopNavbar({
  getLocalizedHref,
  translate,
}: DesktopNavbarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const localized = getLocalizedHref(href);
    return pathname === localized;
  };

  return (
    <nav className="hidden items-center md:flex" aria-label="Main Navigation">
      <div className="flex items-center gap-1 rounded-full border border-border/20 bg-surface-sunken/40 p-1 backdrop-blur-md">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Magnetic key={link.href} strength={0.15}>
              <Link
                href={getLocalizedHref(link.href)}
                className={cn(
                  "relative z-10 block whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200 focus:outline-none lg:px-5 lg:text-sm",
                  active
                    ? "font-bold text-heading"
                    : "text-muted hover:text-heading"
                )}
              >
                {translate(`nav.${link.label.toLowerCase()}`)}

                {active && (
                  <m.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 -z-10 rounded-full border border-primary/40 bg-primary/20 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  >
                    <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                  </m.div>
                )}
              </Link>
            </Magnetic>
          );
        })}
      </div>
    </nav>
  );
}