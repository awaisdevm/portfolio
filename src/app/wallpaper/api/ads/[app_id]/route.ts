import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { adsService } from '@/lib/wallpaper/services/ads.service'

export const revalidate = 60

export async function GET(request: Request, context: { params: Promise<{ app_id: string }> }) {
  // Fix params unwrapping for Next.js 15
  const params = await context.params;
  const app_id = params.app_id;
  
  if (!app_id) return NextResponse.json({ error: 'App ID required' }, { status: 400 })
  
  const supabase = await createAdminClient()
  
  // 1. Fetch Global Settings & Specific App Settings in parallel
  const [globalRes, appRes] = await Promise.all([
    supabase.from('app_settings').select('*').eq('app_name', 'GLOBAL').single(),
    supabase.from('app_settings').select('*').eq('app_name', app_id).single()
  ])

  const globalSettings = globalRes.data
  const appSettings = appRes.data

  // 2. Determine effective ads state
  // Global switch takes precedence if it specifically is set to false
  const isGlobalAdsOff = globalSettings?.ads_enabled === false
  const isAppAdsOff = appSettings?.ads_enabled === false
  const ads_enabled = !isGlobalAdsOff && !isAppAdsOff

  // 3. Fetch specific network configurations
  const { data, error } = await adsService.getByApp(app_id)
  let networks = data ?? []
  
  if (error) return NextResponse.json({ error }, { status: 500 })

  // 4. Force empty networks if ads are disabled globally or for this app
  if (!ads_enabled) {
    networks = []
  }
  
  return NextResponse.json({ 
      app_name: app_id,
      ads_enabled,
      global_ads_online: !isGlobalAdsOff,
      features_enabled: appSettings?.features_enabled ?? true,
      count: networks?.length ?? 0,
      networks
  })
}
