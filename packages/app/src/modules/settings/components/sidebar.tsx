import { Heading } from '@chakra-ui/react'

import {
  Sidebar as SidebarContainer,
  SidebarNav,
  SidebarLink,
  SidebarNavGroup,
  SidebarOverflow,
  SidebarLinkProps,
} from '@saas-ui/page-shell'

import { BackButton } from '@saas-ui/page'

import { useHotkeysShortcut } from '@saas-ui/hotkeys'

import { FiFolder, FiUser } from 'react-icons/fi'

import { useRouter } from 'next/router'

const SettingsLink = (props: SidebarLinkProps & { path: string }) => {
  const router = useRouter()
  const { path, ...rest } = props
  const href = `/app/${router.query.slug}/settings/${path}`
    .replace(/\/\//, '/')
    .replace(/\/$/, '')
  return <SidebarLink inset={5} href={href} {...rest} />
}

export const SettingsSidebar = () => {
  const router = useRouter()
  useHotkeysShortcut('settings.close', () => {
    router.push('/app')
  })

  return (
    <>
      <SidebarContainer>
        <SidebarOverflow>
          <SidebarNav direction="row" alignItems="center" mb="8">
            <BackButton onClick={() => router.push('/app')} />
            <Heading as="h1" fontSize="xl">
              Settings
            </Heading>
          </SidebarNav>
          <SidebarNav flex="1" spacing={6}>
            <SidebarNavGroup title="Organization" icon={<FiFolder />}>
              <SettingsLink path="/" label="Overview" />
              <SettingsLink path="organization" label="Organization" />
              <SettingsLink path="billing" label="Billing" />
            </SidebarNavGroup>

            <SidebarNavGroup title="Account" icon={<FiUser />}>
              <SettingsLink path="account" label="Profile" />
              <SettingsLink path="account/security" label="Security" />
              <SettingsLink
                path="account/notifications"
                label="Notifications"
              />
              <SettingsLink path="account/api" label="Api" />
            </SidebarNavGroup>
          </SidebarNav>
        </SidebarOverflow>
      </SidebarContainer>
    </>
  )
}
