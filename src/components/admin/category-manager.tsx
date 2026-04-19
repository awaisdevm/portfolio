'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Tag, ToggleLeft, ToggleRight, Image as ImageIcon, ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import WallpaperTable from './wallpaper-table'

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [categoryWallpapers, setCategoryWallpapers] = useState<any[]>([])
  
  const supabase = createClient()

  const fetchCategories = async () => {
    // using exact counting on foreign table
    const { data, error } = await supabase
        .from('categories')
        .select('*, wallpapers(id)')
        .order('name')
    if (data) {
        // Map to include count manually since postgREST sometimes returns array of objects
        const mapped = data.map(c => ({...c, wallpaper_count: c.wallpapers?.length || 0}))
        setCategories(mapped)
    }
  }

  const fetchCategoryWallpapers = async (categoryId: string) => {
    const { data } = await supabase.from('wallpapers').select('*, categories(name)').eq('category_id', categoryId).order('created_at', { ascending: false })
    if (data) setCategoryWallpapers(data)
  }

  const toggleExpand = (categoryId: string) => {
      if (expandedCategory === categoryId) {
          setExpandedCategory(null)
          setCategoryWallpapers([])
      } else {
          setExpandedCategory(categoryId)
          fetchCategoryWallpapers(categoryId)
      }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slug) return
    setLoading(true)
    const { error } = await supabase.from('categories').insert([{ name, slug, is_active: true }])
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Category added')
      setName('')
      setSlug('')
      fetchCategories()
    }
    setLoading(false)
  }

  const handleToggle = async (id: string, current: boolean) => {
      const { error } = await supabase.from('categories').update({ is_active: !current }).eq('id', id)
      if (error) toast.error(error.message)
      else fetchCategories()
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete category? Wallpapers in this category will become uncategorized.')) return
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) toast.error(error.message)
    else {
      toast.success('Category deleted')
      if (expandedCategory === id) setExpandedCategory(null)
      fetchCategories()
    }
  }

  const handleWallpaperUpdate = async (id: string, updates: any) => {
      setCategoryWallpapers(prev => prev.map(wp => wp.id === id ? { ...wp, ...updates } : wp))
      const { error } = await supabase.from('wallpapers').update(updates).eq('id', id)
      if (error) toast.error(error.message)
  }

  const handleWallpaperDelete = async (id: string) => {
      if (!window.confirm('Delete this wallpaper completely?')) return
      const { error } = await supabase.from('wallpapers').delete().eq('id', id)
      if (error) toast.error(error.message)
      else {
          toast.success('Deleted')
          if (expandedCategory) fetchCategoryWallpapers(expandedCategory)
          fetchCategories() // update counts
      }
  }

  return (
    <div className="space-y-8">
      {/* ADD SECTION */}
      <div className="glass-strong p-6 rounded-2xl border border-white/10 max-w-3xl">
        <h3 className="text-xl font-bold mb-4 font-inter text-primary">Create New Category</h3>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input value={name} onChange={e => {
                setName(e.target.value)
                if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0,-1)) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
                }
            }} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors" required placeholder="e.g. Abstract" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm text-gray-400 mb-1">Slug</label>
            <input value={slug} onChange={e => setSlug(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-gray-300 transition-colors" required placeholder="abstract-art" />
          </div>
          <button disabled={loading} type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/80 py-3 px-6 rounded-xl font-medium transition-all flex justify-center items-center gap-2 disabled:opacity-50">
            <Plus size={18} />
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>

      {/* LIST SECTION */}
      <div className="glass-subtle p-6 rounded-2xl border border-white/5">
        <h3 className="text-xl font-bold mb-6 font-inter text-secondary">Existing Categories</h3>
        
        <div className="flex flex-col space-y-4">
          {categories.map(c => (
            <div key={c.id} className="w-full flex flex-col">
                <div className={`p-4 rounded-xl flex items-center justify-between border transition-colors ${c.is_active ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/40 border-red-500/10 opacity-70'}`}>
                  <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center border shadow-inner ${c.is_active ? 'bg-primary/10 text-primary border-primary/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                        <Tag size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white leading-tight">{c.name}</h4>
                        <p className="text-xs text-gray-400 font-mono">/{c.slug}</p>
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400 bg-black/20 px-3 py-1.5 rounded-md border border-white/5">
                          <ImageIcon size={14} />
                          <span>{c.wallpaper_count} Items</span>
                      </div>
                      
                      <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                          <button 
                            onClick={() => toggleExpand(c.id)} 
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors border border-transparent ${expandedCategory === c.id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                          >
                             {expandedCategory === c.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                             <span className="text-sm font-medium">{expandedCategory === c.id ? 'Close' : 'View'}</span>
                          </button>
                      
                          <button 
                             onClick={() => handleToggle(c.id, c.is_active)} 
                             className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-colors ${c.is_active ? 'hover:bg-red-500/20 text-gray-300 hover:text-red-400' : 'hover:bg-green-500/20 text-gray-500 hover:text-green-400'}`}
                             title="Toggle Active Status"
                          >
                             {c.is_active ? <ToggleRight size={20} className="text-green-400" /> : <ToggleLeft size={20} />}
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="p-1.5 text-gray-500 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                      </div>
                  </div>
                </div>

                {/* EXPANDED VIEW */}
                {expandedCategory === c.id && (
                    <div className="mt-2 ml-4 md:ml-12 p-4 md:p-6 bg-black/40 border-l-2 border-primary/50 rounded-r-2xl rounded-bl-2xl shadow-xl animate-in fade-in slide-in-from-top-2">
                        <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">Wallpapers in {c.name}</h4>
                        <WallpaperTable 
                            wallpapers={categoryWallpapers} 
                            onUpdate={handleWallpaperUpdate} 
                            onDelete={handleWallpaperDelete} 
                        />
                    </div>
                )}
            </div>
          ))}
        </div>

        {categories.length === 0 && (
            <div className="rounded-xl p-8 text-center text-gray-500 border border-white/5 border-dashed mt-4">
                <p>No categories found.</p>
            </div>
        )}
      </div>
    </div>
  )
}
