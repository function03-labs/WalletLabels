import * as React from 'react'

import {
  Avatar,
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
  Tab,
  TabList,
  Tabs,
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
  SearchIcon,
  PlusIcon,
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
import {
  Page,
  PageHeader,
  PageTitle,
  Toolbar,
  ToolbarButton,
} from '@saas-ui-pro/react'
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

export const RecessedSidebar = () => {
  return (
    <AppShell
      variant="static"
      height="600px"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
      sidebar={
        <Sidebar bg="gray.50" _dark={{ bg: 'gray.900' }} borderRightWidth="0">
          <SidebarSection pt="3">
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={
                  <Avatar
                    icon={<SaasUIIcon width="14px" color="currentColor" />}
                    bg="neutral"
                    color="neutral-fg"
                    size="sm"
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
          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto" pb="8">
            <NavGroup isCollapsible={false}>
              <NavItem
                href="#"
                icon={<UsersIcon />}
                isActive
                variant="left-accent"
              >
                Contacts
              </NavItem>
              <NavItem href="#" icon={<ListChecksIcon />} variant="left-accent">
                Tasks
              </NavItem>
              <NavItem href="#" icon={<LightbulbIcon />} variant="left-accent">
                Insights
              </NavItem>
            </NavGroup>

            <NavGroup title="Tags" isCollapsible>
              {tags.map((tag) => (
                <NavItem
                  key={tag.id}
                  my="0"
                  variant="left-accent"
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
      <Page
        variant="plain"
        mt="4"
        boxShadow="0 0 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        borderTopLeftRadius="md"
        bg="white"
        zIndex={{ base: undefined, lg: 'base' }}
        _dark={{
          bg: 'black',
        }}
      >
        <PageHeader
          title="Contacts"
          nav={
            <Box w={{ base: '9', lg: '0' }}>
              <SidebarToggleButton top="7" left="3" />
            </Box>
          }
          toolbar={
            <Toolbar>
              <ToolbarButton
                label="Search"
                icon={<SearchIcon size="1.2em" />}
                rounded="full"
              />
              <ToolbarButton
                label="Add person"
                icon={<PlusIcon size="1.2em" />}
                variant="primary"
                rounded="full"
              />
            </Toolbar>
          }
          footer={
            <Tabs mx="-4" colorScheme="primary">
              <TabList px="4" borderBottomWidth="1px">
                <Tab>All</Tab>
                <Tab>Leads</Tab>
                <Tab>Customers</Tab>
              </TabList>
            </Tabs>
          }
        />
      </Page>
    </AppShell>
  )
}
