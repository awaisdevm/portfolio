import { NextResponse } from 'next/server'
import { createAdminClient, createClient } from '@/lib/supabase/server'
import sharp from 'sharp'
import { notificationService } from '@/lib/wallpaper/services/notification.service'

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

    // File input (Single source)
    const file = formData.get('full_res') as File | null

    if (!title || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabaseAdmin = await createAdminClient()

    // Ensure the bucket has a high enough file size limit (5MB) to handle high-res uploads
    // This allows the server to receive the large file before the reduction library (Sharp) can shrink it.
    const { error: updateError } = await supabaseAdmin.storage.updateBucket('wallpapers', {
      public: true,
      fileSizeLimit: 2097152 // 2MB in bytes
    })

    if (updateError) {
      console.warn('Manual Bucket Update Notice:', updateError.message)
    }

    // 1. Find category slug for clean storage path
    let folderPath = 'uncategorized'
    if (category_id && category_id !== 'null') {
      const { data: catData } = await supabaseAdmin.from('categories').select('slug').eq('id', category_id).single()
      if (catData?.slug) {
        folderPath = catData.slug
      }
    }

    // 2. Process Image with Sharp
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // A. Main Image (High Quality WebP)
    const mainImageWebp = await sharp(buffer)
      .webp({ quality: 90 })
      .toBuffer()

    // B. Thumbnail (Portrait 2:3 Center Crop WebP)
    const thumbImageWebp = await sharp(buffer)
      .resize(600, 900, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toBuffer()

    const timestamp = Date.now()
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-')

    // 3. Upload Main Image
    const mainPath = `${folderPath}/full_res/${timestamp}-${sanitizedTitle}.webp`
    const { error: mainUploadError } = await supabaseAdmin.storage
      .from('wallpapers')
      .upload(mainPath, mainImageWebp, {
        contentType: 'image/webp',
        upsert: true
      })

    if (mainUploadError) throw mainUploadError

    // 4. Upload Thumbnail
    const thumbPath = `${folderPath}/thumbnails/${timestamp}-${sanitizedTitle}-thumb.webp`
    const { error: thumbUploadError } = await supabaseAdmin.storage
      .from('wallpapers')
      .upload(thumbPath, thumbImageWebp, {
        contentType: 'image/webp',
        upsert: true
      })

    if (thumbUploadError) {
      // Rollback main if thumb fails
      await supabaseAdmin.storage.from('wallpapers').remove([mainPath])
      throw thumbUploadError
    }

    // 5. Get public URLs
    const { data: thumbPublicUrl } = supabaseAdmin.storage.from('wallpapers').getPublicUrl(thumbPath)
    const { data: mainPublicUrl } = supabaseAdmin.storage.from('wallpapers').getPublicUrl(mainPath)

    // 6. Save to DB
    const { data, error } = await supabaseAdmin.from('wallpapers').insert([{
      title,
      category_id: category_id === 'null' || !category_id ? null : category_id,
      tags: tagsStr ? JSON.parse(tagsStr) : [],
      is_featured,
      thumbnail_url: thumbPublicUrl.publicUrl,
      full_res_url: mainPublicUrl.publicUrl
    }]).select().single()

    if (error) {
      // Rollback storage if DB fails
      await supabaseAdmin.storage.from('wallpapers').remove([mainPath, thumbPath])
      throw error
    }

    // 7. Send Push Notification if part of a category
    if (folderPath !== 'uncategorized' && data?.id) {
      // Run asynchronously without awaiting so it doesn't block the upload response
      notificationService.sendNewWallpaperNotification(title, thumbPublicUrl.publicUrl, folderPath, data.id)
    }

    return NextResponse.json({ data })
  } catch (err: unknown) {
    console.error('Upload error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
