import * as React from 'react'

import {
  AvatarGroup,
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
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
  ChevronsUpDownIcon,
  BellIcon,
} from 'lucide-react'

import {
  AppShell,
  PersonaAvatar,
  Sidebar,
  NavGroup,
  NavItem,
  SidebarSection,
  Navbar,
  NavbarContent,
  SearchInput,
  NavbarBrand,
  NavbarItem,
  IconBadge,
  StructuredList,
  StructuredListItem,
  StructuredListCell,
  SidebarToggleButton,
} from '@saas-ui/react'
import { Page, PageHeader, PageTitle } from '@saas-ui-pro/react'
import { SaasUIIcon } from '@saas-ui/assets'

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

export const SidebarWithNavbar = () => {
  return (
    <AppShell
      variant="static"
      height="600px"
      bg="app-background"
      navbar={
        <Navbar
          borderBottomWidth="1px"
          justifyContent="start"
          alignItems="start"
        >
          <NavbarContent as={Box} spacing="6" ms={{ base: 10, lg: 0 }}>
            <NavbarItem width="254px" ms="-3">
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    <IconBadge
                      icon={<SaasUIIcon width="16px" color="white" />}
                      variant="solid"
                      bg="black"
                      boxSize="7"
                    />
                  }
                  rightIcon={<ChevronsUpDownIcon size="1em" />}
                  variant="ghost"
                  textAlign="left"
                  w="full"
                  h="10"
                  px="2"
                >
                  Acme Corp
                </MenuButton>
                <MenuList>
                  <MenuItem>Acme Corp</MenuItem>
                  <MenuDivider />
                  <MenuItem>Create workspace</MenuItem>
                </MenuList>
              </Menu>
            </NavbarItem>
            <NavbarItem flex="1">
              <SearchInput
                size="sm"
                variant="plain"
                bg="gray.100"
                _dark={{ bg: 'whiteAlpha.100' }}
              />
            </NavbarItem>
          </NavbarContent>
          <NavbarContent as="div" justifyContent="end" spacing="3">
            <NavbarItem>
              <AvatarGroup size="sm" max={2}>
                <PersonaAvatar src="/showcase-avatar.jpg" name="Beatriz" />
                <PersonaAvatar name="Eelco" />
                <PersonaAvatar name="Tomasz" />
              </AvatarGroup>
            </NavbarItem>
            <NavbarItem>
              <Popover>
                <PopoverTrigger>
                  <Button
                    aria-label="Notifications"
                    variant="ghost"
                    rounded="full"
                    display="flex"
                    position="relative"
                    px="2"
                  >
                    <BellIcon size="1.2em" />
                    <Badge
                      position="absolute"
                      top="4px"
                      right="4px"
                      bg="red.500"
                      borderRadius="full"
                      boxSize="2"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader display="flex" alignItems="center">
                    <Text>Notifications</Text>
                    <Button size="xs" ml="auto">
                      Mark all read
                    </Button>
                  </PopoverHeader>
                  <PopoverBody p="0">
                    <StructuredList>
                      <StructuredListItem onClick={() => null}>
                        <StructuredListCell width="6">
                          <Badge bg="red.500" borderRadius="full" boxSize="2" />
                        </StructuredListCell>
                        <StructuredListCell flex="1">
                          <Text fontWeight="medium" fontSize="md">
                            Email address is missing
                          </Text>
                          <HStack fontSize="xs" justifyContent="space-between">
                            <Text color="muted" noOfLines={1}>
                              New comment from Eelco
                            </Text>
                            <Text color="muted">2h ago</Text>
                          </HStack>
                        </StructuredListCell>
                      </StructuredListItem>
                      <StructuredListItem onClick={() => null}>
                        <StructuredListCell width="6"></StructuredListCell>
                        <StructuredListCell flex="1">
                          <Text fontSize="md">Close deal with OpenAi</Text>
                          <HStack fontSize="xs" justifyContent="space-between">
                            <Text color="muted" noOfLines={1}>
                              Assigned by Tomasz
                            </Text>
                            <Text color="muted">1d ago</Text>
                          </HStack>
                        </StructuredListCell>
                      </StructuredListItem>
                    </StructuredList>
                  </PopoverBody>
                  <PopoverArrow />
                </PopoverContent>
              </Popover>
            </NavbarItem>
            <NavbarItem>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<SettingsIcon size="1.2em" />}
                  isRound
                  variant="ghost"
                />
                <MenuList>
                  <MenuGroup title="beatriz@saas-ui.dev">
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem>Help &amp; feedback</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem>Log out</MenuItem>
                </MenuList>
              </Menu>
            </NavbarItem>
            <NavbarItem>
              <Button variant="primary">Create</Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      }
      sidebar={
        <Sidebar bg="gray.50" _dark={{ bg: 'gray.800' }}>
          <SidebarToggleButton />
          <SidebarSection flex="1" overflowY="auto" pb="8">
            <NavGroup>
              <NavItem href="#" icon={<UsersIcon />} isActive>
                Overview
              </NavItem>
              <NavItem href="#" icon={<ListChecksIcon />}>
                Tasks
              </NavItem>
              <NavItem href="#" icon={<LightbulbIcon />}>
                Insights
              </NavItem>
            </NavGroup>

            <NavGroup title="Teams" isCollapsible>
              <NavItem href="#" icon={<ContactIcon />}>
                Sales
              </NavItem>
              <NavItem href="#" icon={<HeartHandshakeIcon />}>
                Support
              </NavItem>
            </NavGroup>

            <NavGroup title="Tags" isCollapsible>
              {tags.map((tag) => (
                <NavItem
                  key={tag.id}
                  href="#"
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
            <IconButton
              aria-label="Help &amp; Support"
              isRound
              position="absolute"
              bottom="2"
              variant="outline"
              size="xs"
              bg="app-background"
              zIndex="overlay"
            >
              <span>?</span>
            </IconButton>
          </SidebarSection>
        </Sidebar>
      }
    >
      <Page>
        <PageHeader title="Overview"></PageHeader>
      </Page>
    </AppShell>
  )
}
