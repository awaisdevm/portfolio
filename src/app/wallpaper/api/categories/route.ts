import { NextResponse } from 'next/server'
import { categoryService } from '@/lib/wallpaper/services/category.service'

export const revalidate = 120

export async function GET() {
  const { data, count, error } = await categoryService.getAll()
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ data, count })
}
