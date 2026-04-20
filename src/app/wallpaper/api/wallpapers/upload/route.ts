import { NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabaseAuth = await createClient()
  const { data: { user } } = await supabaseAuth.auth.getUser()

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const category_id = formData.get('category_id') as string | null
    const tagsStr = formData.get('tags') as string
    const is_featured = formData.get('is_featured') === 'true'

    // File inputs
    const thumbnailFile = formData.get('thumbnail') as File | null
    const fullResFile = formData.get('full_res') as File | null

    if (!title || !thumbnailFile || !fullResFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabaseAdmin = await createAdminClient()

    // 1. Find category slug for clean storage path
    let folderPath = 'uncategorized'
    if (category_id && category_id !== 'null') {
      const { data: catData } = await supabaseAdmin.from('categories').select('slug').eq('id', category_id).single()
      if (catData?.slug) {
        folderPath = catData.slug
      }
    }

    // 2. Upload thumbnail
    const thumbName = `${Date.now()}-thumb-${thumbnailFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const thumbPath = `${folderPath}/thumbnails/${thumbName}`

    const { error: thumbUploadError } = await supabaseAdmin.storage
      .from('wallpapers')
      .upload(thumbPath, thumbnailFile)

    if (thumbUploadError) throw thumbUploadError

    // 3. Upload full res
    const fullResName = `${Date.now()}-full-${fullResFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    const fullResPath = `${folderPath}/full_res/${fullResName}`

    const { error: fullUploadError } = await supabaseAdmin.storage
      .from('wallpapers')
      .upload(fullResPath, fullResFile)

    if (fullUploadError) {
      // Rollback thumbnail if full_res fails
      await supabaseAdmin.storage.from('wallpapers').remove([thumbPath])
      throw fullUploadError
    }

    // 4. Get public URLs
    const { data: thumbPublicUrl } = supabaseAdmin.storage.from('wallpapers').getPublicUrl(thumbPath)
    const { data: fullPublicUrl } = supabaseAdmin.storage.from('wallpapers').getPublicUrl(fullResPath)

    // 5. Save to DB
    const { data, error } = await supabaseAdmin.from('wallpapers').insert([{
      title,
      category_id: category_id === 'null' || !category_id ? null : category_id,
      tags: tagsStr ? JSON.parse(tagsStr) : [],
      is_featured,
      thumbnail_url: thumbPublicUrl.publicUrl,
      full_res_url: fullPublicUrl.publicUrl
    }]).select().single()

    if (error) {
      // Rollback storage if DB fails
      await supabaseAdmin.storage.from('wallpapers').remove([thumbPath, fullResPath])
      throw error
    }

    return NextResponse.json({ data })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 })
  }

}
