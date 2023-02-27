import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Reorder, useDragControls } from 'framer-motion'
import {
  Badge,
  Image,
  BadgeProps,
  Box,
  Button,
  DarkMode,
  Flex,
  Heading,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  Square,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import {
  HomeIcon,
  UsersIcon,
  SettingsIcon,
  HelpCircleIcon,
  GripVerticalIcon,
  ContactIcon,
  HeartHandshakeIcon,
  LightbulbIcon,
  ListChecksIcon,
} from 'lucide-react'

import {
  AppShell,
  MenuItem,
  PersonaAvatar,
  Sidebar,
  SidebarProps,
  Nav,
  NavGroup,
  NavItem,
  SidebarSection,
  SidebarToggleButton,
  SidebarOverlay,
} from '@saas-ui/react'
import { Logo } from './logo'

export default {
  title: 'Templates/Layout/Sidebar',
  decorators: [(Story) => <Story />],
} as Meta

const tags = [
  {
    name: 'Lead',
    count: 83,
    color: 'purple.500',
  },
  {
    name: 'Customer',
    count: 210,
    color: 'green.500',
  },
  {
    name: 'Partner',
    count: 12,
    color: 'blue.500',
  },
  {
    name: 'Prospect',
    count: 0,
  },
]

export const SidebarLayout = () => {
  const [sortedTags, setTags] = React.useState(tags)
  return (
    <AppShell
      variant="static"
      height="680px"
      sidebar={
        <HStack spacing="0" alignItems="stretch">
          <Sidebar variant="condensed" bg="gray.50" borderWidth="0" spacing="3">
            <SidebarSection alignItems="center">
              <Logo width="24px" color="black" mb="1" />
            </SidebarSection>
            <SidebarSection flex="1">
              <NavItem icon={<HomeIcon size="1.2em" />}>Home</NavItem>
              <NavItem icon={<UsersIcon size="1.2em" />} isActive>
                Users
              </NavItem>
              <NavItem icon={<SettingsIcon size="1.2em" />}>Settings</NavItem>
            </SidebarSection>
            <SidebarSection alignItems="center">
              <PersonaAvatar src="/showcase-avatar.jpg" size="xs" />
            </SidebarSection>
          </Sidebar>
          <Sidebar>
            <SidebarSection direction="row" mt="2" px="4">
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
                <Reorder.Group
                  axis="y"
                  values={sortedTags}
                  onReorder={(items) => {
                    setTags(items)
                  }}
                >
                  {sortedTags.map((tag, i) => (
                    <Reorder.Item key={tag.name} value={tag}>
                      <DraggableNavItem key={i} tag={tag} />
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              </NavGroup>
            </SidebarSection>
            <SidebarSection>
              <NavItem icon={<HelpCircleIcon />}>Help &amp; Support</NavItem>
            </SidebarSection>
          </Sidebar>
        </HStack>
      }
    >
      <Box />
    </AppShell>
  )
}

const DraggableNavItem = (props) => {
  const { tag } = props
  return (
    <NavItem
      userSelect="none"
      draggable="false"
      icon={
        <Badge
          bg={tag.color || 'transparent'}
          boxSize="2"
          borderRadius="full"
          variant={tag.color ? 'solid' : 'outline'}
        />
      }
      sx={{
        a: {
          userSelect: 'none',
          WebkitUserDrag: 'none',
        },
      }}
    >
      <Box
        display="none"
        pos="absolute"
        left="1px"
        color="muted"
        cursor="grab"
        sx={{
          '[data-drag]:hover': { display: 'block' },
          '[data-drag=true]': { display: 'none' },
        }}
      >
        <GripVerticalIcon size="12" />
      </Box>
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
  )
}
