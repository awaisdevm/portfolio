"use client";

import Image from "next/image";
import type { Project } from "@/features/projects/data";
import GenericCard, {
  type CardAction,
  type CardBadge,
} from "@/components/ui/PreviewCard";
import {
  AppStoreIcon,
  ArrowUpRightIcon,
  PlayStoreIcon,
  SmartphoneIcon,
} from "@/components/icons/icons";

interface ProjectGridCardProps {
  project: Project;
  labels: {
    ctaPlayStore: string;
    ctaAppStore: string;
    ctaDetails: string;
  };
  priority?: boolean;
}

export default function ProjectGridCard({
  project,
  labels,
  priority = false,
}: ProjectGridCardProps) {
  const themeColor = project.themeColor || "var(--color-primary, #3b82f6)";

  const media = project.image ? (
    <div className="relative flex h-full w-full items-center justify-center p-6">
      {/* 1. Subtle Glow in the background */}
      <div
        className="pointer-events-none absolute h-28 w-28 rounded-full opacity-30 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-50"
        style={{ backgroundColor: themeColor }}
        aria-hidden="true"
      />

      {/* 2. Light Tinted Glass Container for Maximum Logo Visibility */}
      <div 
        className="relative z-10 flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-slate-800/80 p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-500 group-hover:scale-105 group-hover:bg-slate-700/80"
        style={{ 
          borderColor: `${themeColor}50`,
          boxShadow: `0 8px 24px -6px ${themeColor}25`
        }}
      >
        {/* Soft White Inset Highlight to Lift Dark Logos */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 to-transparent opacity-80" />

        <Image
          src={project.image}
          alt={project.slug || "Project Logo"}
          width={96}
          height={96}
          priority={priority}
          className="relative z-10 h-full w-full object-contain brightness-110 contrast-105 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  ) : (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-border bg-surface-sunken shadow-inner backdrop-blur-md">
        <SmartphoneIcon size={40} className="text-primary/60" />
      </div>
    </div>
  );

  const badges: CardBadge[] = [
    { text: project.platform, variant: "primary" },
    { text: project.category, variant: "secondary" },
  ];

  const tags = project.tech.slice(0, 4).map((techItem) => ({ text: techItem }));
  const actions: CardAction[] = [];
  const storeIconStyle = "h-3.5 w-3.5 shrink-0";

  const playStoreUrl = [project.url, project.iosUrl].find((link) =>
    link?.includes("play.google.com")
  ) ?? null;

  const appStoreUrl = [project.iosUrl, project.url].find((link) =>
    link?.includes("apps.apple.com")
  ) ?? null;

  if (project.isOnPlayStore && playStoreUrl) {
    actions.push({
      label: labels.ctaPlayStore,
      href: playStoreUrl,
      isExternal: true,
      variant: "primary",
      icon: <PlayStoreIcon className={storeIconStyle} aria-hidden="true" />,
    });
  }

  if (project.isOnAppStore && appStoreUrl) {
    actions.push({
      label: labels.ctaAppStore,
      href: appStoreUrl,
      isExternal: true,
      variant: actions.length === 0 ? "primary" : "secondary",
      icon: <AppStoreIcon className={storeIconStyle} aria-hidden="true" />,
    });
  }

  const projectDetailHref = `/projects/${project.slug}`;

  if (actions.length === 0) {
    actions.push({
      label: labels.ctaDetails,
      href: projectDetailHref,
      isExternal: false,
      variant: "secondary",
      icon: <ArrowUpRightIcon className={storeIconStyle} aria-hidden="true" />,
    });
  }

  return (
    <GenericCard
      href={projectDetailHref}
      title={project.title || project.slug.replace("-", " ").toUpperCase()}
      summary={project.summary}
      media={media}
      badges={badges}
      tags={tags}
      actions={actions}
    />
  );
}