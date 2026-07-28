import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains",
    display: "swap",
});

export const fontClasses = `${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`;