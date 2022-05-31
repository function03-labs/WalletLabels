import * as React from 'react'

import { useRouter } from 'next/router'

import { RouterProvider } from '@saas-ui/router'

interface NextRouterProviderProps {
  children: React.ReactNode
}

export function NextRouterProvider({ children }: NextRouterProviderProps) {
  const router = useRouter()

  const navigate = React.useCallback(
    (path, options) => {
      if (options?.replace) {
        router.replace(path)
      } else {
        router.push(path)
      }
    },
    [router],
  )

  const context = {
    navigate,
    back: router.back,
    params: router.query,
    location: {
      pathname: router.asPath,
    },
  }

  return <RouterProvider value={context}>{children}</RouterProvider>
}
