import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavProvider } from "@/app/nav-context";
import { Header } from "@/components/sections/header-section";
import ClientLayout from "@/components/client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Mobile App Developer Portfolio',
  icons: {
    icon: '/fav-icons.png',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "Person",
      "name": "Muhammad Awais",
      "jobTitle": "Senior Software Engineer",
      "url": "https://devawais.com",
      "sameAs": [
        "https://linkedin.com/in/awaisdevm",
        "https://github.com/awaisdevm" 
      ],
      "knowsAbout": [
        "Android Development",
        "Mobile Application Development",
        "iOS Development",
        "Flutter",
        "Kotlin",
        "Dart",
        "Jetpack Compose",
        "Hilt",
        
      ]
    }),
  }}
/>
      </head>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950"
        >

          <NavProvider>
            <Header />
            <ClientLayout>{children}</ClientLayout>
          </NavProvider>
        </div>
      </body>
    </html>
  );
}
