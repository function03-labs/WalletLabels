import * as React from 'react'

import { Box, Spacer } from '@chakra-ui/react'

import {
  FiHome,
  FiBox,
  FiLink,
  FiHelpCircle,
  FiHash,
  FiUsers,
} from 'react-icons/fi'

import {
  Sidebar as SidebarContainer,
  SidebarNav,
  SidebarLink,
  SidebarDivider,
  SidebarNavGroup,
  SidebarOverflow,
  useTenancy,
} from '@saas-ui/pro'

import { SearchInput, MenuItem, MenuDivider } from '@saas-ui/react'

import { BillingStatus } from './billing-status'
import { TenantMenu } from './tenant-menu'
import { UserMenu } from './user-menu'
import { ElectronNav } from './electron-nav'

export const Sidebar = () => {
  const { tenant } = useTenancy()

  const getPath = (path?: string) => {
    return path ? `/app/${tenant}/${path}` : `/app/${tenant}`
  }

  return (
    <>
      <SidebarContainer>
        <ElectronNav />
        <SidebarNav direction="row">
          <TenantMenu title="Organizations">
            <MenuDivider />
            <MenuItem
              href={getPath('settings/organization')}
              label="Organization settings"
            />
            <MenuItem
              href="/app/getting-started"
              label="Create an organization"
            />
          </TenantMenu>
          <Spacer />
          <UserMenu />
        </SidebarNav>
        <Box px={4}>
          <SearchInput size="sm" />
        </Box>
        <SidebarOverflow>
          <SidebarNav flex="1" spacing={6}>
            <SidebarNavGroup>
              <SidebarLink
                href={getPath()}
                label="Dashboard"
                icon={<FiHome />}
              />
              <SidebarLink
                href={getPath('contacts')}
                label="Contacts"
                icon={<FiUsers />}
              />
            </SidebarNavGroup>

            <SidebarNavGroup title="Teams" isCollapsible>
              <SidebarLink href="/apps" label="Saas UI" />
              <SidebarLink href="/apps" label="Appulse" />
            </SidebarNavGroup>
            <SidebarNavGroup title="Tags" isCollapsible>
              <SidebarLink
                href="/apps"
                label="Design system"
                icon={<FiHash />}
              />
              <SidebarLink href="/apps" label="Framework" icon={<FiHash />} />
              <SidebarLink
                href="/apps"
                label="Chakra UI"
                inset={5}
                icon={<FiHash />}
              />

              <SidebarLink
                href="/apps"
                label="React"
                inset={5}
                icon={<FiHash />}
              />
            </SidebarNavGroup>

            <Spacer />

            <SidebarNavGroup>
              <SidebarLink
                href="https://saas-ui.dev/docs"
                label="Documentation"
                color="muted"
                icon={<FiHelpCircle />}
              />
            </SidebarNavGroup>
          </SidebarNav>
        </SidebarOverflow>
        <SidebarDivider />
        <BillingStatus />
      </SidebarContainer>
    </>
  )
}
