'use client'

import { SettingsSidebar } from '@app/features/settings/components/sidebar'
import { AppLayout, AppLayoutProps } from './app-layout'

/**
 * Settings pages layout
 */
export const SettingsLayout: React.FC<AppLayoutProps> = ({
  children,
  ...rest
}) => {
  return (
    <AppLayout {...rest} sidebar={<SettingsSidebar />}>
      {children}
    </AppLayout>
  )
}
