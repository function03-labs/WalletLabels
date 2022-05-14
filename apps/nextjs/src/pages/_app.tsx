import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Link from 'next/link'

import '@fontsource/inter/variable.css'

import { NProgressNextRouter } from '@saas-ui/react'
import { NextRouterProvider } from '@app/nextjs'
import { AppProvider } from '@modules/core/providers/app'

// import { authService } from '../lib/supabase'
// import { authService } from '../lib/magic'
import { authService } from '@app/config/mock-auth-service'

import { Paddle } from '../lib/paddle'

// Normally you only run this on development.
import { worker } from '@app/mock-graphql'
if (worker) {
  worker.start()
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const tenant = router.query.tenant ? (router.query.tenant as string) : null

  return (
    <NextRouterProvider>
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
        <Paddle />
        <NProgressNextRouter router={router} />
        <Component {...pageProps} />
      </AppProvider>
    </NextRouterProvider>
  )
}

export default App
