import * as React from 'react'

import { Box, Spacer } from '@chakra-ui/react'

import {
  FiHome,
  FiPlus,
  FiInbox,
  FiHelpCircle,
  FiHash,
  FiUsers,
  FiSearch,
} from 'react-icons/fi'

import {
  Sidebar,
  SidebarProps,
  SidebarNav,
  SidebarLink,
  SidebarNavGroup,
  SidebarOverflow,
  Command,
  ResizeHandler,
  SidebarLinkProps,
} from '@saas-ui/pro'

import { useActivePath, useNavigate } from '@saas-ui/router'

import {
  IconButton,
  MenuItem,
  MenuDivider,
  useModals,
  useLocalStorage,
  useHotkeysShortcut,
} from '@saas-ui/react'

import { BillingStatus } from '../billing-status'
import { TenantMenu } from '../tenant-menu'
import { UserMenu } from '../user-menu'
import { ElectronNav } from '../electron-nav'

import { MembersInviteDialog } from '@app/features/organizations/components/members-invite-dialog'
import { usePath } from '@app/features/core/hooks/use-path'

import { GlobalSearchInput } from '../global-search'

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
    <>
      <Sidebar
        variant={variant}
        colorScheme={colorScheme}
        isResizable
        onResize={onResize}
        defaultWidth={width}
        {...props}
      >
        <ElectronNav />
        <SidebarNav direction="row">
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
        </SidebarNav>
        <Box px={4}>
          {isCondensed ? (
            <IconButton icon={<FiSearch />} aria-label="Search" />
          ) : (
            <GlobalSearchInput />
          )}
        </Box>
        <SidebarOverflow>
          <SidebarNav flex="1" spacing={6}>
            <SidebarNavGroup>
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
            </SidebarNavGroup>

            {!isCondensed && (
              <SidebarNavGroup title="Tags" isCollapsible>
                <SidebarLink
                  href={usePath('contacts/tag/design-system')}
                  label="Design system"
                  icon={<FiHash />}
                />
                <SidebarLink
                  href={usePath('contacts/framework')}
                  label="Framework"
                  icon={<FiHash />}
                />
                <SidebarLink
                  href={usePath('contacts/tag/chakra-ui')}
                  label="Chakra UI"
                  inset={5}
                  icon={<FiHash />}
                />
                <SidebarLink
                  href={usePath('contacts/tag/react')}
                  label="React"
                  inset={5}
                  icon={<FiHash />}
                />
              </SidebarNavGroup>
            )}

            <Spacer />

            <SidebarNavGroup>
              <SidebarLink
                onClick={() =>
                  modals.open({
                    title: 'Invite people',
                    component: MembersInviteDialog,
                  })
                }
                label="Invite people"
                color="sidebar-muted"
                icon={<FiPlus />}
              />
              <SidebarLink
                href="https://saas-ui.dev/docs"
                label="Documentation"
                color="sidebar-muted"
                icon={<FiHelpCircle />}
              />
            </SidebarNavGroup>
          </SidebarNav>
        </SidebarOverflow>

        {isCondensed ? (
          <SidebarNav>
            <UserMenu />
          </SidebarNav>
        ) : (
          <BillingStatus />
        )}
      </Sidebar>
    </>
  )
}

interface AppSidebarlink extends SidebarLinkProps {
  hotkey: string
  href: string
}

const AppSidebarLink: React.FC<AppSidebarlink> = (props) => {
  const { href, label, hotkey, ...rest } = props
  const navigate = useNavigate()

  const command = useHotkeysShortcut(
    hotkey,
    () => {
      navigate(href)
    },
    [href],
  )

  return (
    <SidebarLink
      href={href}
      label={label}
      {...rest}
      tooltip={
        <>
          {label} <Command>{command}</Command>
        </>
      }
    />
  )
}
