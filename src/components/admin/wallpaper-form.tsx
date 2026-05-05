'use client'
import { useState, useEffect, useMemo } from 'react'
import { Upload, ImageIcon, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'

interface Category {
  id: string
  name: string
}

export default function WallpaperForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState('')
  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [tags, setTags] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
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

  // Create preview URL from the main file
  const previewUrl = fullRes ? URL.createObjectURL(fullRes) : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullRes || !title) return toast.error('Please name your wallpaper and pick an image')
    
    setLoading(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category_ids', JSON.stringify(categoryIds))
    const parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean)
    formData.append('tags', JSON.stringify(parsedTags))
    formData.append('is_featured', String(isFeatured))
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
      toast.success('Success! Wallpaper and auto-thumbnail created.')
      
      setTitle('')
      setCategoryIds([])
      setTags('')
      setIsFeatured(false)
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
         <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary flex items-center gap-2">
           <ImageIcon className="text-primary" size={24} />
           Modern Wallpaper Upload
         </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN: METADATA */}
        <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1 font-medium">Wallpaper Title</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Midnight Cyberpunk" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 font-medium">Target Categories</label>
              <div className="w-full max-h-40 overflow-y-auto bg-black/20 border border-white/10 rounded-xl p-2 focus-within:border-primary/50 transition-colors space-y-1">
                  {categories.length === 0 && <span className="text-gray-500 text-sm p-2">No categories available</span>}
                  {categories.map(c => (
                    <label key={c.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        checked={categoryIds.includes(c.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCategoryIds(prev => [...prev, c.id])
                          } else {
                            setCategoryIds(prev => prev.filter(id => id !== c.id))
                          }
                        }}
                        className="w-4 h-4 rounded bg-black/20 border-white/20 text-primary accent-primary cursor-pointer"
                      />
                      <span className="text-sm text-gray-300">{c.name}</span>
                    </label>
                  ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 font-medium">Search Tags</label>
              <input value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors" placeholder="4k, dark, aesthetic (comma separated)" />
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
              <input type="checkbox" id="featured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-5 h-5 rounded-md bg-black/20 border-white/20 text-primary cursor-pointer accent-primary" />
              <label htmlFor="featured" className="text-sm font-bold cursor-pointer hover:text-primary transition-colors">Mark as Featured (Hero Banner)</label>
            </div>
        </div>

        {/* RIGHT COLUMN: FILE & PROCESSING */}
        <div className="space-y-4">
            <div className="relative group overflow-hidden rounded-2xl border-2 border-dashed border-white/10 bg-black/30 aspect-[9/12] flex flex-col items-center justify-center transition-all hover:border-primary/50">
               {previewUrl ? (
                   <div className="absolute inset-0">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={previewUrl} alt="Preview" className="object-cover w-full h-full opacity-80" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                       <div className="absolute bottom-4 left-4 right-4 text-center">
                          <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30 uppercase tracking-widest font-bold">Image Selected</span>
                       </div>
                   </div>
               ) : (
                 <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                      <Upload size={32} className="text-gray-400" />
                    </div>
                    <h4 className="text-white font-bold mb-1">Pick High-Quality Wallpaper</h4>
                    <p className="text-xs text-gray-500 max-w-[200px]">The engine will automatically generate WebP files and Portrait Thumbnails.</p>
                 </div>
               )}
               <input 
                type="file" 
                accept="image/*" 
                required 
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (file && file.size > 2 * 1024 * 1024) {
                    toast.error('File too large! Please keep it under 2MB.')
                    e.target.value = '' // Clear input
                    setFullRes(null)
                    return
                  }
                  setFullRes(file || null)
                }} 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
               />
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 items-start">
               <Sparkles className="text-primary shrink-0 mt-0.5" size={18} />
               <div className="text-[11px] text-gray-400 leading-relaxed italic">
                 <strong>AI Note:</strong> Our server will strictly process this image into <strong>90% Webp</strong> and center-crop a <strong>Portrait Thumbnail</strong> for the mobile grid. No manual resizing needed!
               </div>
            </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-white/5 flex">
        <button 
          disabled={loading} 
          type="submit" 
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-xl font-bold transition-all flex items-center justify-center gap-3 ml-auto shadow-[0_10px_20px_-10px_rgba(139,92,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Optimizing & Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={20} className="group-hover:-translate-y-1 transition-transform" />
              <span>Upload To Production</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
