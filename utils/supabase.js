import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

