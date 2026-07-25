"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/site-config";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { Magnetic } from "../ui/Magnetic";
import { ObfuscatedContact } from "../ui/ObfuscatedContact";
import { Button } from "../ui/button";
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
  const socialLinks = useSocialLinks();

  const isActive = (href: string) => {
    const localized = getLocalizedHref(href);
    return pathname === localized;
  };

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {/* ADDED: max-w-full aur overflow-x-auto safety for long dynamic translations */}
      <div className="liquid-glass flex max-w-full items-center gap-0.5 rounded-full px-2 py-1.5 shadow-xl sm:px-3">
        {/* Navigation Links */}
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Magnetic key={link.href} strength={0.15}>
              <Link
                href={getLocalizedHref(link.href)}
                className={cn(
                  /* ADDED: whitespace-nowrap & responsive text sizes & adjusted horizontal paddings */
                  "relative z-10 block whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 focus:outline-none lg:px-3.5 lg:text-sm",
                  active
                    ? "font-bold text-heading"
                    : "text-muted hover:text-heading"
                )}
              >
                {translate(`nav.${link.label.toLowerCase()}`)}

                {active && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 -z-10 rounded-full border border-primary/30 bg-primary/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  >
                    <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                  </motion.div>
                )}
              </Link>
            </Magnetic>
          );
        })}

        {/* Social Links & Contact Action */}
        <div className="ml-1 flex items-center gap-0.5 border-l border-border-subtle pl-2 lg:ml-2 lg:pl-3">
          {socialLinks.map((social) => (
            <Magnetic key={social.label} strength={0.3}>
              {social.isEmail ? (
                <ObfuscatedContact
                  type="email"
                  value={social.href}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-subtle hover:text-primary-light"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </ObfuscatedContact>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-subtle hover:text-primary-light"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              )}
            </Magnetic>
          ))}
        </div>
      </div>
    </nav>
  );
}