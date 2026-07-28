"use client";

import React from "react";
import { m, type Variants } from "framer-motion";
import type { StandardPageLabels } from "@/lib/utils";
import { transformSocialLinksToOptions } from "../configs/contact-options";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";
import { ObfuscatedContact } from "@/components/ui/ObfuscatedContact";
import { MailIcon, MapPinIcon } from "@/components/icons";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { ContactFormLabels } from "../types";
import { siteConfig } from "@/lib/site-config";
import PageHeader from "@/components/ui/PageHeader";

interface ContactViewProps {
  labels: StandardPageLabels;
  location: string;
  formLabels: ContactFormLabels;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactView({ labels, location, formLabels }: ContactViewProps) {
  const allSocialOptions = transformSocialLinksToOptions() || [];

  const whatsappOption = allSocialOptions.find((opt) => {
    const val = String(opt.value || "").toLowerCase();
    const lbl = String(opt.label || "").toLowerCase();
    return val === "whatsapp" || lbl === "whatsapp";
  });

  const primaryCards = [
    {
      id: "email",
      label: formLabels.emailLabel || "Email",
      value: siteConfig.email,
      icon: MailIcon,
      isObfuscated: true,
      obfuscateType: "email" as const,
    },
    ...(whatsappOption
      ? [
          {
            ...whatsappOption,
            id: "whatsapp",
            obfuscateType: "whatsapp" as const,
          },
        ]
      : []),
    {
      id: "location",
      label: (labels as any).contact?.locationTitle || "Location",
      value: location || siteConfig.location,
      icon: MapPinIcon,
      isObfuscated: false,
      href: `https://maps.google.com/?q=${encodeURIComponent(location || siteConfig.location)}`,
    },
  ];

  const socialIconsList = allSocialOptions.filter((opt) => {
    const val = String(opt.value || "").toLowerCase();
    const lbl = String(opt.label || "").toLowerCase();
    return val !== "whatsapp" && lbl !== "whatsapp";
  });

  return (
    <SectionWrapper 
      watermarkText={labels.title || "CONTACT"} 
      className="flex min-h-[85vh] flex-col justify-center pt-24 pb-16 md:pt-4"
    >
      <div className="container-page py-4">
        {/* Top Header */}
        <PageHeader 
          eyebrow={labels.title} 
          title={labels.headerTitle} 
          description={labels.headerDesc}
        />

        {/* Form and Cards Grid */}
        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:mt-14 lg:grid-cols-12">
          
          {/* Left Panel: Primary Contact Cards & Social Profiles */}
          <m.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            {/* Primary Cards */}
            <m.div variants={containerVariants} className="grid gap-4">
              {primaryCards.map((option: any) => (
                <ContactCard
                  key={option.id || option.value}
                  option={option}
                  variants={cardVariants}
                />
              ))}
            </m.div>

            {/* Social Profiles with Optimized Mobile Tap Targets */}
            {socialIconsList.length > 0 && (
              <m.div variants={cardVariants} className="pt-2">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
                  Social Profiles
                </p>
                {/* Gap increased to 3.5 & padded for touch target compliance */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {socialIconsList.map((social) => {
                    const Icon = social.icon;
                    const key = social.value || social.label;
                    const socialName = social.label || social.value;
                    const socialHref = social.href || "#";

                    if (!Icon) return null;

                    return social.isObfuscated ? (
                      <ObfuscatedContact
                        key={key}
                        type={social.obfuscateType}
                        value={social.meta || social.value}
                        className="group flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-border/40 bg-surface/40 p-4 text-muted backdrop-blur-md transition-all duration-300 active:scale-95 hover:border-primary/50 hover:bg-surface hover:text-heading"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-elevated/80 border border-border/30 group-hover:border-primary/40 group-hover:text-primary transition-colors">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-[11px] font-medium tracking-wide capitalize group-hover:text-heading">
                          {socialName}
                        </span>
                      </ObfuscatedContact>
                    ) : (
                      <a
                        key={key}
                        href={socialHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={socialName}
                        className="group flex min-h-[68px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-border/40 bg-surface/40 p-4 text-muted backdrop-blur-md transition-all duration-300 active:scale-95 hover:border-primary/50 hover:bg-surface hover:text-heading"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-elevated/80 border border-border/30 group-hover:border-primary/40 group-hover:text-primary transition-colors">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-[11px] font-medium tracking-wide capitalize group-hover:text-heading">
                          {socialName}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </m.div>
            )}
          </m.div>

          {/* Right Panel: Form */}
          <m.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="flex justify-center lg:col-span-7 lg:justify-end"
          >
            <div className="w-full max-w-[520px]">
              <ContactForm labels={formLabels} />
            </div>
          </m.div>

        </div>
      </div>
    </SectionWrapper>
  );
}