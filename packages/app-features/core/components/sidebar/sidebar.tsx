import * as React from 'react'

import { Box, Spacer, useBreakpointValue } from '@chakra-ui/react'

import {
  FiHome,
  FiPlus,
  FiInbox,
  FiHelpCircle,
  FiHash,
  FiUsers,
  FiSearch,
} from 'react-icons/fi'

import { Command, Resizer, ResizeHandle, ResizeHandler } from '@saas-ui/pro'

import {
  Sidebar,
  SidebarProps,
  SidebarOverlay,
  SidebarSection,
  SidebarToggleButton,
  NavItem,
  NavItemProps,
  NavGroup,
} from '@saas-ui/sidebar'

import { useActivePath, useLocation, useNavigate } from '@saas-ui/router'

import {
  IconButton,
  MenuItem,
  MenuDivider,
  useModals,
  useLocalStorage,
  useHotkeysShortcut,
} from '@saas-ui/react'

import { ElectronNav, GlobalSearchInput, InviteDialog } from '@ui/lib'

import { BillingStatus } from '../billing-status'
import { TenantMenu } from '../tenant-menu'
import { UserMenu } from '../user-menu'

import { usePath } from '@app/features/core/hooks/use-path'

export interface AppSidebarProps extends SidebarProps {}

export const AppSidebar: React.FC<AppSidebarProps> = (props) => {
  const modals = useModals()
  const [width, setWidth] = useLocalStorage('app.sidebar.width', 280)

  const { variant, colorScheme } = props
  const isCondensed = variant === 'condensed'

  const onResize: ResizeHandler = ({ width }) => {
    setWidth(width)
  }

  return (
    <Resizer
      defaultWidth={width}
      onResize={onResize}
      isResizable={useBreakpointValue({ base: false, lg: true })}
    >
      <Sidebar variant={variant} colorScheme={colorScheme} {...props}>
        <SidebarToggleButton />
        <ElectronNav />
        <SidebarSection direction="row">
          <TenantMenu title="Organizations">
            <MenuDivider />
            <MenuItem
              href={usePath('settings/organization')}
              label="Organization settings"
            />
            <MenuItem
              href="/app/getting-started"
              label="Create an organization"
            />
          </TenantMenu>
          {!isCondensed && (
            <>
              <Spacer />
              <UserMenu />
            </>
          )}
        </SidebarSection>
        <Box px={4}>
          {isCondensed ? (
            <IconButton icon={<FiSearch />} aria-label="Search" />
          ) : (
            <GlobalSearchInput />
          )}
        </Box>
        <SidebarSection overflowY="auto" flex="1">
          <NavGroup>
            <AppSidebarLink
              href={usePath()}
              label="Dashboard"
              icon={<FiHome />}
              hotkey="navigation.dashboard"
            />
            <AppSidebarLink
              href={usePath('inbox')}
              label="Inbox"
              icon={<FiInbox />}
              hotkey="navigation.inbox"
            />
            <AppSidebarLink
              href={usePath('contacts')}
              isActive={useActivePath('contacts', { end: false })}
              label="Contacts"
              icon={<FiUsers />}
              hotkey="navigation.contacts"
            />
          </NavGroup>

          {!isCondensed && (
            <NavGroup title="Tags" isCollapsible>
              <NavItem
                href={usePath('contacts/tag/design-system')}
                label="Design system"
                icon={<FiHash />}
              />
              <NavItem
                href={usePath('contacts/framework')}
                label="Framework"
                icon={<FiHash />}
              />
              <NavItem
                href={usePath('contacts/tag/chakra-ui')}
                label="Chakra UI"
                inset={5}
                icon={<FiHash />}
              />
              <NavItem
                href={usePath('contacts/tag/react')}
                label="React"
                inset={5}
                icon={<FiHash />}
              />
            </NavGroup>
          )}

          <Spacer />

          <NavGroup>
            <NavItem
              onClick={() =>
                modals.open({
                  title: 'Invite people',
                  component: InviteDialog,
                })
              }
              label="Invite people"
              color="sidebar-muted"
              icon={<FiPlus />}
            />
            <NavItem
              href="https://saas-ui.dev/docs"
              label="Documentation"
              color="sidebar-muted"
              icon={<FiHelpCircle />}
            />
          </NavGroup>
        </SidebarSection>

        {isCondensed ? (
          <SidebarSection>
            <UserMenu />
          </SidebarSection>
        ) : (
          <BillingStatus />
        )}

        <SidebarOverlay />
        <ResizeHandle />
      </Sidebar>
    </Resizer>
  )
}

interface AppSidebarlink extends NavItemProps {
  hotkey: string
  href: string
}

const AppSidebarLink: React.FC<AppSidebarlink> = (props) => {
  const { href, label, hotkey, ...rest } = props
  const navigate = useNavigate()
  const isActive = useActivePath(href)

  const command = useHotkeysShortcut(
    hotkey,
    () => {
      navigate(href)
    },
    [href],
  )

  return (
    <NavItem
      href={href}
      label={label}
      isActive={isActive}
      {...rest}
      tooltip={
        <>
          {label} <Command>{command}</Command>
        </>
      }
    />
  )
}
