"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { useI18n } from "@/i18n/i18n-client";
import { Magnetic } from "../ui/Magnetic";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import DesktopNavbar from "./DesktopNavbar";
import MobileDrawer from "./MobileDrawer";
import { MenuIcon, XIcon } from "../icons/icons";
import { Locale, locales } from "@/i18n/config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

const pathname = usePathname(); 
  const { translate, locale: contextLocale } = useI18n(); 
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious() ?? 0;
    setVisible(current < 0.05 || current - previous < 0);
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      setMobileMenuOpen(false);
    });
  }, [pathname]);

const getLocalizedHref = useMemo(() => {
  return (href: string) => {
   
    const segments = pathname.split('/');
    const activeLocale = (locales.includes(segments[1] as any) ? segments[1] : contextLocale) as Locale;

    const cleanPath = href.startsWith('/') ? href.substring(1) : href;
    
    return cleanPath ? `/${activeLocale}/${cleanPath}` : `/${activeLocale}`;
  };
}, [pathname, contextLocale, locales]);

  if (!mounted) return null;

  return (
    <header
      className={cn(
        /* CHANGED: max-w-5xl -> max-w-6xl for multi-language padding space */
        "fixed left-1/2 top-4 z-50 w-[95%] max-w-6xl -translate-x-1/2 transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="mx-auto flex h-16 w-full items-center justify-between px-2 sm:h-20 sm:px-4 lg:px-6">
        {/* BRAND LOGO */}
        <Magnetic strength={0.2}>
          <Link
            href={`/${contextLocale}`}
            className="group relative flex items-center focus:outline-none"
            aria-label={`Go to ${siteConfig.name} home`}
          >
            <div
              className="h-8 w-20 bg-gradient-to-r from-primary via-accent-dark to-accent [mask-image:url('/brand/ma-logo.svg')] [mask-position:center_left] [mask-repeat:no-repeat] [mask-size:contain] sm:h-10 sm:w-28"
              aria-hidden="true"
            />
          </Link>
        </Magnetic>

        {/* DESKTOP NAVBAR */}
        <DesktopNavbar
          key={`desktop-nav-${contextLocale}`}
          getLocalizedHref={getLocalizedHref}
          translate={translate}
        />

        {/* MOBILE TOGGLE BUTTON */}
        <Button
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          variant="ghost"
          size="icon"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-surface/60 text-muted backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-surface hover:text-heading md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <XIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        key={`mobile-nav-${contextLocale}`}
        isOpen={mobileMenuOpen}
        getLocalizedHref={getLocalizedHref}
        translate={translate}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}