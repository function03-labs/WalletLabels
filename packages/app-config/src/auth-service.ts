import { createClient } from '@supabase/supabase-js'
import { createAuthService } from '@saas-ui/supabase'

// In case you already have a Supabase client defined, you can import it instead of creating a new one.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY || ''
)
export const authService = createAuthService(supabase)