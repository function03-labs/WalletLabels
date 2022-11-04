import * as React from 'react'

import { useRouter } from 'next/router'

import { RouterProvider, RouterContextValue } from '@saas-ui/router'

interface NextRouterProviderProps {
  children: React.ReactNode
}

const parseAsPath = (asPath: string) => {
  const [, pathname, search, hash] =
    asPath.match(/([^#?\s]+)(\??[^#]*)?(#.*)?$/) || []

  return { pathname, search, hash }
}

export function NextRouterProvider({ children }: NextRouterProviderProps) {
  const router = useRouter()

  const location = React.useMemo(
    () => parseAsPath(router.asPath),
    [router.asPath],
  )

  const context: RouterContextValue = {
    navigate: React.useCallback(
      (path, options) => {
        if (options?.replace) {
          router.replace(path)
        } else {
          router.push(path)
        }
      },
      [router],
    ),
    back: router.back,
    params: router.query,
    location,
    route: router.route,
  }

  return <RouterProvider value={context}>{children}</RouterProvider>
}
