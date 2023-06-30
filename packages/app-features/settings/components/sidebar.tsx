import * as React from 'react'
import { Heading, useBreakpointValue } from '@chakra-ui/react'
import { FiFolder, FiUser } from 'react-icons/fi'

import {
  NavGroup,
  NavItem,
  NavItemProps,
  Sidebar,
  SidebarOverlay,
  SidebarSection,
  SidebarToggleButton,
  useHotkeysShortcut,
  useLocalStorage,
} from '@saas-ui/react'

import {
  BackButton,
  Resizer,
  ResizeHandler,
  ResizeHandle,
} from '@saas-ui-pro/react'

import { usePath } from '@app/features/core/hooks/use-path'
import { Has } from '@saas-ui-pro/feature-flags'

import { ElectronNav, useHelpCenter } from '@ui/lib'

import { useActivePath } from '@app/nextjs'

const SettingsLink = (props: NavItemProps & { path: string }) => {
  const { path, ...rest } = props
  const href = usePath(`/settings${path}`)
  return (
    <NavItem inset={5} href={href} isActive={useActivePath(href)} {...rest} />
  )
}

export const SettingsSidebar = () => {
  const backRef = React.useRef<HTMLButtonElement>(null)

  const help = useHelpCenter()

  useHotkeysShortcut('general.help', () => {
    help.open()
  })

  useHotkeysShortcut('settings.close', () => {
    // Simply triggering a click here, so we don't need to reference the router.
    backRef.current?.click()
  })

  const [width, setWidth] = useLocalStorage('app.sidebar.width', 280)

  const onResize: ResizeHandler = ({ width }) => {
    setWidth(width)
  }

  return (
    <Resizer
      defaultWidth={width}
      onResize={onResize}
      isResizable={useBreakpointValue(
        { base: false, lg: true },
        { fallback: 'lg' },
      )}
    >
      <Sidebar>
        <SidebarToggleButton />
        <ElectronNav />

        <SidebarSection direction="row" alignItems="center">
          <BackButton href={usePath()} ref={backRef} />
          <Heading as="h1" fontSize="xl">
            Settings
          </Heading>
        </SidebarSection>
        <SidebarSection flex="1" overflowY="auto">
          <Has feature="settings">
            <NavGroup title="Organization" icon={<FiFolder />}>
              <SettingsLink path="/">Overview</SettingsLink>
              <SettingsLink path="/organization">Organization</SettingsLink>
              <SettingsLink path="/members">Members</SettingsLink>
              <SettingsLink path="/plans">Plans</SettingsLink>
              <SettingsLink path="/billing">Billing</SettingsLink>
            </NavGroup>
          </Has>

          <NavGroup title="Account" icon={<FiUser />}>
            <SettingsLink path="/account">Profile</SettingsLink>
            <SettingsLink path="/account/security">Security</SettingsLink>
            <SettingsLink path="/account/notifications">
              Notifications
            </SettingsLink>
            <SettingsLink path="/account/api">Api</SettingsLink>
          </NavGroup>
        </SidebarSection>
        <SidebarOverlay />
        <ResizeHandle />
      </Sidebar>
    </Resizer>
  )
}
