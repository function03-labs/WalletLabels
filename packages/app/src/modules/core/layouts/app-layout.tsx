import * as React from 'react'
import { useRouter } from 'next/router'

import { Flex, Container } from '@chakra-ui/react'

import { PageShell, PageShellProps } from '@saas-ui/pro'
import { Loading, HotkeysListOptions } from '@saas-ui/react'
import { useAuth, Auth } from '@saas-ui/auth'
import { Hotkeys } from '@modules/core/components/hotkeys'
import Link from '@modules/core/components/link'
import { Logo } from '@modules/core/components/logo'

import { Sidebar } from '@modules/core/components/sidebar'
import { SettingsSidebar } from '@modules/settings/components/sidebar'

import { authType, authProviders, authPaths } from '@app/config/auth'
import { settingsHotkeys, fullscreenHotkeys } from '@app/config/hotkeys'

import { useGetCurrentUserQuery } from '@app/graphql'

export const Authenticated: React.FC = ({ children, ...rest }) => {
  const { isLoading, isAuthenticated, isLoggingIn } = useAuth()
  const router = useRouter()

  // Load current user and tenant data
  const currentUser = useGetCurrentUserQuery(
    {},
    {
      enabled: isAuthenticated,
    },
  )

  const { view, title } = authPaths[router.pathname]
    ? authPaths[router.pathname]
    : authPaths['/login']

  if (isLoading || isLoggingIn || (isAuthenticated && !currentUser.isFetched)) {
    return <Loading />
  } else if (!isAuthenticated) {
    return (
      <AuthLayout>
        <Container>
          <Logo margin="0 auto" mb="12" />
          <Auth
            title={title}
            providers={authProviders}
            view={view}
            type={authType}
            signupLink={
              <Link href="/signup">Don't have an account yet? Sign up.</Link>
            }
            loginLink={
              <Link href="/login">Already have an account? Log in.</Link>
            }
            {...rest}
          />
        </Container>
      </AuthLayout>
    )
  }

  return <>{children}</>
}

export const AuthLayout: React.FC = ({ children, ...rest }) => {
  return (
    <Flex minH="100vh" align="center" justify="center" {...rest}>
      {children}
    </Flex>
  )
}

interface LayoutProps extends PageShellProps {
  hotkeys: HotkeysListOptions
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  hotkeys,
  sidebar,
  ...rest
}) => {
  return (
    <Authenticated>
      <Hotkeys hotkeys={hotkeys}>
        <PageShell sidebar={sidebar} {...rest}>
          {children}
        </PageShell>
      </Hotkeys>
    </Authenticated>
  )
}

export const DefaultLayout: React.FC<LayoutProps> = ({
  children,
  sidebar = <Sidebar />,
  ...rest
}) => {
  return (
    <Layout sidebar={sidebar} {...rest}>
      {children}
    </Layout>
  )
}

export const SettingsLayout: React.FC<LayoutProps> = ({
  children,
  hotkeys = settingsHotkeys,
  ...rest
}) => {
  return (
    <Layout hotkeys={hotkeys} {...rest} sidebar={<SettingsSidebar />}>
      {children}
    </Layout>
  )
}

export const FullscreenLayout: React.FC<LayoutProps> = ({
  children,
  hotkeys = fullscreenHotkeys,
  ...rest
}) => {
  return (
    <Layout hotkeys={hotkeys} {...rest}>
      {children}
    </Layout>
  )
}

export const PublicLayout: React.FC<PageShellProps> = ({
  children,
  ...rest
}) => {
  return <PageShell {...rest}>{children}</PageShell>
}

interface AppLayoutProps {
  children: React.ReactNode
  publicRoutes?: Array<string>
  isPublic?: boolean
  layout?: React.ReactNode
  sidebar?: React.ReactNode
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  publicRoutes = [],
  isPublic,
  layout,
  ...rest
}) => {
  const router = useRouter()
  const isPublicRoute = publicRoutes.indexOf(router.pathname) !== -1 || isPublic

  let LayoutComponent
  if (isPublicRoute) {
    LayoutComponent = PublicLayout
  } else if (typeof layout === 'function') {
    LayoutComponent = layout
  } else {
    switch (layout) {
      case 'settings':
        LayoutComponent = SettingsLayout
        break
      case 'fullscreen':
        LayoutComponent = FullscreenLayout
        break
      default:
        LayoutComponent = DefaultLayout
    }
  }

  return (
    <Flex
      position="absolute"
      w="100vw"
      h="100vh"
      fontSize="sm"
      flexDirection="column"
    >
      <LayoutComponent flex="1" minH="0" {...rest}>
        {children}
      </LayoutComponent>
    </Flex>
  )
}

export default AppLayout
