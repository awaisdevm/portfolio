import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import { locales, Locale } from "@/i18n/config";

const localizedDefaults: Record<Locale, { title: string; description: string }> = {
    en: {
        title: `Muhammad Awais — Senior Mobile App Developer & Architect (Android, KMP, CMP, Flutter)`,
        description:
            "Senior Mobile Developer with 6+ years of engineering experience. Specialist in Native Android (Jetpack Compose), Kotlin Multiplatform (KMP), Compose Multiplatform (CMP), Flutter, and Clean Architecture.",
    },
    ur: {
        title: `محمد اویس — سینئر موبائل ایپ ڈویلپر (اینڈرائیڈ، KMP، CMP، فلٹر)`,
        description:
            "محمد اویس (Devawais) — 6+ سالہ تجربہ کار سینئر موبائل ایپ ڈویلپر اور آرکیٹیکٹ۔ اینڈرائیڈ، فلٹر، کوٹلن ملٹی پلیٹ فارم (KMP) اور کمپوز ملٹی پلیٹ فارم (CMP) کے ماہر۔",
    },
};

const ogLocaleMap: Record<Locale, string> = {
    en: "en_US",
    ur: "ur_PK",
};

export const rtlLocales: Locale[] = ["ur"];

export function buildSharedFields(locale: Locale, path: string, title: string, description: string): Metadata {
    const languageAlternates = Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])
    );

    return {
        metadataBase: new URL(siteConfig.url),
        description,
        alternates: {
            canonical: `${siteConfig.url}/${locale}${path}`,
            languages: {
                ...languageAlternates,
                "x-default": `${siteConfig.url}/${defaultLocaleFallback()}${path}`,
            },
        },
        openGraph: {
            type: "website",
            url: `${siteConfig.url}/${locale}${path}`,
            title,
            description,
            siteName: "Muhammad Awais — Senior Mobile Developer Portfolio",
            locale: ogLocaleMap[locale],
            images: [
                {
                    url: `${siteConfig.url}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteConfig.url}/og-image.png`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
            },
        },
        icons: {
            icon: "/favicon.svg",
        },
        other: {
            "color-scheme": "dark only",
        },
    };
}

function defaultLocaleFallback() {
    return "en";
}

export function getMetadata(locale: string): Metadata {
    const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const { title, description } = localizedDefaults[resolvedLocale];

    // ⚡ SEO & GEO HIGH-INTENT KEYWORDS: Optimized for Google SERPs, Perplexity & SearchGPT
    const advancedKeywords = [
        "Muhammad Awais", "Awais", "Devawais", "devawais-official", "awaisdevm",
        "Mobile Dev", "Mobile Developer", "Senior Mobile Developer", "Mobile App Architect",
        "Android Developer", "Senior Android Developer", "Kotlin Multiplatform", "KMP Developer",
        "Compose Multiplatform", "CMP Developer", "Flutter Developer", "Senior Flutter Developer",
        "Flutter Expert", "Clean Architecture", "MVI Architecture", "Jetpack Compose",
        "Agora SDK Integration", "IoT Hardware Integration", "Telehealth App Developer",
        "FinTech App Developer", "Android Developer Lahore", "Mobile Consultant Pakistan"
    ];

    return {
        ...buildSharedFields(resolvedLocale, "", title, description),
        title,
        keywords: advancedKeywords,
    };
}

// ⚡ HIGH SEO & GEO OPTIMIZATION: Schema.org Knowledge Graph Generator for Google & AI Engines
export const getCombinedSchemaData = () => {
    return [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Muhammad Awais — Mobile App Developer & Multiplatform Architect",
            "alternateName": ["Devawais", "awaisdevm", "Muhammad Awais", "devawais-official"],
            "url": siteConfig.url,
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${siteConfig.url}/?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Muhammad Awais",
            "alternateName": ["Devawais", "awaisdevm", "Awais", "devawais-official"],
            "jobTitle": "Senior Mobile App Developer & Architect",
            "url": siteConfig.url,
            "email": siteConfig.email,
            "image": `${siteConfig.url}/profile.jpg`,
            "gender": "Male",
            "description": "Senior Mobile App Developer with 6+ years of engineering experience specializing in Native Android, Kotlin Multiplatform (KMP), Compose Multiplatform (CMP), Flutter, and Clean Architecture.",
            "nationality": {
                "@type": "Country",
                "name": "Pakistan"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lahore",
                "addressRegion": "Punjab",
                "addressCountry": "Pakistan"
            },
            "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "University of South Asia",
                "address": "Lahore, Pakistan"
            },
            "knowsAbout": [
                "Mobile App Architecture",
                "Native Android Development",
                "Kotlin Multiplatform (KMP)",
                "Compose Multiplatform (CMP)",
                "Flutter & Dart",
                "Jetpack Compose",
                "Clean Architecture",
                "MVI & MVVM Patterns",
                "Agora SDK & Real-Time Telehealth",
                "IoT & Medical Hardware Driver Integration",
                "FinTech & Payment Gateways",
                "Kotlin",
                "Java",
                "CI/CD Automation & Bitbucket/GitHub Pipelines"
            ],
            "worksFor": [
                { "@type": "Organization", "name": "QuickGem Solutions" },
                { "@type": "Organization", "name": "Egora Pvt Ltd" },
                { "@type": "Organization", "name": "Healthwire Pvt Ltd" },
                { "@type": "Organization", "name": "DonGamers" },
                { "@type": "Organization", "name": "Netroots Technologies LLC" }
            ],
            "sameAs": [
                siteConfig.socialBaseUrls.github && `${siteConfig.socialBaseUrls.github}${siteConfig.usernames.github}`,
                siteConfig.socialBaseUrls.linkedin && `${siteConfig.socialBaseUrls.linkedin}${siteConfig.usernames.linkedin}`,
                siteConfig.socialBaseUrls.twitter && `${siteConfig.socialBaseUrls.twitter}${siteConfig.usernames.twitter}`
            ].filter((url): url is string => Boolean(url)),
        }
    ];
};