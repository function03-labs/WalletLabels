import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { NProgressNextRouter } from '@saas-ui/react'

import { AppProvider } from '@modules/core/providers/app'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <AppProvider
      cookies={pageProps.cookies}
      linkComponent={Link}
      onError={(error, info) => console.error(error, info)}
      tenant={router.query.tenant as string}
      onTenantChange={(key) => {
        router.push({
          ...router,
          query: {
            ...router.query,
            tenant: key,
          },
        })
      }}
      isPublic={Component.isPublic}
      layout={Component.layout}
      sidebar={pageProps.sidebar}
    >
      <NProgressNextRouter router={router} />
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default App
