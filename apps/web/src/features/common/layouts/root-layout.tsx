'use client'

import * as React from 'react'

import { Container } from '@chakra-ui/react'
import { Auth, AuthProps } from '@saas-ui/auth'
import { usePathname, Link } from '@app/nextjs'
import { BillingProvider } from '@saas-ui-pro/billing'

import { authType, authProviders, authPaths } from '@app/config'

import { Logo, AppLoader } from '@ui/lib'

import { AuthLayout } from './auth-layout'
import { PublicLayout } from './public-layout'

import { useInitApp } from '../hooks/use-init-app'

/**
 * Wrapper component for Authenticated pages.
 *
 * Loads the minimal required user data for the app and
 * renders authentication screens when the user isn't authenticated.
 */
export const Authenticated: React.FC<AuthProps> = ({ children, ...rest }) => {
  const pathname = usePathname()

  const { isInitializing, isAuthenticated, billing } = useInitApp()

  const { view, title } = authPaths[pathname || '/login'] || authPaths['/login']

  // Rendering the auth screens here so they are rendered in place,
  // on the current route, without the need to redirect.
  if (!isInitializing && !isAuthenticated) {
    return (
      <AuthLayout>
        <Container>
          <Logo margin="0 auto" mb="12" />
          <Auth
            title={title}
            providers={authProviders}
            view={view}
            type={authType}
            signupLink={<Link href="/signup">Sign up</Link>}
            loginLink={<Link href="/login">Log in</Link>}
            {...rest}
          />
        </Container>
      </AuthLayout>
    )
  }

  return (
    <BillingProvider value={billing}>
      <AppLoader isLoading={isInitializing} />
      {!isInitializing && children}
    </BillingProvider>
  )
}

interface AppLayoutProps {
  children: React.ReactNode
  /**
   * Array of paths that should render the public layout.
   */
  publicRoutes?: Array<string>
  /**
   * Render the public layout.
   */
  isPublic?: boolean
  /**
   * The sidebar component.
   */
  sidebar?: React.ReactElement
}

/**
 * Root Application layout
 */
export const RootLayout: React.FC<AppLayoutProps> = ({
  children,
  publicRoutes = [],
  isPublic,
}) => {
  const pathname = usePathname()

  const isPublicRoute = publicRoutes.indexOf(pathname) !== -1 || isPublic

  if (isPublicRoute) {
    return <PublicLayout>{children}</PublicLayout>
  }

  return <Authenticated>{children}</Authenticated>
}
