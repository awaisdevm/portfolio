import { createAdminClient } from '../../supabase/server'
import { Category, PaginatedResponse } from '../types'

export class CategoryRepository {
  async getAll(): Promise<PaginatedResponse<Category>> {
    const supabase = await createAdminClient()
    const { data, error, count } = await supabase
      .from('categories')
      .select('*', { count: 'exact' })
      .order('name', { ascending: true })

    return { data: data || [], count, error: error?.message }
  }

  async create(category: Partial<Category>) {
    const supabase = await createAdminClient()
    if (category.name && !category.slug) {
        category.slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single()
      
    if (error) throw new Error(error.message)
    return data
  }

  async delete(id: string) {
    const supabase = await createAdminClient()
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) throw new Error(error.message)
  }
}

export const categoryRepository = new CategoryRepository()
