import { cookies } from "next/headers";
import { Locale, defaultLocale, translations, resolveLocale } from "./config";
import { createTranslator } from "./engine";
import { TranslateFn, Dictionary } from "./types";

export async function getLocaleServer(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value;
    return resolveLocale(locale);
  } catch {
    return defaultLocale;
  }
}

export function getDictionaryServer(locale: Locale): Dictionary {
  return (translations[locale] ?? translations[defaultLocale]) as Dictionary;
}

export function getTranslationServer(locale: Locale): TranslateFn {
  const currentLocale = translations[locale] ? locale : defaultLocale;
  const dictionary = (translations[currentLocale] ?? {}) as Dictionary;
  const fallback = currentLocale !== defaultLocale 
    ? ((translations[defaultLocale] ?? {}) as Dictionary) 
    : undefined;

  return createTranslator(dictionary, fallback);
}