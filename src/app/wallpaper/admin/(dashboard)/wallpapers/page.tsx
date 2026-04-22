'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback, useMemo } from 'react'
import WallpaperForm from '@/components/admin/wallpaper-form'
import WallpaperTable from '@/components/admin/wallpaper-table'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { WallpaperWithCategory } from '@/lib/wallpaper/types'

export default function WallpapersPage() {
  const [wallpapers, setWallpapers] = useState<WallpaperWithCategory[]>([])
  const [categories, setCategories] = useState<{id: string, name: string}[]>([])
  const supabase = useMemo(() => createClient(), [])

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('categories').select('id, name').eq('is_active', true).order('name')
    if (data) setCategories(data)
  }, [supabase])

  const fetchWallpapers = useCallback(async () => {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
    if (!error && data) setWallpapers(data)
  }, [supabase])

  useEffect(() => {
    fetchWallpapers()
    fetchCategories()
  }, [fetchWallpapers, fetchCategories])

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

  const handleUpdate = async (id: string, updates: Partial<WallpaperWithCategory>) => {
      // Optimistic UI update
      setWallpapers(prev => prev.map(wp => {
        if (wp.id === id) {
          const updatedWp = { ...wp, ...updates }
          // If category_id was updated, also update the expanded category name for immediate UI feedback
          if (updates.category_id !== undefined) {
             const newCat = categories.find(c => c.id === updates.category_id)
             updatedWp.categories = newCat ? { name: newCat.name } : undefined
          }
          return updatedWp
        }
        return wp
      }))

      // 1. Call API instead of direct DB to avoid RLS issues
      try {
        await fetch(`/wallpaper/api/wallpapers/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        })

        toast.success('Updated successfully')
        fetchWallpapers() // Re-sync to ensure everything is correct
      } catch (error: unknown) {
         const message = error instanceof Error ? error.message : 'Failed to update'
         toast.error(message)
         fetchWallpapers() // Rollback on error
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
        <WallpaperTable wallpapers={wallpapers} categories={categories} onDelete={handleDelete} onUpdate={handleUpdate} />
      </div>
    </div>
  )
}
