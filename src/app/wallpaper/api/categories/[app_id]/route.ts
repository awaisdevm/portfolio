import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const revalidate = 60

export async function GET(request: Request, context: any) {
  const params = await context.params;
  const app_id = params.app_id;
  
  if (!app_id) return NextResponse.json({ error: 'App Package ID required' }, { status: 400 })
  
  const supabase = await createAdminClient()
  
  // 1. Verify app exists in settings (acts as a validation)
  const { data: settings } = await supabase.from('app_settings').select('app_name').eq('app_name', app_id).single()
  
  if (!settings) {
      return NextResponse.json({ error: 'App Package not recognized' }, { status: 404 })
  }

  // 2. Fetch all active categories to get their UUIDs
  const { data: categories, count, error } = await supabase
        .from('categories')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('name')
  
  if (error) return NextResponse.json({ error }, { status: 500 })
  
  return NextResponse.json({ 
      app_package: app_id,
      count,
      categories // these contain the 'id' (UUID) and 'slug'
  })
}
