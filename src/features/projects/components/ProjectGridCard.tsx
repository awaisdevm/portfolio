
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

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface ProjectGridCardProps {
  project: Project;
  labels: {
    ctaPlayStore: string;
    ctaAppStore: string;
    ctaDetails: string;
  };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ProjectGridCard({
  project,
  labels,
}: ProjectGridCardProps) {

  const media = project.image ? (
    <div className="relative flex h-full w-full flex-col items-center justify-center pb-4 pt-8">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative z-10 h-32 w-32 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={project.image}
          alt={project.altText}
          fill
          className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
          sizes="128px"
        />
      </div>
    </div>
  ) : (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center pb-4 pt-8"
    >
      <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-border/20 bg-surface-sunken/40 shadow-inner backdrop-blur-sm">
        <SmartphoneIcon size={40} className="opacity-40 text-primary" />
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


  const playStoreUrl =
    [project.url, project.iosUrl].find((link) =>
      link?.includes("play.google.com")
    ) ?? null;

  const appStoreUrl =
    [project.iosUrl, project.url].find((link) =>
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
      title={project.title}
      summary={project.summary}
      media={media}
      badges={badges}
      tags={tags}
      actions={actions}
    />
  );
}