'use client'

import { NProgressNextRouter } from '@saas-ui/react'
import { AppProvider } from '@app/features/core/providers/app'
import { RootLayout } from '@app/features/core/layouts/root-layout'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider onError={(error, info) => console.error(error, info)}>
      <RootLayout publicRoutes={['/', '/login', '/signup']}>
        {/* <NProgressNextRouter router={router} /> */}
        {children}
      </RootLayout>
    </AppProvider>
  )
}
