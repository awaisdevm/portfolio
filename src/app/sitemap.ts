import { rawProjects } from "@/data";
import { siteConfig } from "@/lib/site-config";
import { locales } from "@/i18n/config";
import type { MetadataRoute } from "next";

const staticPaths = [
  "",
  "/about",
  "/services",
  "/projects",
  "/blog",
  "/testimonials",
  "/contact",
];

// Structural Fix: Variable name changed from 'path' to 'routeUrl' to avoid collision
function buildAlternates(routeUrl: string) {
  const languages = Object.fromEntries(
    locales.map((locale) => {
      const localizedPath = routeUrl === "" ? `/${locale}` : `/${locale}${routeUrl}`;
      return [locale, `${siteConfig.url}${localizedPath}`];
    })
  );

  return {
    ...languages,
    // ⚡ SEO BEST PRACTICE: Add x-default fallback to English
    "x-default": `${siteConfig.url}${routeUrl === "" ? "/en" : `/en${routeUrl}`}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. Static Routes
  const staticRoutes = locales.flatMap((locale) =>
    staticPaths.map((route) => {
      const path = route === "" ? `/${locale}` : `/${locale}${route}`;
      return {
        url: `${siteConfig.url}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: buildAlternates(route),
        },
      };
    })
  );

  // 2. Dynamic Project Routes
  const projectRoutes = locales.flatMap((locale) =>
    rawProjects.map((p) => ({
      url: `${siteConfig.url}/${locale}/projects/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: buildAlternates(`/projects/${p.slug}`),
      },
    }))
  );

  return [...staticRoutes, ...projectRoutes];
}
