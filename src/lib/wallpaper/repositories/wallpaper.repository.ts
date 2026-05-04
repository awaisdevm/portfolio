import { createAdminClient } from '../../supabase/server'
import { Wallpaper, PaginatedResponse } from '../types'

export class WallpaperRepository {
  async getAll(page = 1, limit = 20): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('wallpapers')
      .select('*, categories(name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

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

  async getByCategory(slug: string, page = 1, limit = 20): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: category } = await supabase
      .from('categories')
      .select('id, slug')
      .eq('slug', slug)
      .single()

    if (!category) return { data: [], count: 0, error: 'Category not found' }

    const { data, error, count } = await supabase
      .from('wallpapers')
      .select('*, categories(name)', { count: 'exact' })
      .eq('category_id', category.id)
      .order('created_at', { ascending: false })
      .range(from, to)

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

  async getPopular(page = 1, limit = 20): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('wallpapers')
      .select('*, categories(name)', { count: 'exact' })
      .order('download_count', { ascending: false })
      .order('view_count', { ascending: false })
      .range(from, to)

    return { data: data || [], count, error: error?.message }
  }

  async getRecent(page = 1, limit = 20, categorySlug?: string | null): Promise<PaginatedResponse<Wallpaper>> {
    const supabase = await createAdminClient()
    const from = (page - 1) * limit
    const to = from + limit - 1
    
    // Calculate date 7 days ago
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    let query = supabase
      .from('wallpapers')
      .select('*, categories(name)', { count: 'exact' })
      .gte('created_at', oneWeekAgo.toISOString())

    if (categorySlug) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single()
        
      if (category) {
        query = query.eq('category_id', category.id)
      } else {
        return { data: [], count: 0, error: 'Category not found' }
      }
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

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
