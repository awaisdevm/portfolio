import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // During build or if env vars are missing, we return a dummy client or handle gracefully
    // Note: This prevents the build from crashing
    return createBrowserClient('', '')
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
