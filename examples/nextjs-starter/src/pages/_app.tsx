import type { AppProps } from 'next/app'

import { SaasProvider } from '@saas-ui/react'

import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SaasProvider theme={theme}>
      <Component {...pageProps} />
    </SaasProvider>
  )
}

export default MyApp
