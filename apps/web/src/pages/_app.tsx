import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import Head from 'next/head'
import '@fontsource/inter/variable.css'

import { NProgressNextRouter } from '@saas-ui/react'
import { AppProvider } from '@app/features/core/providers/app'
import { AppLayout } from '@app/features/core/layouts/app-layout'

// import { authService } from '../lib/supabase'
// import { authService } from '../lib/magic'
import { authService } from '@app/config'

const NextLink = (props: LinkProps) => <Link {...props} legacyBehavior />

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const tenant = router.query.tenant ? (router.query.tenant as string) : null

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider
        authService={authService}
        linkComponent={NextLink}
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
      >
        <AppLayout
          publicRoutes={['/']}
          isPublic={Component.isPublic}
          layout={Component.layout}
          sidebar={pageProps.sidebar}
        >
          <NProgressNextRouter router={router} />
          <Component {...pageProps} />
        </AppLayout>
      </AppProvider>
    </>
  )
}

export default App
