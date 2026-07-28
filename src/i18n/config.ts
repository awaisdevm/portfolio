export const locales = ["en", "ur", "de", "ar", "fr", "es", "ja", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function resolveLocale(locale: string | undefined | null): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export function getLocaleFromHeaders(acceptLanguageHeader: string | null): Locale {
  if (!acceptLanguageHeader) return defaultLocale;

  const languages = acceptLanguageHeader.split(",").map((lang) => {
    const [locale] = lang.trim().split(";");
    return locale.split("-")[0];
  });

  for (const shortCode of languages) {
    if (isLocale(shortCode)) {
      return shortCode;
    }
  }

  return defaultLocale;
}