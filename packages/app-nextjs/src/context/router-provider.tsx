import * as React from 'react'

import { useRouter } from 'next/router'

import { RouterProvider, RouterContextValue } from '@saas-ui/router'

interface NextRouterProviderProps {
  children: React.ReactNode
}

export function NextRouterProvider({ children }: NextRouterProviderProps) {
  const router = useRouter()

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
    location: {
      pathname: router.asPath,
    },
  }

  return <RouterProvider value={context}>{children}</RouterProvider>
}
