import { NextResponse } from 'next/server'
import { wallpaperService } from '@/lib/wallpaper/services/wallpaper.service'
import { integrityService } from '@/lib/wallpaper/services/integrity.service'

export const revalidate = 30

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)

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

  const { data, count, error } = await wallpaperService.getRecent(page, limit)

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ data, count, page, limit })
}
