import type { Metadata } from "next";
import { getTranslationServer } from "@/i18n/i18n-server";
import { pageMetaDefaults } from "./site-config";
import { buildSharedFields } from "./seo";
import { locales, Locale } from "@/i18n/config";

export async function generatePageMetadata(
    locale: string,
    pageKey: keyof typeof pageMetaDefaults
): Promise<Metadata> {
    const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const config = pageMetaDefaults[pageKey];
    const translate =await getTranslationServer(resolvedLocale);
    
    const titleKey = `seo.${config.keyPrefix}.title`;
    const descKey = `seo.${config.keyPrefix}.description`;
    const keywordsKey = `seo.${config.keyPrefix}.keywords`;

    const title = translate(titleKey);
    const description = translate(descKey);
    const keywordsRaw = translate(keywordsKey);

    if (!title || title === titleKey) {
        console.warn(`[SEO ERROR] Missing translation: ${titleKey}`);
    }
    if (!description || description === descKey) {
        console.warn(`[SEO] Missing translation: ${descKey} for locale "${resolvedLocale}"`);
    }

    const keywords = Array.isArray(keywordsRaw)
        ? keywordsRaw
        : typeof keywordsRaw === "string" && keywordsRaw !== keywordsKey
            ? keywordsRaw.split(",").map((k) => k.trim())
            : [];

    const path = config.slug === "home" ? "" : `/${config.slug}`;

    return {
        ...buildSharedFields(resolvedLocale, path, title, description),
        title,
        keywords,
    };
}