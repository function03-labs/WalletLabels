import { ParsedUrlQuery } from 'querystring'

import * as React from 'react'

interface NavigateOptions {
  replace?: boolean
}

export interface RouterContextValue {
  navigate: (path: string, options?: NavigateOptions) => void
  back: () => void
  params?: ParsedUrlQuery
}

export const RouterContext = React.createContext<RouterContextValue | null>(
  null,
)

/**
 * A simple to wrapper to abstract basic router functionality
 */
export const RouterProvider = RouterContext.Provider

export const useRouterContext = () =>
  React.useContext(RouterContext) as RouterContextValue

export const useNavigate = () => {
  const context = useRouterContext()
  return context?.navigate
}

export const useParams = () => {
  const context = useRouterContext()
  return context?.params
}
