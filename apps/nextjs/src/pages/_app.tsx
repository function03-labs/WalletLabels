import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { NProgressNextRouter } from '@saas-ui/react'

import { AppProvider } from '@modules/core/providers/app'

// import { authService } from '../lib/supabase'
// import { authService } from '../lib/magic'
import { authService } from '@app/config/mock-auth-service'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const tenant = router.query.tenant ? (router.query.tenant as string) : null
  console.log(tenant)
  return (
    <AppProvider
      authService={authService}
      cookies={pageProps.cookies}
      linkComponent={Link}
      onError={(error, info) => console.error(error, info)}
      tenant={tenant}
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
