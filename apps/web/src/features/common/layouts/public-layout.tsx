'use client'

import { AppShell, AppShellProps } from '@saas-ui/react'

/**
 * The default public layout used for unauthenticated pages, like landingspages.
 */
export const PublicLayout: React.FC<AppShellProps> = ({
  children,
  ...rest
}) => {
  return (
    <AppShell h="$100vh" {...rest}>
      {children}
    </AppShell>
  )
}
