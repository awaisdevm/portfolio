import { createAdminClient } from '../../supabase/server'
import { Wallpaper, PaginatedResponse } from '../types'

export class WallpaperRepository {
  async getAll(): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const { data, error, count } = await supabase
      .from('wallpapers')
      .select('*, categories(name)', { count: 'exact' })
      .order('created_at', { ascending: false })

    return { data: data || [], count, error: error?.message }
  }

  async getMostViewed(limit = 50): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const { data, error, count } = await supabase
      .from('wallpapers')
      .select('*', { count: 'exact' })
      .order('view_count', { ascending: false })
      .limit(limit)

    return { data: data || [], count, error: error?.message }
  }

  async getByCategory(slug: string): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const { data: category } = await supabase
      .from('categories')
      .select('id, slug')
      .eq('slug', slug)
      .single()

    if (!category) return { data: [], count: 0, error: 'Category not found' }

    const { data, error, count } = await supabase
      .from('wallpapers')
      .select('*', { count: 'exact' })
      .eq('category_id', category.id)
      .order('created_at', { ascending: false })

    return { data: data || [], count, error: error?.message }
  }

  async getFeatured(): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const { data, error, count } = await supabase
      .from('wallpapers')
      .select('*', { count: 'exact' })
      .eq('is_featured', true)
      .order('created_at', { ascending: false })

    return { data: data || [], count, error: error?.message }
  }

  async getPopular(limit = 50): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const { data, error, count } = await supabase
      .from('wallpapers')
      .select('*', { count: 'exact' })
      .order('download_count', { ascending: false })
      .limit(limit)

    return { data: data || [], count, error: error?.message }
  }

  async create(wallpaper: Partial<Wallpaper>) {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('wallpapers')
      .insert([wallpaper])
      .select()
      .single()
      
    if (error) throw new Error(error.message)
    return data
  }

  async delete(id: string) {
    const supabase = await createAdminClient()
    const { error } = await supabase.from('wallpapers').delete().eq('id', id)
    if (error) throw new Error(error.message)
  }
}

export const wallpaperRepository = new WallpaperRepository()
