import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import { FiFolder, FiUser } from 'react-icons/fi'

import { useHotkeysShortcut } from '@saas-ui/hotkeys'

import {
  Sidebar as SidebarContainer,
  SidebarNav,
  SidebarLink,
  SidebarNavGroup,
  SidebarOverflow,
  SidebarLinkProps,
  BackButton,
} from '@saas-ui/pro'

import { usePath } from '@modules/core/hooks/use-path'

const SettingsLink = (props: SidebarLinkProps & { path: string }) => {
  const { path, ...rest } = props
  return <SidebarLink inset={5} href={usePath(`/settings${path}`)} {...rest} />
}

export const SettingsSidebar = () => {
  const backRef = React.useRef<HTMLButtonElement>(null)

  useHotkeysShortcut('settings.close', () => {
    // Simply triggering a click here, so we don't need to reference the router.
    backRef.current?.click()
  })

  return (
    <>
      <SidebarContainer>
        <SidebarOverflow>
          <SidebarNav direction="row" alignItems="center" mb="8">
            <BackButton href={usePath()} ref={backRef} />
            <Heading as="h1" fontSize="xl">
              Settings
            </Heading>
          </SidebarNav>
          <SidebarNav flex="1" spacing={6}>
            <SidebarNavGroup title="Organization" icon={<FiFolder />}>
              <SettingsLink path="/" label="Overview" />
              <SettingsLink path="/organization" label="Organization" />
              <SettingsLink path="/members" label="Members" />
              <SettingsLink path="/plans" label="Plans" />
              <SettingsLink path="/billing" label="Billing" />
            </SidebarNavGroup>

            <SidebarNavGroup title="Account" icon={<FiUser />}>
              <SettingsLink path="/account" label="Profile" />
              <SettingsLink path="/account/security" label="Security" />
              <SettingsLink
                path="/account/notifications"
                label="Notifications"
              />
              <SettingsLink path="/account/api" label="Api" />
            </SidebarNavGroup>
          </SidebarNav>
        </SidebarOverflow>
      </SidebarContainer>
    </>
  )
}
