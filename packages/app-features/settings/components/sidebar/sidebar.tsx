import * as React from 'react'
import { Heading, useBreakpointValue } from '@chakra-ui/react'
import { FiFolder, FiUser } from 'react-icons/fi'

import {
  useActivePath,
  useHotkeysShortcut,
  useLocalStorage,
} from '@saas-ui/react'

import { BackButton, Resizer, ResizeHandler, ResizeHandle } from '@saas-ui/pro'

import { usePath } from '@app/features/core/hooks/use-path'
import { Has } from '@saas-ui/features'
import { ElectronNav } from '@app/features/core/components/electron-nav'
import {
  NavGroup,
  NavItem,
  NavItemProps,
  Sidebar,
  SidebarOverlay,
  SidebarSection,
  SidebarToggleButton,
} from '@saas-ui/sidebar'

const SettingsLink = (props: NavItemProps & { path: string }) => {
  const { path, ...rest } = props
  const href = usePath(`/settings${path}`)
  return (
    <NavItem inset={5} href={href} isActive={useActivePath(href)} {...rest} />
  )
}

export const SettingsSidebar = () => {
  const backRef = React.useRef<HTMLButtonElement>(null)

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
      isResizable={useBreakpointValue({ base: false, lg: true })}
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
              <SettingsLink path="/" label="Overview" />
              <SettingsLink path="/organization" label="Organization" />
              <SettingsLink path="/members" label="Members" />
              <SettingsLink path="/plans" label="Plans" />
              <SettingsLink path="/billing" label="Billing" />
            </NavGroup>
          </Has>

          <NavGroup title="Account" icon={<FiUser />}>
            <SettingsLink path="/account" label="Profile" />
            <SettingsLink path="/account/security" label="Security" />
            <SettingsLink path="/account/notifications" label="Notifications" />
            <SettingsLink path="/account/api" label="Api" />
          </NavGroup>
        </SidebarSection>
        <SidebarOverlay />
        <ResizeHandle />
      </Sidebar>
    </Resizer>
  )
}
