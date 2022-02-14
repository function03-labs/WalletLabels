import { createMockServer, IMockServer } from '@app/mock-graphql'

import { supabase } from '@app/config'

let server: IMockServer

export const useFetchData = <TData, TVariables>(
  query: string,
): ((variables?: TVariables) => Promise<TData>) => {
  if (!server) {
    server = createMockServer(supabase)
  }

  return async (variables?: TVariables) => {
    const result = await server.query(query, variables)

    if (result.errors) {
      const { message } = result.errors[0] || 'Error..'
      throw new Error(message)
    }

    return result.data as unknown as TData
  }
}
