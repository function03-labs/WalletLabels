import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  DndContext,
  DndContextProps,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
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
  NavGroupProps,
} from '@saas-ui/react'
import { Logo } from './logo'
import { CSS } from '@dnd-kit/utilities'

export default {
  title: 'Templates/Layout/Sidebar',
  decorators: [(Story) => <Story />],
} as Meta

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

              <SortableNavGroup
                title="Tags"
                isCollapsible
                items={sortedTags.map((tag) => tag.name)}
                onSorted={setTags}
              >
                {sortedTags.map((tag, i) => (
                  <SortableNavItem key={i} tag={tag} />
                ))}
              </SortableNavGroup>
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

interface SortableNavGroupProps
  extends Omit<NavGroupProps, 'onDragStart' | 'onDragEnd' | 'onDragOver'>,
    DndContextProps {
  items: any[]
  onSorted?: (fn: (items: any[]) => any[]) => void
}
const SortableNavGroup: React.FC<SortableNavGroupProps> = (props) => {
  const {
    children,
    onDragStart,
    onDragOver,
    onDragEnd,
    onSorted,
    items,
    ...rest
  } = props

  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      onSorted?.((items) => {
        console.log(items)
        const oldIndex = items.findIndex((item) => item.name === active.id)
        const newIndex =
          over && items.findIndex((item) => item.name === over.id)

        return newIndex ? arrayMove(items, oldIndex, newIndex) : items
      })
    }

    setActiveId(null)
  }

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveId(event.active.id)
        onDragStart?.(event)
      }}
      onDragOver={onDragOver}
      onDragEnd={(event) => {
        handleDragEnd(event)
        onDragEnd?.(event)
      }}
    >
      <SortableContext items={items}>
        <NavGroup {...rest}>{children}</NavGroup>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <NavItem
            icon={
              <Badge
                bg={'transparent'}
                boxSize="2"
                borderRadius="full"
                variant={'outline'}
              />
            }
            _hover={{
              bg: 'transparent',
            }}
          >
            {activeId}
          </NavItem>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

const SortableNavItem = (props) => {
  const { tag } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tag.name })

  const itemProps = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : undefined,
    ...attributes,
    ...listeners,
  }

  return (
    <NavItem
      ref={setNodeRef}
      {...itemProps}
      data-drag={isDragging}
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
