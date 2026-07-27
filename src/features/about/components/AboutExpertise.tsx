"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/i18n/i18n-client";
import {
  AndroidIcon,
  FlutterIcon,
  LanguageIcon,
  StackOutlinedIcon,
  ToolIcon,
} from "@/components/icons/icons";
import type { ExpertiseGroup } from "../types";

interface AboutExpertiseProps {
  expertiseGroups: ExpertiseGroup[];
}

const getGroupIcon = (label: string) => {
  const cleanLabel = label.toLowerCase();
  const iconProps = {
    className: "shrink-0 text-sm text-primary-light",
    "aria-hidden": true,
  };

  if (cleanLabel.includes("lang") || cleanLabel.includes("coding")) {
    return <LanguageIcon {...iconProps} />;
  }
  if (cleanLabel.includes("multi") || cleanLabel.includes("kmp") || cleanLabel.includes("cross")) {
    return <StackOutlinedIcon {...iconProps} />;
  }
  if (cleanLabel.includes("flutter")) {
    return <FlutterIcon {...iconProps} />;
  }
  if (cleanLabel.includes("arch") || cleanLabel.includes("design")) {
    return <StackOutlinedIcon {...iconProps} />;
  }
  if (cleanLabel.includes("tool") || cleanLabel.includes("env")) {
    return <ToolIcon {...iconProps} />;
  }

  return <AndroidIcon {...iconProps} />;
};

export default function AboutExpertise({ expertiseGroups }: AboutExpertiseProps) {
  const { translate } = useI18n();

  return (
    <div className="flex h-full flex-col justify-between pt-1">
      <div className="mb-6">
        <SectionHeader
          eyebrow={translate("about.expertiseTitle")}
          title={translate("about.expertiseSubtitle")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {expertiseGroups.map((group) => (
          <div
            key={group.label}
            className="group relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-2xl 
                       border border-white/10 border-t-white/25 
                       bg-gradient-to-b from-white/[0.08] to-white/[0.02] 
                       p-5 backdrop-blur-sm sm:backdrop-blur-md 
                       shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
                       transition-all duration-300 hover:-translate-y-0.5 
                       hover:border-primary/50 hover:from-white/[0.12] hover:to-white/[0.04] 
                       [content-visibility:auto]"
          >
            {/* Liquid Glow Accent */}
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-xl opacity-50 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            {/* Header: Icon + Category */}
            <div className="relative z-10 flex items-center gap-2 border-b border-white/10 pb-2.5">
              {getGroupIcon(group.label)}
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                {group.label}
              </h3>
            </div>

            {/* Tag Pills */}
            <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item, itemIdx) => (
                <span
                  key={`${group.label}-${item}-${itemIdx}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium text-foreground transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}