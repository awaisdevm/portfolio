'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Image as ImageIcon, Tags, MonitorSmartphone, LogOut, Menu, X, AppWindow } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

const navItems = [
  { name: 'Dashboard', href: '/wallpaper/admin', icon: LayoutDashboard },
  { name: 'Apps', href: '/wallpaper/admin/apps', icon: AppWindow },
  { name: 'Wallpapers', href: '/wallpaper/admin/wallpapers', icon: ImageIcon },
  { name: 'Categories', href: '/wallpaper/admin/categories', icon: Tags },
  { name: 'Ads Config', href: '/wallpaper/admin/ads', icon: MonitorSmartphone },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/wallpaper/admin/login')
    router.refresh()
  }

  const navContent = (
    <>
      <div className="p-6 pb-2 border-b border-white/10 m-2 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Wallpaper Admin
        </h2>
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-2 px-4 no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                  : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto m-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-accent/20 hover:text-accent transition-all duration-300 border border-transparent hover:border-accent/30"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile top bar with hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Wallpaper Admin
        </h2>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-white/10"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-out sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 w-72 h-full flex flex-col glass-strong border-r border-white/10 transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar (unchanged layout) */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col h-[calc(100vh-3rem)] glass rounded-2xl sticky top-6">
        {navContent}
      </aside>
    </>
  )
}
