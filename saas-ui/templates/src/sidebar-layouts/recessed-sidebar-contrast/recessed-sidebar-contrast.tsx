import * as React from 'react'

import {
  Avatar,
  Badge,
  Box,
  Button,
  DarkMode,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorMode,
} from '@chakra-ui/react'

import {
  RiAddLine,
  RiCodeBoxFill,
  RiExpandUpDownLine,
  RiFeedbackFill,
  RiFolder4Fill,
  RiFolderWarningFill,
  RiInbox2Fill,
  RiLightbulbFill,
  RiMarkupFill,
  RiSearch2Line,
  RiTaskFill,
} from 'react-icons/ri'

import {
  AppShell,
  Sidebar,
  NavGroup,
  NavItem,
  SidebarSection,
  SidebarToggleButton,
} from '@saas-ui/react'
import { Page, PageHeader, Toolbar, ToolbarButton } from '@saas-ui-pro/react'
import { SaasUIIcon } from '@saas-ui/assets'

const favourites = [
  {
    id: 'design',
    name: 'Design',
    count: 83,
    color: 'purple.400',
    icon: <Icon as={RiMarkupFill} fill="purple.400" boxSize="1.2em" />,
  },
  {
    id: 'code',
    name: 'Code',
    count: 210,
    icon: <Icon as={RiCodeBoxFill} boxSize="1.2em" />,
  },
  {
    id: 'important',
    name: 'Important',
    count: 12,
    color: 'red.400',
    icon: <Icon as={RiFolderWarningFill} fill="red.400" boxSize="1.2em" />,
  },
  {
    id: 'feedback',
    name: 'Feedback',
    count: 10,
    color: 'yellow.400',
    icon: <Icon as={RiFeedbackFill} fill="yellow.400" boxSize="1.2em" />,
  },
]

export const RecessedSidebarContrast = () => {
  const { colorMode } = useColorMode()

  const Wrapper = colorMode === 'light' ? DarkMode : React.Fragment

  return (
    <AppShell
      variant="static"
      height="600px"
      bg="black"
      _dark={{ bg: 'black' }}
      sidebar={
        <Wrapper>
          <Sidebar bg="black" _dark={{ bg: 'black' }} borderRightWidth="0">
            <SidebarSection pt="3">
              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={
                    <Avatar
                      icon={<SaasUIIcon width="14px" color="white" />}
                      bg="primary.500"
                      size="sm"
                    />
                  }
                  rightIcon={
                    <Icon as={RiExpandUpDownLine} color="muted" size="1em" />
                  }
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
                  icon={<Icon as={RiInbox2Fill} boxSize="1.2em" />}
                >
                  Inbox
                </NavItem>
                <NavItem
                  href="#"
                  icon={<Icon as={RiTaskFill} boxSize="1.2em" />}
                  isActive
                >
                  My tasks
                </NavItem>
                <NavItem
                  href="#"
                  icon={<Icon as={RiFolder4Fill} boxSize="1.2em" />}
                >
                  Views
                </NavItem>
                <NavItem
                  href="#"
                  icon={<Icon as={RiLightbulbFill} boxSize="1.2em" />}
                >
                  Insights
                </NavItem>
              </NavGroup>

              <NavGroup title="Favourites" isCollapsible>
                {favourites.map((item) => (
                  <NavItem key={item.id} my="0" icon={item.icon}>
                    <Text>{item.name}</Text>
                    <Badge
                      opacity="0.6"
                      borderRadius="full"
                      bg="none"
                      ms="auto"
                      fontWeight="medium"
                    >
                      {item.count}
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
        </Wrapper>
      }
    >
      <Page
        variant="plain"
        mt="4"
        boxShadow="0 0 6px 0 rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        borderTopLeftRadius="md"
        bg="app-background"
        zIndex={{ base: undefined, lg: 'base' }}
      >
        <PageHeader
          title="My tasks"
          nav={
            <Box w={{ base: '9', lg: '0' }}>
              <SidebarToggleButton
                top="7"
                left="3"
                sx={{
                  '&[data-state=open]': {
                    color: 'white',
                    _hover: {
                      bg: 'whiteAlpha.200',
                    },
                  },
                }}
              />
            </Box>
          }
          toolbar={
            <Toolbar>
              <ToolbarButton
                label="Search"
                icon={<RiSearch2Line size="1.2em" />}
                rounded="full"
              />
              <ToolbarButton
                label="Add person"
                icon={<RiAddLine size="1.2em" />}
                variant="solid"
                colorScheme="neutral"
                rounded="full"
              />
            </Toolbar>
          }
          footer={
            <Tabs variant="segments-solid" size="xs">
              <TabList>
                <Tab>Assigned</Tab>
                <Tab>Created</Tab>
                <Tab>Subscribed</Tab>
              </TabList>
            </Tabs>
          }
        />
      </Page>
    </AppShell>
  )
}
