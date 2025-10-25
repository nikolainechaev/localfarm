import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_KEY

if (!supabaseUrl) {
  throw new Error('Missing required environment variable: SUPABASE_URL')
}
if (!supabaseAnonKey) {
  throw new Error('Missing required environment variable: SUPABASE_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
