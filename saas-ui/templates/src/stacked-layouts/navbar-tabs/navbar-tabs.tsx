import { SaasUIIcon } from '@saas-ui/assets'
import { FiChevronDown } from 'react-icons/fi'
import {
  AppShell,
  Navbar,
  NavbarBrand,
  NavbarContent,
  PersonaAvatar,
  SearchInput,
  useScrollPosition,
} from '@saas-ui/react'

import {
  Button,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Stack,
  Skeleton,
  SkeletonText,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Tabs,
  TabList,
  Tab,
  SystemStyleObject,
  Avatar,
  HStack,
  TabProps,
} from '@chakra-ui/react'
import { Page, PageBody } from '@saas-ui-pro/react'
import React, { useEffect, useRef, useState } from 'react'

interface SubNavProps {
  scrollRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

const SubNav: React.FC<SubNavProps> = (props) => {
  const { scrollRef, children } = props

  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    // enable this after the first render, to make sure the scroll position is
    // correct
    setIsEnabled(true)
  }, [])

  const { y } = useScrollPosition({
    elementRef: scrollRef,
    isEnabled,
    callback({ currPos }) {
      setPosition(currPos.y)
    },
  })

  const [position, setPosition] = useState(y)
  const isScrolling = scrollRef.current && position > 40

  const offset = 2

  return (
    <HStack
      position="sticky"
      top={offset}
      zIndex="sticky"
      borderBottomWidth="1px"
      spacing="0"
      sx={{
        '--logo-position': isScrolling ? '0' : '-52px',
        '--logo-opacity': isScrolling ? '1' : '0',
        '--menu-gap': isScrolling ? '0' : '-36px',
      }}
    >
      <HStack mt={-offset} spacing="0" px="6" flex="1" bg="app-background">
        <Box
          opacity="var(--logo-opacity)"
          transform="translate3d(0, var(--logo-position), 0)"
          transition="transform 0.2s ease-out, opacity 0.2s"
        >
          <SaasUIIcon height="24px" />
        </Box>
        <Tabs
          size="md"
          transform="translate3d(var(--menu-gap), 0, 0)"
          transition="transform 0.2s ease-out"
        >
          <TabList pt="2" px="1" borderBottom="0">
            {children}
          </TabList>
        </Tabs>
      </HStack>
    </HStack>
  )
}

const tabStyles: SystemStyleObject = {
  position: 'relative',
  height: 10,
  pb: '2',
  px: '3',
  color: 'muted',
  _hover: {
    color: 'currentColor',
    _before: {
      content: '""',
      position: 'absolute',
      inset: 0,
      mb: '1.5',
      rounded: 'md',
      bgColor: 'blackAlpha.100',
      transitionProperty: 'background-color',
      transitionDuration: 'normal',
    },
    _dark: {
      _before: {
        bgColor: 'whiteAlpha.200',
      },
    },
  },
  _active: {
    bg: 'none',
  },
  _selected: {
    color: 'currentColor',
    _after: {
      content: '""',
      position: 'absolute',
      bottom: 0,
      rounded: 'md',
      bgColor: 'currentColor',
      width: '70%',
      height: '2px',
    },
  },
}

const SubNavItem: React.FC<TabProps> = (props) => {
  return (
    <Tab
      {...props}
      sx={{
        ...tabStyles,
        ...props.sx,
      }}
    />
  )
}

export const NavbarTabs = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <AppShell
      ref={scrollRef}
      variant="static"
      overflowY="auto"
      height="480px"
      bg="app-background"
      navbar={
        <>
          <Navbar>
            <NavbarContent>
              <Breadcrumb
                separator={
                  <Box as="span" opacity="0.4" mx="1">
                    /
                  </Box>
                }
              >
                <BreadcrumbItem>
                  <NavbarBrand>
                    <SaasUIIcon height="24px" />
                  </NavbarBrand>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      px="1.5"
                      leftIcon={
                        <Avatar
                          size="xs"
                          icon={<></>}
                          bgGradient="linear(to-r, yellow.200, pink.500)"
                        />
                      }
                      rightIcon={<FiChevronDown />}
                    >
                      Acme
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title="Workspaces">
                        <MenuItem>Acme</MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuItem>Create workspace</MenuItem>
                    </MenuList>
                  </Menu>
                </BreadcrumbItem>
              </Breadcrumb>
            </NavbarContent>
            <NavbarContent as="div" justifyContent="end" spacing="4">
              <Box width="180px">
                <SearchInput size="sm" />
              </Box>
              <Menu>
                <MenuButton>
                  <PersonaAvatar
                    src="/showcase-avatar.jpg"
                    name="Beatriz"
                    size="xs"
                    presence="online"
                  />
                </MenuButton>
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
            </NavbarContent>
          </Navbar>
          <SubNav scrollRef={scrollRef}>
            <SubNavItem>Overview</SubNavItem>
            <SubNavItem>Activity</SubNavItem>
            <SubNavItem>Integrations</SubNavItem>
            <SubNavItem>Usage</SubNavItem>
            <SubNavItem>Settings</SubNavItem>
          </SubNav>
        </>
      }
    >
      <Page>
        <PageBody overflow="visible">
          <Stack spacing="4" mb="14" pt="10">
            <Skeleton width="100px" height="24px" speed={0} />
            <SkeletonText speed={0} />
          </Stack>
          <Stack direction="row" spacing="8" mb="14">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="8" mb="14">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
          <Stack direction="row" spacing="8">
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
            <Stack spacing="4" flex="1">
              <Skeleton width="100px" height="20px" speed={0} />
              <SkeletonText speed={0} />
            </Stack>
          </Stack>
        </PageBody>
      </Page>
    </AppShell>
  )
}
