'use client'
import { useState, useEffect, useMemo } from 'react'
import { Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'

interface Category {
  id: string
  name: string
}

export default function WallpaperForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tags, setTags] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [fullRes, setFullRes] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const supabase = useMemo(() => createClient(), [])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await supabase.from('categories').select('id, name').eq('is_active', true).order('name')
      if (data) setCategories(data)
    }
    loadCategories()
  }, [supabase])

  // Create preview URLs
  const thumbPreview = thumbnail ? URL.createObjectURL(thumbnail) : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!thumbnail || !fullRes || !title) return toast.error('Required fields missing')
    
    setLoading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category_id', categoryId || '')
    const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean)
    formData.append('tags', JSON.stringify(parsedTags))
    formData.append('is_featured', String(isFeatured))
    formData.append('thumbnail', thumbnail)
    formData.append('full_res', fullRes)

    try {
      const res = await fetch('/wallpaper/api/wallpapers/upload', {
        method: 'POST',
        body: formData
      })
      if (!res.ok) {
         const { error } = await res.json()
         throw new Error(error || 'Upload failed')
      }
      toast.success('Wallpaper uploaded successfully')
      
      setTitle('')
      setCategoryId('')
      setTags('')
      setIsFeatured(false)
      setThumbnail(null)
      setFullRes(null)
      onSuccess()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-strong p-6 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Upload New Wallpaper</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
            <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" placeholder="e.g. Neon Cyberpunk City" />
            </div>
            <div>
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            </div>
            <div>
            <label className="block text-sm text-gray-400 mb-1">Tags</label>
            <input value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50" placeholder="neon, city, dark (comma separated)" />
            </div>
            <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="featured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-4 h-4 rounded bg-black/20 border-white/10 text-primary" />
            <label htmlFor="featured" className="text-sm font-medium">Mark as Featured Banner</label>
            </div>
        </div>

        <div className="space-y-4">
            <div className="bg-black/20 p-4 rounded-xl border border-white/10 text-center relative overflow-hidden group">
               <label className="block text-sm font-medium text-gray-400 mb-3">Thumbnail Image</label>
               {thumbPreview ? (
                   <div className="w-32 h-32 mx-auto relative rounded-lg overflow-hidden border border-white/20 mb-3">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={thumbPreview} alt="Preview" className="object-cover w-full h-full" />
                   </div>
               ) : (
                 <div className="w-32 h-32 mx-auto bg-white/5 rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center mb-3">
                     <Upload size={24} className="text-gray-500 mb-2" />
                     <span className="text-xs text-gray-500">Pick image</span>
                 </div>
               )}
               <input type="file" accept="image/*" required onChange={e => setThumbnail(e.target.files?.[0] || null)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer cursor-pointer text-gray-400" />
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/10">
               <label className="block text-sm font-medium text-gray-400 mb-3">Full-Resolution Image</label>
               <input type="file" accept="image/*" required onChange={e => setFullRes(e.target.files?.[0] || null)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-secondary/20 file:text-secondary hover:file:bg-secondary/30 file:cursor-pointer cursor-pointer text-gray-400" />
               <p className="text-xs text-gray-500 mt-2">This is the high quality file users will download.</p>
            </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-white/5 flex gap-3">
        <button disabled={loading} type="submit" className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/80 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ml-auto shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:opacity-50">
          <Upload size={18} />
          {loading ? 'Uploading safely to Cloud...' : 'Upload Wallpaper'}
        </button>
      </div>
    </form>
  )
}
