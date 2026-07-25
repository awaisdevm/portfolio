import ar from "./locales/ar";
import de from "./locales/de";
import en from "./locales/en";
import ur from "./locales/ur";
import es from "./locales/es";
import fr from "./locales/fr";
import ja from "./locales/ja";
import tr from "./locales/tr"

export const locales = ["en", "ur", "de", "ar", "fr", "es", "ja", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type TranslationDictionary = typeof en;

type DeepPartial<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export const translations: Record<Locale, DeepPartial<TranslationDictionary>> = {
    en, ur, de, ar, fr, es, ja, tr
};

export function isLocale(value: string | undefined | null): value is Locale {
    return !!value && (locales as readonly string[]).includes(value);
}

export function resolveLocale(locale: string | undefined | null): Locale {
    return isLocale(locale) ? locale : defaultLocale;
}

export function getLocaleFromHeaders(acceptLanguageHeader: string | null): Locale {
    if (!acceptLanguageHeader) return defaultLocale;

    // Header structure: "ur-PK,ur;q=0.9,en-US;q=0.8,en;q=0.7"
    const languages = acceptLanguageHeader.split(",").map((lang) => {
        const [locale] = lang.trim().split(";");
        return locale.split("-")[0]; // "ur-PK" se "ur"
    });

    for (const shortCode of languages) {
        if (isLocale(shortCode)) {
            return shortCode;
        }
    }

    return defaultLocale;
}