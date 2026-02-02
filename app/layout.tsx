import './globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Mobile App Developer Portfolio',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fav-icons.svg" />
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

      <body className="bg-background text-foreground  transition-all  duration-500">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
