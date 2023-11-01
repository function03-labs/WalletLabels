'use client'

import { AppShell, AppShellProps, HotkeysListOptions } from '@saas-ui/react'

export interface AppLayoutProps extends AppShellProps {
  hotkeys?: HotkeysListOptions
}

/**
 * Base layout for app pages.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  hotkeys,
  sidebar,
  ...rest
}) => {
  return (
    <AppShell h="$100vh" sidebar={sidebar} {...rest}>
      {children}
    </AppShell>
  )
}
