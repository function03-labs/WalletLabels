import * as React from 'react'
import { Metadata } from 'next'
import '@fontsource-variable/inter'

import { ColorModeScript } from '@chakra-ui/react'

import { LemonSqueezyScript } from '../lib/lemonsqueezy'
import { Provider } from './provider'

export const metadata: Metadata = {
  title: {
    template: '%s | Saas UI',
    default: 'Saas UI',
  },
  icons: {
    icon: '/favicons/favicon-32x32.png',
    apple: '/favicons/apple-touch-icon.png',
  },
  manifest: '/favicons/manifest.json',
}

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const colorMode = 'system'

  return (
    <html>
      <body>
        <LemonSqueezyScript />
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
