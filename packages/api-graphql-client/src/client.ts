import { GraphQLClient } from 'graphql-request'

const getAPIUrl = (): string => {
  const apiPath = '/api/graphql'

  if (typeof window !== 'undefined') return apiPath

  // Infer the deploy URL if we're in production
  // VERCEL_URL = Vercel, DEPLOY_URL = Netlify, ROOT_URL = Custom
  const ROOT_URL =
    process.env.VERCEL_URL || process.env.DEPLOY_URL || process.env.ROOT_URL

  if (ROOT_URL) {
    return `https://${ROOT_URL.replace(/^https?:\/\//, '')}${apiPath}`
  }

  if (process.env.NODE_ENV === `development`)
    return `http://localhost:3000${apiPath}`

  throw new Error('No ROOT_URL configured.')
}

export const client = new GraphQLClient(getAPIUrl())
