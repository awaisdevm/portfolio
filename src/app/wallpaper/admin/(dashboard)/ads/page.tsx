import AdsManager from '@/components/admin/ads-manager'

export default function AdsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Ads Management
        </h1>
        <p className="text-gray-400 mt-2">Configure Mobile Ad network IDs efficiently.</p>
      </div>
      <AdsManager />
    </div>
  )
}
