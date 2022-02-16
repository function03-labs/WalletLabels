import * as React from 'react'

import { createMockServer, IMockServer } from '@app/mock-graphql'

import { useAuth } from '@saas-ui/react'

export const useFetchData = <TData, TVariables>(
  query: string,
): ((variables?: TVariables) => Promise<TData>) => {
  const { user } = useAuth()

  const server: IMockServer = React.useMemo(() => {
    return createMockServer({
      user: async () => user,
    })
  }, [user])

  return async (variables?: TVariables) => {
    const result = await server.query(query, variables)

    if (result.errors) {
      const { message } = result.errors[0] || 'Error..'
      throw new Error(message)
    }

    return result.data as unknown as TData
  }
}
