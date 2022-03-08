import * as React from 'react'

import { useMockServer } from './mocks-provider'

/**
 * Consider moving mocks to service workers
 * this way we don't need a seperate fetcher for mocks
 * as the regular graphql requests will be picked up by the worker.
 */

export const useFetchData = <TData, TVariables>(
  query: string,
): ((variables?: TVariables) => Promise<TData>) => {
  const server = useMockServer()

  return async (variables?: TVariables) => {
    const result = await server.query(query, variables)

    if (result.errors) {
      const { message } = result.errors[0] || 'Error..'
      throw new Error(message)
    }

    return result.data as unknown as TData
  }
}
