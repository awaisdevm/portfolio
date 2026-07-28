// i18n/loader.ts
import type { Locale } from "./config";
import type { Dictionary } from "./types";

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./locales/en.json"),
  ur: () => import("./locales/ur.json"),
  de: () => import("./locales/de.json"),
  ar: () => import("./locales/ar.json"),
  fr: () => import("./locales/fr.json"),
  es: () => import("./locales/es.json"),
  ja: () => import("./locales/ja.json"),
  tr: () => import("./locales/tr.json"),
};

export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await loaders[locale]();
  return mod.default as Dictionary;
}