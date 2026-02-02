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
      </head>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div
          className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"
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
