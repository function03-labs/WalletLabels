'use client'

import { AppSidebar } from '../components/sidebar'
import { AppLayout, AppLayoutProps } from './app-layout'

/**
 * Default sidebar layout.
 */
export const SidebarLayout: React.FC<AppLayoutProps> = ({
  children,
  sidebar = <AppSidebar />,
  ...rest
}) => {
  return (
    <AppLayout sidebar={sidebar} {...rest}>
      {children}
    </AppLayout>
  )
}
