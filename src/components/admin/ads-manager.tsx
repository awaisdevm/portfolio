'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Smartphone, ToggleLeft, ToggleRight, Settings, ShieldAlert, Cpu } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'

export default function AdsManager() {
  const [ads, setAds] = useState<any[]>([])
  const [appSettings, setAppSettings] = useState<{ [key: string]: any }>({})
  const [appName, setAppName] = useState('')
  const [network, setNetwork] = useState('AppLovin')
  const [bannerId, setBannerId] = useState('')
  const [interstitialId, setInterstitialId] = useState('')
  const [appOpenId, setAppOpenId] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const fetchAdsAndSettings = async () => {
    // Fetch all ads config
    const { data: adsData } = await supabase.from('ads_config').select('*').order('created_at', { ascending: false })
    
    // Fetch global settings for all apps present
    const { data: settingsData } = await supabase.from('app_settings').select('*')
    
    if (adsData) setAds(adsData)
    if (settingsData) {
       const settingsMap: any = {}
       settingsData.forEach(s => settingsMap[s.app_name] = s)
       setAppSettings(settingsMap)
    }
  }

  useEffect(() => {
    fetchAdsAndSettings()
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!appName || !network) return
    setLoading(true)
    
    // 1. Insert Ad Config
    const { error } = await supabase.from('ads_config').insert([{ 
        app_name: appName, 
        ad_network: network,
        banner_id: bannerId,
        interstitial_id: interstitialId,
        app_open_id: appOpenId
    }])
    
    if (error) {
      toast.error(error.message)
    } else {
      // 2. Ensure an app_settings row exists for this app
      if (!appSettings[appName]) {
         await supabase.from('app_settings').insert([{ app_name: appName, ads_enabled: true, features_enabled: true }])
      }
      
      toast.success('Ad Network Configured')
      setBannerId(''); setInterstitialId(''); setAppOpenId('');
      fetchAdsAndSettings()
    }
    setLoading(false)
  }

  const toggleAdActive = async (id: string, currentStatus: boolean) => {
      const { error } = await supabase.from('ads_config').update({ is_active: !currentStatus }).eq('id', id)
      if (error) toast.error(error.message)
      else fetchAdsAndSettings()
  }
  
  const toggleAppSetting = async (app_name: string, field: string, currentValue: boolean) => {
      // Opt-in creation if settings row doesn't exist natively
      if (!appSettings[app_name]) {
         await supabase.from('app_settings').insert([{ app_name, [field]: !currentValue }])
      } else {
         await supabase.from('app_settings').update({ [field]: !currentValue }).eq('app_name', app_name)
      }
      fetchAdsAndSettings()
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this Network Ad config?')) return
    const { error } = await supabase.from('ads_config').delete().eq('id', id)
    if (error) toast.error(error.message)
    else fetchAdsAndSettings()
  }

  // Group ads by app_name
  const groupedAds = ads.reduce((acc: any, ad: any) => {
      if (!acc[ad.app_name]) acc[ad.app_name] = []
      acc[ad.app_name].push(ad)
      return acc
  }, {})

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* FORM SECTION */}
      <div className="glass-strong p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <h3 className="text-xl font-bold mb-6 font-inter text-primary flex items-center gap-2">
            <Cpu className="text-primary" /> Integrate Ad Network
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">App Package Name</label>
                <input value={appName} onChange={e => setAppName(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors" required placeholder="com.example.app" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ad Network Provider</label>
                <select value={network} onChange={e => setNetwork(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-white">
                    <option className="bg-gray-900" value="AppLovin">AppLovin MAX</option>
                    <option className="bg-gray-900" value="AdMob">Google AdMob</option>
                    <option className="bg-gray-900" value="UnityAds">Unity Ads</option>
                    <option className="bg-gray-900" value="IronSource">IronSource</option>
                    <option className="bg-gray-900" value="Other">Other Format</option>
                </select>
              </div>
          </div>
          <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Banner Ad ID</label>
                <input value={bannerId} onChange={e => setBannerId(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-gray-300 transition-colors" placeholder="Optional" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Interstitial Ad ID</label>
                <input value={interstitialId} onChange={e => setInterstitialId(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-gray-300 transition-colors" placeholder="Optional" />
              </div>
          </div>
          <div className="space-y-4 flex flex-col">
              <div>
                <label className="block text-sm text-gray-400 mb-1">App Open Ad ID</label>
                <input value={appOpenId} onChange={e => setAppOpenId(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-gray-300 transition-colors" placeholder="Optional" />
              </div>
              <div className="mt-auto pt-4">
                  <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 py-3 rounded-xl font-medium transition-all shadow-lg flex justify-center items-center gap-2">
                    <Plus size={18} /> Attach Network to App
                  </button>
              </div>
          </div>
        </form>
      </div>

      {/* APPS LIST (GROUPED ADS) */}
      <div className="space-y-6">
        {Object.keys(groupedAds).map(app_name => {
          const settings = appSettings[app_name] || { ads_enabled: true, features_enabled: true }
          const appNetworks = groupedAds[app_name]

          return (
            <div key={app_name} className="glass-subtle rounded-2xl border border-white/5 overflow-hidden">
                {/* APP HEADER & GLOBAL CONTROLS */}
                <div className="bg-black/30 p-5 md:p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-primary-foreground border border-white/10 shadow-inner">
                           <Smartphone size={28} className="text-primary" />
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-xl">{app_name}</h4>
                           <span className="text-sm font-mono text-gray-400">{appNetworks.length} Network(s) Attached</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 bg-black/20 p-2 rounded-xl border border-white/5">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold flex gap-1 items-center">
                                <Settings size={10}/> Master Ads
                            </span>
                            <button 
                               onClick={() => toggleAppSetting(app_name, 'ads_enabled', settings.ads_enabled)} 
                               className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all min-w-[70px] ${settings.ads_enabled ? 'bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}
                            >
                               {settings.ads_enabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                            </button>
                        </div>
                        <div className="w-px h-10 bg-white/10"></div>
                        <div className="flex flex-col items-center pr-2">
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5 font-bold flex gap-1 items-center">
                                <ShieldAlert size={10}/> Global Features
                            </span>
                            <button 
                               onClick={() => toggleAppSetting(app_name, 'features_enabled', settings.features_enabled)} 
                               className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all min-w-[70px] ${settings.features_enabled ? 'bg-primary/10 text-primary border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : 'bg-gray-800 text-gray-500 border-gray-700'}`}
                            >
                               {settings.features_enabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* INDIVIDUAL AD NETWORKS */}
                <div className="p-4 space-y-3 bg-gradient-to-b from-black/0 to-black/10">
                    {appNetworks.map((ad: any) => (
                        <div key={ad.id} className={`flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${ad.is_active ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]' : 'bg-black/40 border-dashed border-red-500/20 opacity-80'}`}>
                            <div className="flex gap-4 items-center">
                                <div className="w-2 h-12 rounded-full bg-gradient-to-b from-white/10 to-white/5 flex-shrink-0"></div>
                                <div className="flex flex-col">
                                    <h5 className="font-bold text-white text-md relative pl-2 border-l-2 border-primary mb-1">
                                        {ad.ad_network} Format
                                    </h5>
                                    <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-400">
                                        {ad.banner_id && <span className="bg-black/30 px-2 py-1 rounded-md border border-white/5">BN: <span className="text-accent tracking-tighter">{ad.banner_id}</span></span>}
                                        {ad.interstitial_id && <span className="bg-black/30 px-2 py-1 rounded-md border border-white/5">IN: <span className="text-secondary tracking-tighter">{ad.interstitial_id}</span></span>}
                                        {ad.app_open_id && <span className="bg-black/30 px-2 py-1 rounded-md border border-white/5">OP: <span className="text-primary tracking-tighter">{ad.app_open_id}</span></span>}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 border-t border-white/5 pt-3 xl:border-0 xl:pt-0">
                                <button 
                                   onClick={() => toggleAdActive(ad.id, ad.is_active)} 
                                   className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${ad.is_active ? 'text-green-400 hover:bg-green-500/10' : 'text-gray-500 hover:text-red-400 hover:bg-red-500/10'}`}
                                >
                                   {ad.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                                   <span className="text-sm font-bold uppercase tracking-wider">{ad.is_active ? 'Online' : 'Offline'}</span>
                                </button>
                                <button onClick={() => handleDelete(ad.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2 border border-transparent hover:border-red-500/20">
                                   <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          )
        })}
        {Object.keys(groupedAds).length === 0 && (
            <div className="glass-subtle rounded-xl p-12 text-center text-gray-500 border border-white/5 border-dashed flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 mb-4 flex items-center justify-center">
                    <Smartphone size={24} className="opacity-50" />
                </div>
                <p className="text-lg">No app ad configurations exist yet.</p>
                <p className="text-sm opacity-60 mt-1">Add your app's package name and network IDs above.</p>
            </div>
        )}
      </div>
    </div>
  )
}
