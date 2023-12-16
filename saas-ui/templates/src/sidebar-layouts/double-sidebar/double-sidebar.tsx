import * as React from 'react'

import {
  Badge,
  Box,
  ColorModeProvider,
  DarkMode,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useColorMode,
} from '@chakra-ui/react'

import {
  LuHome,
  LuUsers,
  LuSettings,
  LuContact,
  LuHeartHandshake,
  LuLightbulb,
  LuListChecks,
  LuHelpCircle,
} from 'react-icons/lu'

import {
  AppShell,
  PersonaAvatar,
  Sidebar,
  NavGroup,
  NavItem,
  SidebarSection,
  SidebarToggleButton,
} from '@saas-ui/react'
import { SaasUIIcon } from '@saas-ui/assets'
import { Page, PageBody, PageHeader } from '@saas-ui-pro/react'

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

export const DoubleSidebar: React.FC = () => {
  const { colorMode } = useColorMode()

  // Override the tooltip theme back to the active color mode, instead of darkmode.
  const tooltipProps: any = {
    ['data-theme']: colorMode,
  }

  return (
    <AppShell
      variant="static"
      height="600px"
      sidebar={
        <HStack spacing="0" alignItems="stretch" bg="primary.900">
          <DarkMode>
            <Sidebar
              variant="compact"
              bg="primary.800"
              borderWidth="0"
              spacing="3"
              _dark={{
                bg: 'primary.900',
              }}
            >
              <SidebarSection alignItems="center" mb="2" height="24px">
                <SidebarToggleButton
                  zIndex="1401"
                  display={{ base: 'flex', lg: 'none' }}
                  left={3}
                />
                <Box display={{ base: 'none', lg: 'block' }}>
                  <SaasUIIcon height="24px" color="currentColor" />
                </Box>
              </SidebarSection>
              <SidebarSection flex="1">
                <NavItem
                  href="#"
                  icon={<LuHome size="1.2em" />}
                  tooltipProps={tooltipProps}
                >
                  Home
                </NavItem>
                <NavItem
                  href="#"
                  icon={<LuUsers size="1.2em" />}
                  tooltipProps={tooltipProps}
                  isActive
                >
                  Contacts
                </NavItem>
                <NavItem
                  href="#"
                  icon={<LuSettings size="1.2em" />}
                  tooltipProps={tooltipProps}
                >
                  Settings
                </NavItem>
              </SidebarSection>
              <SidebarSection gap="2">
                <NavItem
                  icon={<LuHelpCircle size="1.2em" />}
                  tooltipProps={tooltipProps}
                >
                  Help &amp; Support
                </NavItem>
                <Menu>
                  <MenuButton>
                    <PersonaAvatar
                      name="Beatriz Oliveira"
                      src="/showcase-avatar.jpg"
                      size="xs"
                      presence="online"
                    />
                  </MenuButton>
                  <ColorModeProvider>
                    <Portal>
                      <MenuList>
                        <MenuGroup title="beatriz@saas-ui.dev">
                          <MenuItem>Account</MenuItem>
                          <MenuDivider />
                          <MenuItem>Log out</MenuItem>
                        </MenuGroup>
                      </MenuList>
                    </Portal>
                  </ColorModeProvider>
                </Menu>
              </SidebarSection>
            </Sidebar>
          </DarkMode>
          <Sidebar borderTopLeftRadius="md">
            <SidebarSection direction="row" mt="2" px="4" mb="2">
              <Heading size="sm" fontWeight="semibold">
                Contacts
              </Heading>
            </SidebarSection>
            <SidebarSection flex="1" overflowY="auto" pb="8">
              <NavGroup>
                <NavItem href="#" icon={<LuUsers />} isActive>
                  Overview
                </NavItem>
                <NavItem href="#" icon={<LuListChecks />}>
                  Tasks
                </NavItem>
                <NavItem href="#" icon={<LuLightbulb />}>
                  Insights
                </NavItem>
              </NavGroup>

              <NavGroup title="Teams" isCollapsible>
                <NavItem href="#" icon={<LuContact />}>
                  Sales
                </NavItem>
                <NavItem href="#" icon={<LuHeartHandshake />}>
                  Support
                </NavItem>
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
          </Sidebar>
        </HStack>
      }
    >
      <Page>
        <PageHeader title="Overview" />
        <PageBody></PageBody>
      </Page>
    </AppShell>
  )
}
