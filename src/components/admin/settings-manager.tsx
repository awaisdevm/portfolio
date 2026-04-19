'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { Plus, Key, Smartphone, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { AppSetting } from '@/lib/wallpaper/types'

export default function SettingsManager() {
  const [appSettings, setAppSettings] = useState<AppSetting[]>([])
  const [whitelistName, setWhitelistName] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = useMemo(() => createClient(), [])

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from('app_settings').select('*').order('created_at', { ascending: false })
    if (data) setAppSettings(data)
  }, [supabase])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const handleWhitelistApp = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!whitelistName) return
      setLoading(true)
      const { error } = await supabase.from('app_settings').insert([{ app_name: whitelistName, ads_enabled: true, features_enabled: true }])
      if (error) {
          if (error.code === '23505') toast.error('App package is already whitelisted.')
          else toast.error(error.message)
      } else {
          toast.success('App Package Whitelisted Successfully!')
          setWhitelistName('')
          fetchSettings()
      }
      setLoading(false)
  }

  const handleDeleteApp = async (app_name: string) => {
    if (!window.confirm(`Delete ${app_name} entirely? This permanently revokes its API access.`)) return
    
    // Revoke completely
    await supabase.from('ads_config').delete().eq('app_name', app_name)
    const { error } = await supabase.from('app_settings').delete().eq('app_name', app_name)
    
    if (error) toast.error(error.message)
    else {
        toast.success('App revoked successfully')
        fetchSettings()
    }
  }

  return (
    <div className="space-y-8">
      {/* WHITELIST FORM SECTION */}
      <div className="glass-strong p-6 rounded-2xl border border-white/10 shadow-lg mb-8">
         <h3 className="text-xl font-bold mb-4 font-inter text-secondary flex items-center gap-2">
            <Key className="text-secondary" /> Whitelist App Package
         </h3>
         <p className="text-sm text-gray-400 mb-4">Register your mobile app&apos;s package name here to securely allow it to call the backend API.</p>
         <form onSubmit={handleWhitelistApp} className="flex flex-col sm:flex-row gap-4 items-end max-w-3xl">
            <div className="flex-1 w-full">
               <label className="block text-sm text-gray-400 mb-1">Package Name</label>
               <input value={whitelistName} onChange={e => setWhitelistName(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-secondary/50 transition-colors" required placeholder="com.awais.wallpapers" />
            </div>
            <button disabled={loading} type="submit" className="bg-secondary/20 hover:bg-secondary/30 text-secondary py-3 px-6 rounded-xl font-medium transition-all shadow-lg flex justify-center items-center gap-2 border border-secondary/30">
               <Plus size={18} /> Register Access
            </button>
         </form>
      </div>

      {/* APPS LIST */}
      <h3 className="text-xl font-bold text-white mb-6">Whitelisted Applications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appSettings.map(app => (
              <div key={app.app_name} className="glass-subtle p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-primary-foreground border border-white/10 shadow-inner">
                       <Smartphone size={24} className="text-primary" />
                    </div>
                    <div>
                       <h4 className="font-bold text-white">{app.app_name}</h4>
                       <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest inline-block mt-1">API Allowed</span>
                    </div>
                 </div>
                 <div className="border-t border-white/5 pt-4 flex justify-end">
                    <button onClick={() => handleDeleteApp(app.app_name)} className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-transparent hover:border-red-500/30">
                        <Trash2 size={16} /> Revoke API Access
                    </button>
                 </div>
              </div>
          ))}
          {appSettings.length === 0 && (
              <div className="col-span-full glass-subtle rounded-xl p-12 text-center text-gray-500 border border-white/5 border-dashed flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 mb-4 flex items-center justify-center">
                      <Key size={24} className="opacity-50" />
                  </div>
                  <p className="text-lg">No app packages have been whitelisted yet.</p>
              </div>
          )}
      </div>
    </div>
  )
}
