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
  
  // 1. Fetch Global Settings
  const { data: settings } = await supabase.from('app_settings').select('*').eq('app_name', app_id).single()
  
  // 2. Fetch specific network configurations
  const { data: networks, count, error } = await adsService.getByApp(app_id)
  
  if (error) return NextResponse.json({ error }, { status: 500 })
  
  return NextResponse.json({ 
      app_name: app_id,
      ads_enabled: settings?.ads_enabled ?? true, // fallback true if not configured
      features_enabled: settings?.features_enabled ?? true,
      count,
      networks
  })
}
