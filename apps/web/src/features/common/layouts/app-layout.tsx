'use client'

import { AppShell, AppShellProps } from '@saas-ui/react'

export interface AppLayoutProps extends AppShellProps {}

/**
 * Base layout for app pages.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  sidebar,
  ...rest
}) => {
  return (
    <AppShell h="$100vh" sidebar={sidebar} {...rest}>
      {children}
    </AppShell>
  )
}
