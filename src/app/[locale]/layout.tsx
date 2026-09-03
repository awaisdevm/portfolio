import { NextIntlClientProvider } from "next-intl";
import "@/styles/globals.css";

import SchemaMarkup from "@/components/seo/SchemaMarkup";
import Header from "@/components/layout/Header";
import CTASection from "@/components/layout/CTASection";
import Footer from "@/components/layout/Footer";

import type { Metadata } from "next";
import { fontClasses } from "@/lib/fonts";
import { getMetadata, getCombinedSchemaData, rtlLocales } from "@/lib/seo";
import { Locale, locales, defaultLocale } from "@/i18n/config";
import { FramerMotionProvider } from "@/components/providers/FramerMotionProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
  const { locale } = await params;
  const messages = await import("next-intl/server").then(mod => mod.getMessages({ locale }));
  const isRtl = rtlLocales.includes(locale as Locale);

  const homeDataMock = {
    contactPath: `/${locale}/contact`,
    projectsPath: `/${locale}/projects`,
  };

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${fontClasses} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <SchemaMarkup type="Person" data={getCombinedSchemaData()} />
      </head>
      <body className="relative flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <FramerMotionProvider>
            <Analytics />
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-radial-glow opacity-30" />
            <Header />
            <main className="flex-grow">{children}</main>
            <CTASection homeData={homeDataMock} />
            <Footer />
          </FramerMotionProvider>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}