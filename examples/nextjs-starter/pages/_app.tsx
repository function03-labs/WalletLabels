import type { AppProps } from 'next/app'

import { SaasProvider } from '@saas-ui/react'

import { theme } from '@saas-ui/pro'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SaasProvider theme={theme}>
      <Component {...pageProps} />
    </SaasProvider>
  )
}

export default MyApp
