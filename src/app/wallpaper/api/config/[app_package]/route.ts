import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { appsService } from '@/lib/wallpaper/services/apps.service'
import { ConfigResponse } from '@/lib/wallpaper/types'

export const revalidate = 30

/**
 * GET /wallpaper/api/config/[app_package]
 * 
 * The unified config endpoint for mobile apps.
 * Returns everything: app status, version info, maintenance mode, 
 * ads config, and extra feature flags — all in one call.
 * 
 * Query params:
 *   - v: current app version on the device (e.g., "1.2.0")
 */
export async function GET(
  request: Request, 
  context: { params: Promise<{ app_package: string }> }
) {
  const params = await context.params
  const app_package = params.app_package

  if (!app_package) {
    return NextResponse.json({ error: 'App package is required' }, { status: 400 })
  }

  // Parse device version from query string
  const url = new URL(request.url)
  const deviceVersion = url.searchParams.get('v') || '0.0.0'

  // 1. Fetch app record
  const { data: app, error } = await appsService.getByPackage(app_package)

  if (error || !app) {
    return NextResponse.json({ 
      error: 'App not found',
      message: `No configuration exists for package: ${app_package}`
    }, { status: 404 })
  }

  // 2. Fetch global ads setting and per-app ad networks in parallel
  const supabase = await createAdminClient()
  const [globalRes, networksRes] = await Promise.all([
    supabase.from('app_settings').select('*').eq('app_name', 'GLOBAL').single(),
    supabase
      .from('ads_config')
      .select('*')
      .eq('app_name', app_package)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
  ])

  const globalSettings = globalRes.data
  const isGlobalAdsOff = globalSettings?.ads_enabled === false
  const effectiveAdsEnabled = !isGlobalAdsOff && app.ads_enabled

  // 3. Version comparison
  const needsUpdate = appsService.compareVersions(deviceVersion, app.current_version) < 0
  const needsForceUpdate = app.force_update && appsService.compareVersions(deviceVersion, app.min_version) < 0

  // 4. Build unified config response
  const config: ConfigResponse = {
    app: {
      name: app.app_name,
      package_name: app.package_name,
      is_enabled: app.is_enabled,
      is_maintenance: app.is_maintenance,
      maintenance_msg: app.is_maintenance ? app.maintenance_msg : '',
    },
    version: {
      current: app.current_version,
      minimum: app.min_version,
      force_update: app.force_update,
      update_url: app.update_url,
      needs_update: needsUpdate,
      needs_force_update: needsForceUpdate,
    },
    ads: {
      enabled: effectiveAdsEnabled,
      global_enabled: !isGlobalAdsOff,
      networks: effectiveAdsEnabled ? (networksRes.data || []) : [],
    },
    extra_config: app.extra_config || {},
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(config)
}
