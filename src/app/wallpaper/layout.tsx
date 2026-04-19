import "@/app/globals.css"
import type { Metadata } from 'next'
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: 'Wallpaper App',
}

export default function WallpaperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 antialiased">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/20 blur-[120px]" />
      </div>
      <div className="relative z-10 w-full min-h-screen flex flex-col">
         {children}
      </div>
      <Toaster position="top-right" toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
      }} />
    </div>
  )
}
