'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Image as ImageIcon, Tags, MonitorSmartphone, LogOut, Settings } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { name: 'Dashboard', href: '/wallpaper/admin', icon: LayoutDashboard },
  { name: 'Wallpapers', href: '/wallpaper/admin/wallpapers', icon: ImageIcon },
  { name: 'Categories', href: '/wallpaper/admin/categories', icon: Tags },
  { name: 'Ads Config', href: '/wallpaper/admin/ads', icon: MonitorSmartphone },
  { name: 'Settings', href: '/wallpaper/admin/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/wallpaper/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col h-[calc(100vh-3rem)] glass rounded-2xl sticky top-6">
      <div className="p-6 pb-2 border-b border-white/10 m-2">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Wallpaper Admin
        </h2>
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
    </aside>
  )
}
