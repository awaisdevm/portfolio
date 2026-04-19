import { createAdminClient } from '../../supabase/server'
import { AdsConfig, PaginatedResponse } from '../types'

export class AdsRepository {
  async getByApp(app_name: string): Promise<PaginatedResponse<AdsConfig>> {
    const supabase = await createAdminClient()
    const { data, error, count } = await supabase
      .from('ads_config')
      .select('*', { count: 'exact' })
      .eq('app_name', app_name)
      .eq('is_active', true)

    return { data: data || [], count, error: error?.message }
  }

  async getAll(): Promise<PaginatedResponse<AdsConfig>> {
    const supabase = await createAdminClient()
    const { data, error, count } = await supabase
      .from('ads_config')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    return { data: data || [], count, error: error?.message }
  }

  async toggleActive(id: string, is_active: boolean) {
    const supabase = await createAdminClient()
    const { error } = await supabase
      .from('ads_config')
      .update({ is_active })
      .eq('id', id)
    if (error) throw new Error(error.message)
  }

  async create(config: Partial<AdsConfig>) {
      const supabase = await createAdminClient()
      const { data, error } = await supabase
        .from('ads_config')
        .insert([config])
        .select()
        .single()
        
      if (error) throw new Error(error.message)
      return data
  }
}

export const adsRepository = new AdsRepository()
