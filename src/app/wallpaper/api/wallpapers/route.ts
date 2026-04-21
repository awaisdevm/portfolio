import { NextResponse } from 'next/server'
import { wallpaperService } from '@/lib/wallpaper/services/wallpaper.service'
import { integrityService } from '@/lib/wallpaper/services/integrity.service'

export const revalidate = 60

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  if (!category) {
    return NextResponse.json({ error: 'Category slug is required' }, { status: 400 })
  }

  // Verify Integrity Token
  const integrityToken = request.headers.get('x-integrity-token')
  if (integrityToken) {
    const verdict = await integrityService.verifyToken(integrityToken)
    if (!verdict.isValid) {
      return NextResponse.json({ 
        error: 'Security Failure: Device Integrity Check Failed.',
        details: verdict.error || 'The device or app version is not recognized as official.'
      }, { status: 403 })
    }
  }

  const { data, count, error } = await wallpaperService.getByCategory(category)

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({
    data,
    count,
    category_type: category
  })
}
