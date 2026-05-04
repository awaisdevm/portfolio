import { NextResponse } from 'next/server'
import { wallpaperService } from '@/lib/wallpaper/services/wallpaper.service'
import { integrityService } from '@/lib/wallpaper/services/integrity.service'

export const revalidate = 60

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
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

    let result;
    if (category) {
      result = await wallpaperService.getByCategory(category, page, limit)
    } else {
      result = await wallpaperService.getAll(page, limit)
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      data: result.data,
      count: result.count,
      page,
      limit,
      category_type: category || 'all'
    })
  } catch (err: unknown) {
    console.error('API Error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    const stack = err instanceof Error ? err.stack : undefined
    return NextResponse.json({ error: message, stack }, { status: 500 })
  }
}
