"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { useTranslations } from "next-intl";
import data from "@/data/personal-data.json";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import { getGitHubStatsAction, type GitHubStats } from "../services/githubService";
import type { Stats } from "../types";

interface AboutBioCardProps {
  stats: Stats;
  tagline?: string;
  availability?: string;
}

export default function AboutBioCard({ stats, tagline, availability }: AboutBioCardProps) {
  const t = useTranslations();

  const [githubStats, setGithubStats] = useState<GitHubStats & { loading: boolean }>({
    followers: 0,
    stars: 0,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;
    getGitHubStatsAction(data.usernames.github).then((res) => {
      if (!isMounted) return;
      setGithubStats({
        ...res,
        loading: false,
      });
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const finalTagline =
    !tagline || tagline === "about.roleVal" || tagline === "about.role"
      ? t("about.roleVal") || "Mobile App Developer"
      : tagline;

  const finalAvailability =
    !availability || availability === "about.availability"
      ? t("about.availability") || "Available for freelance"
      : availability;

  const statEntries = [
    { label: t("about.stats.experience"), value: stats.yearsExperience },
    { label: t("about.stats.completed"), value: stats.projectsCompleted },
    { label: t("about.stats.satisfied"), value: stats.clientsSatisfied },
    { label: t("about.stats.stores"), value: stats.appsOnStores },
  ];

  const resumeHref = "/resume.pdf";

  return (
    <div 
      className="group relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-2xl 
                 border border-white/10 border-t-white/25 
                 bg-gradient-to-b from-white/[0.08] to-white/[0.02] 
                 p-6 sm:p-7 backdrop-blur-sm sm:backdrop-blur-md 
                 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
                 transition-all duration-300 hover:border-primary/50 
                 hover:from-white/[0.12] hover:to-white/[0.04] 
                 [content-visibility:auto]"
    >
      <div
        className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-primary/15 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-md">
            <Image
              src="/brand/dev-pic.webp"
              alt={siteConfig.name}
              width={56}
              height={56}
              className="h-full w-full object-cover object-top"
              priority
              fetchPriority="high"
            />
          </div>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-light backdrop-blur-md">
            {finalAvailability}
          </span>
        </div>

        <h2 className="font-display text-2xl font-bold text-heading">
          {siteConfig.name}
        </h2>
        <p className="mt-1 text-sm text-muted">{finalTagline}</p>

        <dl className="mt-5 flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
            <dt className="text-muted">{t("about.infoTitle")}</dt>
            <dd className="font-medium text-heading">
              {t("about.infoLocation")}
            </dd>
          </div>
          <div className="flex justify-between gap-4 pt-1">
            <dt className="text-muted">{t("about.infoFocus")}</dt>
            <dd className="font-medium text-heading">
              {t("about.infoFocusVal")}
            </dd>
          </div>
        </dl>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
        {statEntries.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
          >
            <p className="font-display text-xl font-bold text-heading">{s.value}</p>
            <p className="mt-1 text-xs text-muted/90">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-auto flex w-full flex-col pt-6">
        <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <GithubIcon className="shrink-0 text-base text-primary-light" />
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <div>
                  <p className="font-mono text-xs font-bold leading-none text-heading">
                    {githubStats.loading ? "..." : githubStats.followers}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">
                    {t("about.githubFollowers") || "Followers"}
                  </p>
                </div>
                <span className="font-mono text-xs text-muted/40">·</span>
                <div>
                  <p className="font-mono text-xs font-bold leading-none text-heading">
                    {githubStats.loading ? "..." : `${githubStats.stars}★`}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">
                    {t("about.githubStars") || "Stars"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <LinkedinIcon className="shrink-0 text-base text-primary-light" />
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold leading-none text-heading">
               {stats.followers}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted">
                {t("about.linkedinConnections") || "Connections"}
              </p>
            </div>
          </div>
        </div>

        <a
          href={resumeHref}
          target="_blank"
          rel="noreferrer"
          className="btn-primary group mt-5 flex w-full items-center justify-center gap-2"
        >
          <DownloadIcon
            size={14}
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
          {t("about.downloadCv") || "Download CV / Resume"}
        </a>
      </div>
    </div>
  );
}