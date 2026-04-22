'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import DashboardCharts from '@/components/admin/dashboard-charts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Image as ImageIcon, Tags, Download, TrendingUp, Loader2, LucideIcon } from 'lucide-react'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalWallpapers: 0,
    totalCategories: 0,
    totalDownloads: 0,
    totalViews: 0
  })
  const [categoryData, setCategoryData] = useState<{ name: string, value: number }[]>([])
  const [topWallpapers, setTopWallpapers] = useState<{ name: string, downloads: number }[]>([])
  const [topViewed, setTopViewed] = useState<{ name: string, views: number }[]>([])

  const supabase = createClient()

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true)
        console.log('Fetching dashboard data...')
        
        // 1. Fetch Categories (Parallel)
        // 2. Fetch Wallpapers (Parallel)
        const [categoriesRes, wallpapersRes] = await Promise.all([
          supabase
            .from('categories')
            .select('id, name')
            .eq('is_active', true),
          supabase
            .from('wallpapers')
            .select('id, category_id, download_count, view_count, title')
        ])

        if (categoriesRes.error) console.error('Categories fetch error:', categoriesRes.error)
        if (wallpapersRes.error) console.error('Wallpapers fetch error:', wallpapersRes.error)

        const categories = categoriesRes.data || []
        const wallpapers = wallpapersRes.data || []

        // Calculate stats even if one of them is empty
        const totalDownloads = wallpapers.reduce((acc, curr) => acc + (curr.download_count || 0), 0)
        const totalViews = wallpapers.reduce((acc, curr) => acc + (curr.view_count || 0), 0)
        
        setStats({
          totalWallpapers: wallpapers.length,
          totalCategories: categories.length,
          totalDownloads,
          totalViews
        })

        // Calculate category distribution if we have both
        if (categories.length > 0) {
          const distribution = categories.map(cat => ({
            name: cat.name,
            value: wallpapers.filter(w => w.category_id === cat.id).length
          })).filter(d => d.value > 0)
          setCategoryData(distribution)
        }

        // Calculate top 5 wallpapers if we have any
        if (wallpapers.length > 0) {
          const top5Downloads = [...wallpapers]
            .sort((a, b) => (b.download_count || 0) - (a.download_count || 0))
            .slice(0, 5)
            .map(w => ({
              name: w.title || 'Untitled',
              downloads: w.download_count || 0
            }))
          setTopWallpapers(top5Downloads)

          const top5Views = [...wallpapers]
            .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
            .slice(0, 5)
            .map(w => ({
              name: w.title || 'Untitled',
              views: w.view_count || 0
            }))
          setTopViewed(top5Views)
        }
      } catch (error) {
        console.error('Unexpected error in dashboard fetch:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase])

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">
          Analytics Overview
        </h1>
        <p className="text-zinc-500 text-lg">Performance insights for your wallpaper ecosystem.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Wallpapers" 
          value={stats.totalWallpapers} 
          icon={ImageIcon} 
          description="Active assets across all categories"
          color="text-violet-500"
        />
        <StatCard 
          title="Total Downloads" 
          value={stats.totalDownloads.toLocaleString()} 
          icon={Download} 
          description="Lifetime user downloads"
          color="text-cyan-500"
        />
        <StatCard 
          title="Total Views" 
          value={stats.totalViews.toLocaleString()} 
          icon={TrendingUp} 
          description="User attention & clicks"
          color="text-amber-500"
        />
        <StatCard 
          title="Active Categories" 
          value={stats.totalCategories} 
          icon={Tags} 
          description="Content silos managed"
          color="text-emerald-500"
        />
      </div>

      {/* Charts Section */}
      <div className="min-h-[500px]">
        <DashboardCharts 
          categoryData={categoryData} 
          topWallpapers={topWallpapers} 
          topViewed={topViewed}
        />
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description: string
  color: string
}

function StatCard({ title, value, icon: Icon, description, color }: StatCardProps) {
  return (
    <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl shadow-xl hover:bg-zinc-900/60 transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-zinc-800/50 ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={20} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        <p className="text-xs text-zinc-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}
