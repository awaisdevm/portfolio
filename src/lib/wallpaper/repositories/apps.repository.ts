import { createAdminClient } from '../../supabase/server'
import { App } from '../types'

export class AppsRepository {
  async getAll(): Promise<{ data: App[]; error?: string }> {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false })

    return { data: data || [], error: error?.message }
  }

  async getByPackage(package_name: string): Promise<{ data: App | null; error?: string }> {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .eq('package_name', package_name)
      .single()

    return { data, error: error?.message }
  }

  async create(app: Partial<App>): Promise<{ data: App | null; error?: string }> {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('apps')
      .insert([app])
      .select()
      .single()

    return { data, error: error?.message }
  }

  async update(id: string, updates: Partial<App>): Promise<{ error?: string }> {
    const supabase = await createAdminClient()
    const { error } = await supabase
      .from('apps')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)

    return { error: error?.message }
  }

  async delete(id: string, package_name: string): Promise<{ error?: string }> {
    const supabase = await createAdminClient()

    // Also remove all ad configs tied to this package
    await supabase.from('ads_config').delete().eq('app_name', package_name)
    await supabase.from('app_settings').delete().eq('app_name', package_name)

    const { error } = await supabase
      .from('apps')
      .delete()
      .eq('id', id)

    return { error: error?.message }
  }

  async toggleField(id: string, field: string, value: boolean): Promise<{ error?: string }> {
    const supabase = await createAdminClient()
    const { error } = await supabase
      .from('apps')
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq('id', id)

    return { error: error?.message }
  }
}

export const appsRepository = new AppsRepository()
