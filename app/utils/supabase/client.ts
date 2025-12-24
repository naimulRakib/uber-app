import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // 👇 FIX: Add fallback values so the build doesn't crash
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

  return createBrowserClient(supabaseUrl, supabaseKey)
}