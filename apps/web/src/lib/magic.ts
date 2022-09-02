import { Magic } from 'magic-sdk'
import { createAuthService } from '@saas-ui/auth/services/magic-link'

if (!process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
  throw new Error('Magic.link not configured')
}

export const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY)

export const authService = createAuthService(magic)
