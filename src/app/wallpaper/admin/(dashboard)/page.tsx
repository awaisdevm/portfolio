'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState, useMemo } from 'react'
import { ImageIcon, Download, Tag, MonitorSmartphone } from 'lucide-react'
import   StatsCard from '@/components/admin/stats-card'
import { createClient } from '@/lib/supabase/client'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ wallpapers: 0, categories: 0, ads: 0, downloads: 0 })
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    async function fetchStats() {
      const [{ count: wCount }, { count: cCount }, { count: aCount }, { data: wData }] = await Promise.all([
        supabase.from('wallpapers').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('ads_config').select('*', { count: 'exact', head: true }),
        supabase.from('wallpapers').select('download_count')
      ])

      const totalDownloads = wData?.reduce((acc, curr) => acc + (curr.download_count || 0), 0) || 0

      setStats({
        wallpapers: wCount || 0,
        categories: cCount || 0,
        ads: aCount || 0,
        downloads: totalDownloads
      })
    }
    fetchStats()
  }, [supabase])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-2">Welcome back to your wallpaper app management panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Wallpapers" value={stats.wallpapers} icon={<ImageIcon size={24} />} />
        <StatsCard title="Total Downloads" value={stats.downloads} icon={<Download size={24} />} trend="Global" />
        <StatsCard title="Categories" value={stats.categories} icon={<Tag size={24} />} />
        <StatsCard title="Ad Configs" value={stats.ads} icon={<MonitorSmartphone size={24} />} />
      </div>

      <div className="glass-strong rounded-2xl p-6 mt-8 border border-primary/20">
         <h2 className="text-xl font-bold mb-4">Quick Start</h2>
         <p className="text-gray-300">
           Navigate to <strong>Wallpapers</strong> to upload new images, or configure your Ad Networks in the <strong>Ads Config</strong> tab.
         </p>
      </div>
    </div>
  )
}
