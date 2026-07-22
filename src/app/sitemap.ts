import { rawProjects } from "@/data";
import { siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

const locales = ["en", "ur"] as const;

const staticPaths = [
  "",
  "/about",
  "/services",
  "/projects",
  "/blog",
  "/testimonials",
  "/contact",
];

// Clean path utility jo trailing slashes ko handle karegi
function buildAlternates(path: string) {
  return Object.fromEntries(
    locales.map((locale) => {
      const localizedPath = path === "" ? `/${locale}` : `/${locale}${path}`;
      return [locale, `${siteConfig.url}${localizedPath}`];
    })
  );
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