import { useAuth } from '@saas-ui/auth'

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

export const useFetchData = <TData, TVariables>(
  query: string,
  options?: RequestInit['headers'],
): ((variables?: TVariables) => Promise<TData>) => {
  const { getToken } = useAuth()

  return async (variables?: TVariables) => {
    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
      ...(options ?? {}),
    }

    const token = await getToken()

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch(getAPIUrl(), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()

    if (json.errors) {
      const { message } = json.errors[0] || 'Error..'
      throw new Error(message)
    }

    return json.data
  }
}
