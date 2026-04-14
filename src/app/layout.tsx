import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavProvider } from "@/app/nav-context";
import { Header } from "@/components/layout/header";
import ClientLayout from "@/components/layout/client-layout";
import portfolioData from "@/data/portfolio.json";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = "https://devawais.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: portfolioData.seo.title,
    template: `%s | ${portfolioData.profile.name}`,
  },
  description: portfolioData.seo.description,
  keywords: portfolioData.seo.keywords,
  authors: [{ name: portfolioData.profile.name, url: siteUrl }],
  creator: portfolioData.profile.name,
  icons: {
    icon: "/fav-icons.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${portfolioData.profile.name} — Portfolio`,
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    images: [
      {
        url: portfolioData.seo.ogImage,
        width: 1200,
        height: 630,
        alt: portfolioData.profile.heroImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioData.seo.title,
    description: portfolioData.seo.description,
    images: [portfolioData.seo.ogImage],
    creator: portfolioData.seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        {/* Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Person",
              name: portfolioData.profile.name,
              jobTitle: "Senior Android & Flutter Developer",
              description: portfolioData.seo.description,
              url: siteUrl,
              image: `${siteUrl}${portfolioData.profile.heroImage}`,
              telephone: portfolioData.profile.contact.phone,
              email: portfolioData.profile.contact.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lahore",
                addressCountry: "PK",
              },
              sameAs: [
                portfolioData.profile.contact.linkedin,
                portfolioData.profile.contact.github,
                siteUrl,
              ],
              worksFor: portfolioData.profile.timeline.map((job) => ({
                "@type": "Organization",
                name: job.company,
              })),
              hasOccupation: {
                "@type": "Occupation",
                name: "Senior Mobile App Developer",
                occupationLocation: {
                  "@type": "Country",
                  name: "Pakistan",
                },
                estimatedSalary: [],
                description:
                  "Senior Android Developer and Flutter Expert specializing in high-performance mobile apps for healthcare, e-sports, and enterprise platforms.",
                skills: [
                  "Android Development",
                  "Flutter",
                  "Mobile Apps",
                  "Kotlin",
                  "Dart",
                  "Jetpack Compose",
                  "Clean Architecture",
                  "Firebase",
                ],
              },
              knowsLanguage: ["Kotlin", "Dart", "Java", "TypeScript"],
              knowsAbout: [
                "Android Native Architecture",
                "Flutter Cross-Platform Development",
                "Jetpack Compose",
                "Mobile App Development",
                "Android TV Development",
                "Clean Architecture",
                "Kotlin",
                "MVVM",
                "High-Performance Mobile Ecosystems",
                "Firebase",
                "CI/CD Pipelines",
                "Real-Time Data Systems",
                "Senior Developer",
              ],
              brand: {
                "@type": "Brand",
                name: "devawais",
                url: siteUrl,
              },
            }),
          }}
        />
        {/* WebSite Schema — enables Sitelinks Search Box signal */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: `${portfolioData.profile.name} — Senior Android & Flutter Developer`,
              url: siteUrl,
              description:
                "Portfolio of Muhammad Awais — Senior Android Developer, Flutter Expert & Mobile App Architect with 6+ years building scalable mobile apps.",
              author: {
                "@type": "Person",
                name: portfolioData.profile.name,
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased`}
      >
        <div className="min-h-screen bg-background overflow-x-hidden relative text-white">
          {/* Deep atmospheric glowing orbs for ethereal effect */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/20 blur-[120px]" />
            <div className="absolute top-[30%] left-[50%] w-[30vw] h-[30vw] rounded-full bg-accent/20 blur-[120px]" />
          </div>
          <div className="relative z-10">
            <NavProvider>
              <Header />
              <main>
                <ClientLayout>{children}</ClientLayout>
              </main>
            </NavProvider>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
