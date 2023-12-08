'use client'

import { AppProvider } from '@app/features/common/providers/app'
import { RootLayout } from '@app/features/common/layouts/root-layout'

/**
 * This is the root context provider for the application.
 * You can add context providers here that should be available to all pages.
 */
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider onError={(error, info) => console.error(error, info)}>
      <RootLayout publicRoutes={['/']}>{children}</RootLayout>
    </AppProvider>
  )
}
