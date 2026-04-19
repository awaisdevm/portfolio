import { NextResponse } from 'next/server'
import { wallpaperService } from '@/lib/wallpaper/services/wallpaper.service'

export const revalidate = 30

export async function GET() {
  const { data, count, error } = await wallpaperService.getPopular()

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ data, count })
}
