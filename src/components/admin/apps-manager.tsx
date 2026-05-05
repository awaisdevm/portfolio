'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  Plus, Trash2, Smartphone, ToggleLeft, ToggleRight, 
  Wrench, ShieldCheck, ShieldOff, ArrowUpCircle, 
  Globe, Loader2, Pencil, X, Check, AlertTriangle,
  Rocket, Power, PowerOff, Construction
} from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import { App } from '@/lib/wallpaper/types'

export default function AppsManager() {
  const [apps, setApps] = useState<App[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<App>>({})
  const [showAddForm, setShowAddForm] = useState(false)

  // New app form state
  const [newApp, setNewApp] = useState({
    app_name: '',
    package_name: '',
    current_version: '1.0.0',
    min_version: '1.0.0',
    update_url: '',
    maintenance_msg: 'We are currently under maintenance. Please check back later.',
  })

  const supabase = useMemo(() => createClient(), [])

  const fetchApps = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setApps(data)
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchApps()
  }, [fetchApps])

  const handleAddApp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newApp.app_name || !newApp.package_name) return
    setSubmitting(true)

    const { error } = await supabase.from('apps').insert([{
      ...newApp,
      is_enabled: true,
      is_maintenance: false,
      force_update: false,
      ads_enabled: true,
      extra_config: {},
    }])

    if (error) {
      if (error.message.includes('duplicate')) {
        toast.error('An app with this package name already exists')
      } else {
        toast.error(error.message)
      }
    } else {
      toast.success(`${newApp.app_name} registered successfully`)
      setNewApp({
        app_name: '',
        package_name: '',
        current_version: '1.0.0',
        min_version: '1.0.0',
        update_url: '',
        maintenance_msg: 'We are currently under maintenance. Please check back later.',
      })
      setShowAddForm(false)
      fetchApps()
    }
    setSubmitting(false)
  }

  const toggleField = async (id: string, field: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('apps')
      .update({ [field]: !currentValue, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) toast.error(error.message)
    else {
      setApps(prev => prev.map(a => a.id === id ? { ...a, [field]: !currentValue } : a))
      toast.success(`${field.replace(/_/g, ' ')} toggled`)
    }
  }

  const startEditing = (app: App) => {
    setEditingId(app.id)
    setEditData({
      app_name: app.app_name,
      current_version: app.current_version,
      min_version: app.min_version,
      update_url: app.update_url,
      maintenance_msg: app.maintenance_msg,
    })
  }

  const saveEdit = async (id: string) => {
    const { error } = await supabase
      .from('apps')
      .update({ ...editData, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) toast.error(error.message)
    else {
      toast.success('App updated')
      setEditingId(null)
      fetchApps()
    }
  }

  const handleDelete = async (app: App) => {
    if (!window.confirm(`Delete "${app.app_name}" (${app.package_name})?\n\nThis will also remove all its ad network configs.`)) return

    // Cascade: remove ads first
    await supabase.from('ads_config').delete().eq('app_name', app.package_name)
    await supabase.from('app_settings').delete().eq('app_name', app.package_name)
    const { error } = await supabase.from('apps').delete().eq('id', app.id)

    if (error) toast.error(error.message)
    else {
      toast.success('App deleted')
      fetchApps()
    }
  }

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">
            Apps Manager
          </h1>
          <p className="text-zinc-500 text-sm md:text-lg">Register, configure, and control your mobile applications.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg ${
            showAddForm 
              ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700' 
              : 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90'
          }`}
        >
          {showAddForm ? <X size={18} /> : <Plus size={18} />}
          {showAddForm ? 'Cancel' : 'Register App'}
        </button>
      </div>

      {/* Add App Form */}
      {showAddForm && (
        <div className="glass-strong p-4 md:p-6 rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(139,92,246,0.1)] animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold mb-6 text-primary flex items-center gap-2">
            <Rocket className="text-primary" /> Register New Application
          </h3>
          <form onSubmit={handleAddApp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">App Display Name</label>
                <input
                  value={newApp.app_name}
                  onChange={e => setNewApp(p => ({ ...p, app_name: e.target.value }))}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-white"
                  required
                  placeholder="HD Wallpapers Pro"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Package Name</label>
                <input
                  value={newApp.package_name}
                  onChange={e => setNewApp(p => ({ ...p, package_name: e.target.value }))}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-white font-mono"
                  required
                  placeholder="com.awais.hdwallpapers"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Current Version</label>
                <input
                  value={newApp.current_version}
                  onChange={e => setNewApp(p => ({ ...p, current_version: e.target.value }))}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-white font-mono"
                  required
                  placeholder="1.0.0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Minimum Version (Force Update Below)</label>
                <input
                  value={newApp.min_version}
                  onChange={e => setNewApp(p => ({ ...p, min_version: e.target.value }))}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-white font-mono"
                  required
                  placeholder="1.0.0"
                />
              </div>
            </div>
            <div className="space-y-4 flex flex-col">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Update URL (Play Store Link)</label>
                <input
                  value={newApp.update_url}
                  onChange={e => setNewApp(p => ({ ...p, update_url: e.target.value }))}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors text-gray-300"
                  placeholder="https://play.google.com/store/apps/details?id=..."
                />
              </div>
              <div className="mt-auto pt-4">
                <button
                  disabled={submitting}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 py-3 rounded-xl font-medium transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                  Register App
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="glass-subtle rounded-xl p-4 border border-white/5">
          <div className="text-2xl font-bold text-white">{apps.length}</div>
          <div className="text-xs text-zinc-500 mt-1">Total Apps</div>
        </div>
        <div className="glass-subtle rounded-xl p-4 border border-white/5">
          <div className="text-2xl font-bold text-green-400">{apps.filter(a => a.is_enabled).length}</div>
          <div className="text-xs text-zinc-500 mt-1">Active</div>
        </div>
        <div className="glass-subtle rounded-xl p-4 border border-white/5">
          <div className="text-2xl font-bold text-amber-400">{apps.filter(a => a.is_maintenance).length}</div>
          <div className="text-xs text-zinc-500 mt-1">Maintenance</div>
        </div>
        <div className="glass-subtle rounded-xl p-4 border border-white/5">
          <div className="text-2xl font-bold text-red-400">{apps.filter(a => !a.is_enabled).length}</div>
          <div className="text-xs text-zinc-500 mt-1">Disabled</div>
        </div>
      </div>

      {/* Apps list */}
      <div className="space-y-6">
        {apps.map(app => {
          const isEditing = editingId === app.id

          return (
            <div
              key={app.id}
              className={`glass-subtle rounded-2xl border overflow-hidden transition-all duration-500 ${
                !app.is_enabled
                  ? 'border-red-500/30 opacity-75'
                  : app.is_maintenance
                    ? 'border-amber-500/30'
                    : 'border-white/5 hover:border-white/10'
              }`}
            >
              {/* Status Banner */}
              {(!app.is_enabled || app.is_maintenance) && (
                <div className={`px-4 py-2 flex items-center gap-2 text-sm font-medium ${
                  !app.is_enabled 
                    ? 'bg-red-500/10 text-red-400 border-b border-red-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-b border-amber-500/20'
                }`}>
                  {!app.is_enabled ? (
                    <><PowerOff size={14} /> App is DISABLED — Users cannot access this app</>
                  ) : (
                    <><Construction size={14} /> Maintenance Mode — Users see maintenance screen</>
                  )}
                </div>
              )}

              {/* App Header */}
              <div className="bg-black/30 p-5 md:p-6 border-b border-white/5">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center border shadow-inner transition-all duration-500 ${
                      !app.is_enabled
                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                        : app.is_maintenance
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-white/10 text-primary'
                    }`}>
                      <Smartphone size={28} />
                    </div>
                    <div>
                      {isEditing ? (
                        <input
                          value={editData.app_name || ''}
                          onChange={e => setEditData(p => ({ ...p, app_name: e.target.value }))}
                          className="bg-black/30 border border-white/20 rounded-lg px-3 py-1.5 text-white font-bold text-xl focus:outline-none focus:border-primary/50"
                        />
                      ) : (
                        <h4 className="font-bold text-white text-xl">{app.app_name}</h4>
                      )}
                      <span className="text-sm font-mono text-gray-400 block mt-1">{app.package_name}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Edit / Save / Cancel buttons */}
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(app.id)}
                          className="p-2.5 text-green-400 bg-green-500/10 hover:bg-green-500/20 rounded-xl transition-colors border border-green-500/20"
                          title="Save"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2.5 text-gray-400 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors border border-gray-700"
                          title="Cancel"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(app)}
                        className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-white/10"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(app)}
                      className="p-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-colors bg-red-500/10 border border-red-500/20"
                      title="Delete App"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Controls Grid */}
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                  {/* Enable / Disable */}
                  <ToggleCard
                    label="App Status"
                    icon={app.is_enabled ? Power : PowerOff}
                    value={app.is_enabled}
                    activeColor="green"
                    activeLabel="Enabled"
                    inactiveLabel="Disabled"
                    onToggle={() => toggleField(app.id, 'is_enabled', app.is_enabled)}
                  />

                  {/* Maintenance Mode */}
                  <ToggleCard
                    label="Maintenance"
                    icon={Wrench}
                    value={app.is_maintenance}
                    activeColor="amber"
                    activeLabel="Active"
                    inactiveLabel="Inactive"
                    onToggle={() => toggleField(app.id, 'is_maintenance', app.is_maintenance)}
                  />

                  {/* Force Update */}
                  <ToggleCard
                    label="Force Update"
                    icon={ArrowUpCircle}
                    value={app.force_update}
                    activeColor="cyan"
                    activeLabel="Enforced"
                    inactiveLabel="Optional"
                    onToggle={() => toggleField(app.id, 'force_update', app.force_update)}
                  />

                  {/* Ads */}
                  <ToggleCard
                    label="Ads"
                    icon={app.ads_enabled ? ShieldCheck : ShieldOff}
                    value={app.ads_enabled}
                    activeColor="violet"
                    activeLabel="Enabled"
                    inactiveLabel="Disabled"
                    onToggle={() => toggleField(app.id, 'ads_enabled', app.ads_enabled)}
                  />
                </div>

                {/* Version & Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Version Info */}
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                      <Globe size={10} /> Version Config
                    </div>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase">Current</label>
                          <input
                            value={editData.current_version || ''}
                            onChange={e => setEditData(p => ({ ...p, current_version: e.target.value }))}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-primary/50"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 uppercase">Minimum</label>
                          <input
                            value={editData.min_version || ''}
                            onChange={e => setEditData(p => ({ ...p, min_version: e.target.value }))}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-primary/50"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">Current</span>
                          <span className="font-mono text-sm text-white bg-primary/10 px-2.5 py-0.5 rounded-md border border-primary/20">{app.current_version}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">Minimum</span>
                          <span className="font-mono text-sm text-gray-300 bg-black/30 px-2.5 py-0.5 rounded-md border border-white/5">{app.min_version}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Update URL */}
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                      <ArrowUpCircle size={10} /> Update URL
                    </div>
                    {isEditing ? (
                      <input
                        value={editData.update_url || ''}
                        onChange={e => setEditData(p => ({ ...p, update_url: e.target.value }))}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-primary/50"
                        placeholder="https://play.google.com/..."
                      />
                    ) : (
                      <p className="text-sm text-gray-400 font-mono truncate" title={app.update_url}>
                        {app.update_url || <span className="text-gray-600 italic">Not set</span>}
                      </p>
                    )}
                  </div>

                  {/* Maintenance Message */}
                  <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                      <AlertTriangle size={10} /> Maintenance Message
                    </div>
                    {isEditing ? (
                      <textarea
                        value={editData.maintenance_msg || ''}
                        onChange={e => setEditData(p => ({ ...p, maintenance_msg: e.target.value }))}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-primary/50 resize-none"
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-gray-400 line-clamp-3">
                        {app.maintenance_msg || <span className="text-gray-600 italic">Default message</span>}
                      </p>
                    )}
                  </div>
                </div>

                {/* Config API Endpoint Preview */}
                <div className="mt-4 bg-black/30 rounded-xl p-3 border border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 min-w-0">
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">GET</span>
                    <code className="font-mono truncate text-gray-400">/wallpaper/api/config/{app.package_name}?v=1.0.0</code>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`/wallpaper/api/config/${app.package_name}?v=1.0.0`)
                      toast.success('API endpoint copied')
                    }}
                    className="text-[10px] text-primary hover:text-white transition-colors shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {apps.length === 0 && (
          <div className="glass-subtle rounded-xl p-12 text-center text-gray-500 border border-white/5 border-dashed flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 mb-4 flex items-center justify-center">
              <Smartphone size={24} className="opacity-50" />
            </div>
            <p className="text-lg">No applications registered yet.</p>
            <p className="text-sm opacity-60 mt-1">Click &ldquo;Register App&rdquo; above to add your first mobile app.</p>
          </div>
        )}
      </div>
    </div>
  )
}


// ─── Toggle Card Sub-Component ─────────────────────
interface ToggleCardProps {
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  value: boolean
  activeColor: 'green' | 'amber' | 'cyan' | 'violet' | 'red'
  activeLabel: string
  inactiveLabel: string
  onToggle: () => void
}

const colorMap = {
  green: {
    active: 'bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.15)]',
    dot: 'bg-green-400',
    toggle: 'bg-green-500',
  },
  amber: {
    active: 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    dot: 'bg-amber-400',
    toggle: 'bg-amber-500',
  },
  cyan: {
    active: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    dot: 'bg-cyan-400',
    toggle: 'bg-cyan-500',
  },
  violet: {
    active: 'bg-violet-500/10 border-violet-500/30 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)]',
    dot: 'bg-violet-400',
    toggle: 'bg-violet-500',
  },
  red: {
    active: 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    dot: 'bg-red-400',
    toggle: 'bg-red-500',
  },
}

function ToggleCard({ label, icon: Icon, value, activeColor, activeLabel, inactiveLabel, onToggle }: ToggleCardProps) {
  const colors = colorMap[activeColor]

  return (
    <button
      onClick={onToggle}
      className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl border transition-all duration-300 ${
        value ? colors.active : 'bg-zinc-900/40 border-white/5 text-gray-500 hover:border-white/10'
      }`}
    >
      <Icon size={20} className={value ? '' : 'opacity-50'} />
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{label}</span>
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${value ? colors.dot : 'bg-gray-600'} ${value ? 'animate-pulse' : ''}`} />
          <span className="text-xs font-bold">{value ? activeLabel : inactiveLabel}</span>
        </div>
      </div>
      {value ? <ToggleRight size={20} /> : <ToggleLeft size={20} className="opacity-40" />}
    </button>
  )
}
