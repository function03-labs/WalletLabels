import * as React from 'react'

import {
  Badge,
  Box,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'

import {
  HomeIcon,
  UsersIcon,
  SettingsIcon,
  HelpCircleIcon,
  ContactIcon,
  HeartHandshakeIcon,
  LightbulbIcon,
  ListChecksIcon,
} from 'lucide-react'

import {
  AppShell,
  PersonaAvatar,
  Sidebar,
  NavGroup,
  NavItem,
  SidebarSection,
} from '@saas-ui/react'
import { Logo } from '../../logo'
import { Page, PageHeader, PageTitle } from '@saas-ui-pro/react'

const tags = [
  {
    id: 'lead',
    name: 'Lead',
    count: 83,
    color: 'purple.500',
  },
  {
    id: 'customer',
    name: 'Customer',
    count: 210,
    color: 'green.500',
  },
  {
    id: 'partner',
    name: 'Partner',
    count: 12,
    color: 'blue.500',
  },
  {
    id: 'prospect',
    name: 'Prospect',
    count: 0,
  },
]

export const DoubleSidebar = () => {
  return (
    <AppShell
      variant="static"
      height="680px"
      sidebar={
        <HStack spacing="0" alignItems="stretch">
          <Sidebar
            variant="compact"
            bg="gray.50"
            _dark={{ bg: 'gray.800' }}
            borderWidth="0"
            spacing="3"
          >
            <SidebarSection alignItems="center" mb="2">
              <Logo width="24px" color="black" _dark={{ color: 'white' }} />
            </SidebarSection>
            <SidebarSection flex="1">
              <NavItem icon={<HomeIcon size="1.2em" />}>Home</NavItem>
              <NavItem icon={<UsersIcon size="1.2em" />} isActive>
                Contacts
              </NavItem>
              <NavItem icon={<SettingsIcon size="1.2em" />}>Settings</NavItem>
            </SidebarSection>
            <SidebarSection alignItems="center">
              <Menu>
                <MenuButton>
                  <PersonaAvatar
                    name="Beatriz Oliveira"
                    src="/showcase-avatar.jpg"
                    size="xs"
                    presence="online"
                  />
                </MenuButton>
                <MenuList>
                  <MenuGroup title="beatriz@saas-ui.dev">
                    <MenuItem>Account</MenuItem>
                    <MenuDivider />
                    <MenuItem>Log out</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </SidebarSection>
          </Sidebar>
          <Sidebar>
            <SidebarSection direction="row" mt="2" px="4" mb="2">
              <Heading size="sm" fontWeight="semibold">
                Contacts
              </Heading>
            </SidebarSection>
            <SidebarSection flex="1" overflowY="auto">
              <NavGroup>
                <NavItem icon={<UsersIcon />} isActive>
                  Overview
                </NavItem>
                <NavItem icon={<ListChecksIcon />}>Tasks</NavItem>
                <NavItem icon={<LightbulbIcon />}>Insights</NavItem>
              </NavGroup>

              <NavGroup title="Teams" isCollapsible>
                <NavItem icon={<ContactIcon />}>Sales</NavItem>
                <NavItem icon={<HeartHandshakeIcon />}>Support</NavItem>
              </NavGroup>

              <NavGroup title="Tags" isCollapsible>
                {tags.map((tag) => (
                  <NavItem
                    key={tag.id}
                    id={tag.id}
                    my="0"
                    icon={
                      <Badge
                        bg={tag.color || 'gray.500'}
                        boxSize="2"
                        borderRadius="full"
                      />
                    }
                  >
                    <Text>{tag.name}</Text>
                    <Badge
                      opacity="0.6"
                      borderRadius="full"
                      bg="none"
                      ms="auto"
                      fontWeight="medium"
                    >
                      {tag.count}
                    </Badge>
                  </NavItem>
                ))}
              </NavGroup>
            </SidebarSection>
            <SidebarSection>
              <NavItem icon={<HelpCircleIcon />}>Help &amp; Support</NavItem>
            </SidebarSection>
          </Sidebar>
        </HStack>
      }
    >
      <Page>
        <PageHeader title="Overview"></PageHeader>
      </Page>
    </AppShell>
  )
}
