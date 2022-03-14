import * as React from 'react'
import { useRouter } from 'next/router'

import { Flex, Container } from '@chakra-ui/react'

import { AppShell, AppShellProps } from '@saas-ui/pro'
import { HotkeysListOptions } from '@saas-ui/react'
import { Auth } from '@saas-ui/auth'
import { Hotkeys } from '@modules/core/components/hotkeys'
import { Link } from '@modules/core/components/link'
import { Logo } from '@modules/core/components/logo'

import { AppSidebar } from '@modules/core/components/sidebar'
import { SettingsSidebar } from '@modules/settings/components/sidebar'

import { authType, authProviders, authPaths } from '@app/config/auth'
import { settingsHotkeys, fullscreenHotkeys } from '@app/config/hotkeys'

import { useInitApp } from '../hooks/use-init-app'

import { AppLoader } from '../components/app-loader'

export const Authenticated: React.FC = ({ children, ...rest }) => {
  const router = useRouter()

  const { isInitializing, isAuthenticated } = useInitApp()

  const { view, title } = authPaths[router.pathname]
    ? authPaths[router.pathname]
    : authPaths['/login']

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
    <>
      <AppLoader isLoading={isInitializing} />
      {!isInitializing && children}
    </>
  )
}

export const AuthLayout: React.FC = ({ children, ...rest }) => {
  return (
    <Flex minH="100vh" align="center" justify="center" {...rest}>
      {children}
    </Flex>
  )
}

interface LayoutProps extends AppShellProps {
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
        <AppShell sidebar={sidebar} {...rest}>
          {children}
        </AppShell>
      </Hotkeys>
    </Authenticated>
  )
}

export const DefaultLayout: React.FC<LayoutProps> = ({
  children,
  sidebar = <AppSidebar />,
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

export const PublicLayout: React.FC<AppShellProps> = ({
  children,
  ...rest
}) => {
  return <AppShell {...rest}>{children}</AppShell>
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
