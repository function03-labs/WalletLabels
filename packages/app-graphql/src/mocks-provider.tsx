import * as React from 'react'

import { createMockServer, IMockServer, MockContext } from '@app/mock-graphql'

interface GraphqlMockContextReturn {
  server: IMockServer
}

const GraphqlMocksContext =
  React.createContext<GraphqlMockContextReturn | null>(null)

export interface GraphqlMocksProviderProps {
  context?: MockContext
  children?: React.ReactNode
}

export const GraphqlMocksProvider = (props: GraphqlMocksProviderProps) => {
  const { children, context = { user: async () => null } } = props

  const server: IMockServer = React.useMemo(() => {
    return createMockServer(context)
  }, [context])

  return (
    <GraphqlMocksContext.Provider value={{ server }}>
      {children}
    </GraphqlMocksContext.Provider>
  )
}

export const useMockServer = (): IMockServer => {
  const context = React.useContext(
    GraphqlMocksContext,
  ) as GraphqlMockContextReturn

  return context.server
}
