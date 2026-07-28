// i18n/server.ts
import { cookies } from "next/headers";
import { Locale, defaultLocale, resolveLocale } from "./config";
import { createTranslator } from "./engine";
import { TranslateFn, Dictionary } from "./types";
import { loadDictionary } from "./loader"; // 👈 Use the new loader here

export async function getLocaleServer(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value;
    return resolveLocale(locale);
  } catch {
    return defaultLocale;
  }
}

export async function getDictionaryServer(locale: Locale): Promise<Dictionary> {
  try {
    return await loadDictionary(locale);
  } catch (error) {
    console.error(`Failed to load dictionary for ${locale}:`, error);
    return await loadDictionary(defaultLocale);
  }
}

export async function getTranslationServer(locale: Locale): Promise<TranslateFn> {
  const dictionary = await getDictionaryServer(locale);
  const fallback = locale !== defaultLocale ? await getDictionaryServer(defaultLocale) : undefined;

  return createTranslator(dictionary, fallback);
}