'use client'
import { Trash2, Eye, X, ToggleLeft, ToggleRight, Star, StarOff, Edit2, Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function WallpaperTable({ wallpapers, onDelete, onUpdate }: { wallpapers: any[], onDelete: (id: string) => void, onUpdate: (id: string, updates: any) => void }) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editTags, setEditTags] = useState('')

  const handleSave = (id: string) => {
     const tagArray = editTags.split(',').map(t => t.trim()).filter(Boolean)
     onUpdate(id, { title: editTitle, tags: tagArray })
     setEditingId(null)
  }

  return (
    <>
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setPreviewImage(null)}>
          <button onClick={() => setPreviewImage(null)} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[101]">
            <X size={24} />
          </button>
          <div className="relative w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <Image src={previewImage} alt="Preview" fill className="object-contain" unoptimized />
          </div>
        </div>
      )}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-sm">
              <th className="pb-3 px-4 font-medium">Image</th>
              <th className="pb-3 px-4 font-medium">Title & Tags</th>
              <th className="pb-3 px-4 font-medium">Category</th>
              <th className="pb-3 px-4 font-medium">Stats & Status</th>
              <th className="pb-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 whitespace-nowrap">
            {wallpapers.map((wp) => (
              <tr key={wp.id} className={`transition-colors group ${wp.is_active === false ? 'opacity-50 hover:opacity-100 bg-black/40' : 'hover:bg-white/5'}`}>
                <td className="py-3 px-4">
                  <div
                    onClick={() => setPreviewImage(wp.full_res_url || wp.thumbnail_url)}
                    className="w-16 h-16 rounded-lg overflow-hidden relative border border-white/10 shadow-lg cursor-pointer group-hover:border-primary/50 transition-colors"
                  >
                    <Image src={wp.thumbnail_url} alt={wp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye size={16} className="text-white" />
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {editingId === wp.id ? (
                     <div className="flex flex-col gap-2 w-48">
                        <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="bg-black/40 border border-white/20 rounded-md px-2 py-1 text-sm focus:outline-none focus:border-primary w-full" placeholder="Title" />
                        <input value={editTags} onChange={e => setEditTags(e.target.value)} className="bg-black/40 border border-white/20 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-primary w-full text-gray-400" placeholder="Tags (comma separated)" />
                     </div>
                  ) : (
                     <>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white">{wp.title}</p>
                          {wp.is_featured && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap max-w-[200px] whitespace-normal">
                          {wp.tags?.slice(0, 3).map((tag: string, i: number) => (
                            <span key={i} className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-md border border-white/10">#{tag}</span>
                          ))}
                          {wp.tags?.length > 3 && <span className="text-[10px] text-gray-500">+{wp.tags.length - 3}</span>}
                        </div>
                     </>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm bg-primary/10 text-primary-foreground px-3 py-1 rounded-full border border-primary/20">
                    {wp.categories?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{wp.download_count}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Downloads</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-4">
                      <button
                        onClick={() => onUpdate(wp.id, { is_active: !wp.is_active })}
                        className={`text-xs flex items-center gap-1 transition-colors ${wp.is_active ? 'text-green-400' : 'text-gray-500'}`}
                      >
                        {wp.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                        {wp.is_active ? 'Active' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {editingId === wp.id ? (
                      <>
                        <button onClick={() => handleSave(wp.id)} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors border border-green-400/20" title="Save Changes">
                           <Check size={16} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors border border-transparent" title="Cancel">
                           <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                             setEditingId(wp.id)
                             setEditTitle(wp.title)
                             setEditTags(wp.tags?.join(', ') || '')
                          }}
                          className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors border border-transparent hover:border-blue-400/20"
                          title="Edit Wallpaper"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onUpdate(wp.id, { is_featured: !wp.is_featured })}
                          className={`p-2 rounded-lg transition-colors border border-transparent ${wp.is_featured ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20' : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'}`}
                          title={wp.is_featured ? "Remove from Featured" : "Mark as Featured"}
                        >
                          {wp.is_featured ? <Star size={16} className="fill-yellow-400" /> : <StarOff size={16} />}
                        </button>
                        <button onClick={() => setPreviewImage(wp.full_res_url || wp.thumbnail_url)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20" title="Preview">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => onDelete(wp.id)} className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors border border-transparent hover:border-accent/20" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {wallpapers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 mb-3" />
                    <p>No wallpapers found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
