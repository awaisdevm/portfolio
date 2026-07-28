import "@/styles/globals.css";

import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Header from "@/components/layout/Header";

import dynamic from "next/dynamic";

import type { Metadata } from "next";
import { fontClasses } from "@/lib/fonts";
import { getMetadata, getCombinedSchemaData, rtlLocales } from "@/lib/seo";
import { I18nProvider } from "@/i18n/i18n-client";
import { getDictionaryServer } from "@/i18n/i18n-server";
import { Locale, locales, defaultLocale } from "@/i18n/config";
// 1. Import FramerMotionProvider
import { FramerMotionProvider } from "@/components/providers/FramerMotionProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Dynamically imported footer sections with SSR preserved
const CTASection = dynamic(() => import("@/components/sections/CTASection"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getMetadata(locale);
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  const pageDictionary = await getDictionaryServer(locale);
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";
  const schemaData = getCombinedSchemaData();

  const homeDataMock = {
    contactPath: `/${locale}/contact`,
    projectsPath: `/${locale}/projects`,
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontClasses} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/brand/dev-pic.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <SchemaMarkup type="Person" data={schemaData} />
      </head>
      <body className="relative flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <I18nProvider initialLocale={locale} pageDictionary={pageDictionary}>
          {/* 2. Wrap app with FramerMotionProvider */}
          <FramerMotionProvider>
            {/* Google Analytics & Performance Telemetry */}
            <Analytics />

            {/* Ambient Radial Backdrop Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 -z-10 bg-radial-glow opacity-30"
            />

            {/* Primary Header Navigation */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-grow">{children}</main>

            {/* Global Call to Action */}
            <CTASection homeData={homeDataMock as any} />

            {/* Global Footer */}
            <Footer />
          </FramerMotionProvider>
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}