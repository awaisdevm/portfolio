'use client'
import { useState, useEffect, useCallback } from 'react'
import WallpaperForm from '@/components/admin/wallpaper-form'
import WallpaperTable from '@/components/admin/wallpaper-table'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function WallpapersPage() {
  const [wallpapers, setWallpapers] = useState<any[]>([])
  const supabase = createClient()

  const fetchWallpapers = useCallback(async () => {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
    if (!error && data) setWallpapers(data)
  }, [supabase])

  useEffect(() => {
    fetchWallpapers()
  }, [fetchWallpapers])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this wallpaper? (This will not delete the storage files immediately)')) return
    const { error } = await supabase.from('wallpapers').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete')
    } else {
      toast.success('Deleted successfully')
      fetchWallpapers()
    }
  }

  const handleUpdate = async (id: string, updates: any) => {
      // Optimistic UI update
      setWallpapers(prev => prev.map(wp => wp.id === id ? { ...wp, ...updates } : wp))
      const { error } = await supabase.from('wallpapers').update(updates).eq('id', id)
      if (error) {
         toast.error(error.message)
         fetchWallpapers() // revert to server state
      }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Wallpaper Management
        </h1>
        <p className="text-gray-400 mt-2">Upload and manage your wallpapers here.</p>
      </div>

      <WallpaperForm onSuccess={fetchWallpapers} />

      <div className="glass-strong rounded-2xl p-6 border border-white/10">
        <h3 className="text-xl font-bold mb-6">Gallery Archive</h3>
        <WallpaperTable wallpapers={wallpapers} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}
