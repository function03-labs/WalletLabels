'use client'

import { AppLayout, AppLayoutProps } from './app-layout'

/**
 * Fullscreen layout, for functionality that requires extra focus, like onboarding/checkout/etc.
 */
export const FullscreenLayout: React.FC<AppLayoutProps> = ({
  children,
  ...rest
}) => {
  return <AppLayout {...rest}>{children}</AppLayout>
}
