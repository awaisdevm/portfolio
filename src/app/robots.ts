import { siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/*?*preview="],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
