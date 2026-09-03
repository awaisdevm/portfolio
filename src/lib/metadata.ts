import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageMetaDefaults } from "./site-config";
import { buildSharedFields } from "./seo";
import { locales, Locale } from "@/i18n/config";

export async function generatePageMetadata(
    locale: string,
    pageKey: keyof typeof pageMetaDefaults
): Promise<Metadata> {
    const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const config = pageMetaDefaults[pageKey];
    const t = await getTranslations({ locale: resolvedLocale });
    
    const titleKey = `seo.${config.keyPrefix}.title`;
    const descKey = `seo.${config.keyPrefix}.description`;

    let title = "";
    let description = "";
    try {
        title = t(titleKey);
    } catch {
        title = "";
    }
    try {
        description = t(descKey);
    } catch {
        description = "";
    }

    const path = config.slug === "home" ? "" : `/${config.slug}`;

    return {
        ...buildSharedFields(resolvedLocale, path, title, description),
        title,
    };
}