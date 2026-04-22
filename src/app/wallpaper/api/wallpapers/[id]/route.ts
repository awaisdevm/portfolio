import { NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabaseAuth = await createClient()
  const { data: { user } } = await supabaseAuth.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  try {
    const supabaseAdmin = await createAdminClient()
    
    const { data, error } = await supabaseAdmin
      .from('wallpapers')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (err: unknown) {
    console.error('Update error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabaseAuth = await createClient()
  const { data: { user } } = await supabaseAuth.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const supabaseAdmin = await createAdminClient()
    
    // Get full_res_url and thumbnail_url first to delete from storage
    await supabaseAdmin
      .from('wallpapers')
      .select('full_res_url, thumbnail_url')
      .eq('id', id)
      .single()

    // Delete from DB
    const { error } = await supabaseAdmin
      .from('wallpapers')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Optional: Extract storage paths and delete from bucket
    // For now, focus on DB delete stability

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('Delete error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
