import { createClient } from '@supabase/supabase-js'
import { createAuthService } from '@saas-ui/auth/services/supabase'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL)
  throw new Error(
    `Please provide a NEXT_PUBLIC_SUPABASE_URL environment variable!`,
  )

if (!process.env.NEXT_PUBLIC_SUPABASE_KEY)
  throw new Error(
    `Please provide a NEXT_PUBLIC_SUPABASE_KEY environment variable!`,
  )

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
)

export const authService = createAuthService(supabase)
