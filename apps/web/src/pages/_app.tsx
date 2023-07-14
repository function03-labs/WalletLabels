import * as React from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import '@fontsource-variable/inter'

import { NProgressNextRouter } from '@saas-ui/react'
import { AppProvider } from '@app/features/core/providers/app'
import { AppLayout } from '@app/features/core/layouts/app-layout'
import Head from 'next/head'

const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />,
)

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider
        linkComponent={NextLink}
        onError={(error, info) => console.error(error, info)}
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
