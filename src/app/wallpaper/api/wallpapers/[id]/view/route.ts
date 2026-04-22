import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

/**
 * Public API to increment wallpaper view counts.
 * No authentication required as requested.
 */
export async function POST(
  request: Request, 
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params
  const { id } = params
  
  if (!id) {
    return NextResponse.json({ error: 'Wallpaper ID is required' }, { status: 400 })
  }

  try {
    const supabase = await createAdminClient()
    
    // Call the RPC function to increment the view count atomically.
    const { error } = await supabase.rpc('increment_view_count', { 
      wallpaper_id: id 
    })

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      message: 'View count incremented' 
    })
  } catch (err: unknown) {
    console.error('View tracking error:', err)
    const message = err instanceof Error ? err.message : 'Increment failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
