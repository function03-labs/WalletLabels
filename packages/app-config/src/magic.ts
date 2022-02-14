import { Magic } from 'magic-sdk'

if (!process.env.NEXT_PUBLIC_MAGIC_API_KEY) {
  throw new Error('Magic.link not configured')
}

export const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY)
