"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Locale, isLocale }  from "./config";
import { createTranslator } from "./engine";
import { TranslateFn, Dictionary } from "./types";

interface I18nContextType {
    locale: Locale;
    isPending: boolean;
    changeLocale: (newLocale: Locale) => void;
    translate: TranslateFn;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children, initialLocale, pageDictionary }: {
    children: React.ReactNode;
    initialLocale: Locale;
    pageDictionary: Dictionary;
}) {
    const [locale, setLocale] = useState<Locale>(initialLocale);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
        const cookieLocale = match?.[1];
        if (isLocale(cookieLocale) && cookieLocale !== locale) {
            setLocale(cookieLocale);
        }
    }, [initialLocale, locale]);

    function changeLocale(newLocale: Locale) {
        if (newLocale === locale) return;
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        setLocale(newLocale);
        
        if (typeof window !== "undefined") {
            const pathname = window.location.pathname;
            const segments = pathname.split("/");
            if (segments.length >= 2 && isLocale(segments[1])) {
                segments[1] = newLocale;
                const newPath = segments.join("/") || `/${newLocale}`;
                router.push(newPath);
                return;
            }
        }
        startTransition(() => { router.refresh(); });
    }

    const translate = createTranslator(pageDictionary);

    return (
        <I18nContext.Provider value={{ locale, isPending, changeLocale, translate }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) throw new Error("useI18n must be used within an I18nProvider");
    return context;
}