import { NextResponse } from 'next/server'
import { wallpaperService } from '@/lib/wallpaper/services/wallpaper.service'

export const revalidate = 60

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  if (!category) {
    return NextResponse.json({ error: 'Category slug is required' }, { status: 400 })
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
