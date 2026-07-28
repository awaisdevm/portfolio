// src/components/layout/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/i18n-client";
import { siteConfig, socialLinks } from "@/lib/site-config";

// ============================================================================
// TYPES
// ============================================================================
interface FooterBrandProps {
  name: string;
  tagline: string;
}

interface FooterColProps {
  title: string;
  children: React.ReactNode;
}

interface FooterSocialsProps {
  links: typeof socialLinks;
}

interface FooterMetaProps {
  copyright: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Footer() {
  const { translate } = useI18n();

  // Clean key lookups mapped directly from ui.json
  const tagline = translate("profile.title");
  const location = translate("profile.location");
  const availability = translate("profile.availability");

  const rawSpecialties = translate("footer.specialtiesList", { returnObjects: true });
  const specialties: string[] = Array.isArray(rawSpecialties)
    ? (rawSpecialties as string[])
    : [];

  const currentYear = new Date().getFullYear().toString();
  const copyrightText = translate("footer.copyright", { params: { year: currentYear }, });

  return (
    <footer className="w-full border-t border-border/30 bg-surface/40 py-12 backdrop-blur-md">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {/* 1. Brand Column */}
          <FooterBrand name={siteConfig.name} tagline={tagline} />

          {/* 2. Specialties Column */}
          {specialties.length > 0 && (
            <FooterCol title={translate("footer.specialties")}>
              {specialties.map((specialty) => (
                <li key={specialty} className="leading-relaxed text-muted">
                  {specialty}
                </li>
              ))}
            </FooterCol>
          )}

          {/* 3. Contact & Social Column */}
          <FooterCol title={translate("footer.getInTouch")}>
            <li className="mb-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-[32px] items-center text-sm text-foreground transition-colors hover:text-accent-light focus-visible:underline focus-visible:outline-none"
                aria-label={`Send an email to ${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </li>

            <li className="mb-3 text-xs font-medium leading-relaxed text-muted">
              {location} — {availability}
            </li>

            <li className="block w-full">
              <FooterSocials links={socialLinks} />
            </li>
          </FooterCol>
        </div>

        {/* 4. Bottom Copyright Row */}
        <FooterMeta copyright={copyrightText} />
      </div>
    </footer>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/* 🏢 Brand Block */
function FooterBrand({ name, tagline }: FooterBrandProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Link
        href="/"
        className="group relative mb-1 h-14 w-14 cursor-pointer md:h-16 md:w-16"
        aria-label={`Go to ${name} homepage`}
      >
        <div className="absolute inset-0 rotate-45 rounded-lg bg-gradient-to-r from-primary via-accent-dark to-accent shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:rotate-90" />
        <div className="absolute inset-2 flex rotate-45 items-center justify-center rounded-lg bg-surface transition-transform duration-500 group-hover:rotate-0">
          <div
            className="h-8 w-8 -rotate-45 bg-heading transition-transform duration-500 group-hover:rotate-0"
            style={{
              maskImage: 'url("/brand/ma-logo.svg")',
              WebkitMaskImage: 'url("/brand/ma-logo.svg")',
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />
        </div>
      </Link>
      <h3 className="font-display text-xl font-bold italic uppercase leading-none tracking-tight text-heading md:text-2xl">
        {name}
      </h3>
      <p className="max-w-[200px] font-mono text-xs font-semibold uppercase leading-relaxed tracking-wider text-muted">
        {tagline}
      </p>
    </div>
  );
}

/* 📦 Reusable Footer Column Wrapper */
function FooterCol({ title, children }: FooterColProps) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="flex flex-col gap-1.5 text-sm font-medium">{children}</ul>
    </div>
  );
}

/* 🌐 Clean Social Links */
function FooterSocials({ links }: FooterSocialsProps) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-start gap-2.5">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href || "#"}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visit my ${label} profile`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-surface/60 text-muted transition-all duration-300 hover:border-accent/40 hover:bg-surface hover:text-accent-light hover:shadow-md"
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
}

/* 📝 Meta copyrights footer */
function FooterMeta({ copyright }: FooterMetaProps) {
  return (
    <div className="mt-10 w-full border-t border-border/20 pt-6 text-xs text-muted">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-left text-xs tracking-wide text-muted">
          {copyright}
        </p>
      </div>
    </div>
  );
}