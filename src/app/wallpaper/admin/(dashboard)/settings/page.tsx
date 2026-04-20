export const dynamic = 'force-dynamic'
import SettingsManager from '@/components/admin/settings-manager'

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          App Settings
        </h1>
        <p className="text-gray-400 mt-2">Whitelist and manage application packages for API access.</p>
      </div>

      <SettingsManager />
    </div>
  )
}
