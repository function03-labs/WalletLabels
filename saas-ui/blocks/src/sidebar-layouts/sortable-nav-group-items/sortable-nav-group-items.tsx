import * as React from 'react'

import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DndContextProps,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import { Badge, Box, Text } from '@chakra-ui/react'

import {
  GripVerticalIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react'

import {
  Sidebar,
  NavGroup,
  NavItem,
  SidebarSection,
  NavGroupProps,
  NavItemProps,
  AppShell,
} from '@saas-ui/react'
import { CSS } from '@dnd-kit/utilities'
import { Page, PageBody, PageHeader } from '@saas-ui-pro/react'
import { SaasUILogo } from '@saas-ui/assets'

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

export const SortableNavGroupItems = () => {
  const [sortedTags, setTags] = React.useState(tags)
  return (
    <AppShell
      variant="static"
      height="600px"
      bg="app-background"
      sidebar={
        <Sidebar>
          <SidebarSection>
            <SaasUILogo width="100px" />
          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto">
            <NavGroup>
              <NavItem href="#" icon={<HomeIcon size="1.2em" />}>
                Home
              </NavItem>
              <NavItem href="#" icon={<UsersIcon size="1.2em" />} isActive>
                Contacts
              </NavItem>
              <NavItem href="#" icon={<SettingsIcon size="1.2em" />}>
                Settings
              </NavItem>
            </NavGroup>
            <SortableNavGroup
              title="Tags"
              isCollapsible
              items={sortedTags}
              onSorted={setTags}
            >
              {sortedTags.map((tag) => (
                <SortableNavItem
                  key={tag.id}
                  id={tag.id}
                  href="#"
                  my="0"
                  icon={
                    <Badge
                      bg={tag.color || 'gray.500'}
                      boxSize="2"
                      borderRadius="full"
                      variant="solid"
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
                </SortableNavItem>
              ))}
            </SortableNavGroup>
          </SidebarSection>
        </Sidebar>
      }
    >
      <Page>
        <PageHeader title=""></PageHeader>
        <PageBody></PageBody>
      </Page>
    </AppShell>
  )
}

interface SortableNavGroupProps
  extends Omit<NavGroupProps, 'onDragStart' | 'onDragEnd' | 'onDragOver'>,
    DndContextProps {
  items: any[]
  onSorted?: (fn: (items: any[]) => any[]) => void
}

export const SortableNavGroup: React.FC<SortableNavGroupProps> = (props) => {
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
  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item.id === id)
  const activeIndex = activeId ? getIndex(activeId) : -1
  const activeItem = (
    React.Children.toArray(children) as React.ReactElement[]
  ).find(
    (child) => child.type === SortableNavItem && child.props.id === activeId,
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event

    if (over) {
      const overIndex = getIndex(over.id)
      if (activeIndex !== overIndex) {
        onSorted?.((items) => arrayMove(items, activeIndex, overIndex))
      }
    }

    setActiveId(null)
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        if (!event.active) {
          return
        }
        setActiveId(event.active.id)
        onDragStart?.(event)
      }}
      onDragOver={onDragOver}
      onDragEnd={(event) => {
        handleDragEnd(event)
        onDragEnd?.(event)
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={items}>
        <NavGroup {...rest}>{children}</NavGroup>
      </SortableContext>
      <DragOverlay
        dropAnimation={{
          duration: 50,
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.2',
              },
            },
          }),
        }}
      >
        {activeItem ? (
          <NavItem
            {...activeItem.props}
            my="0"
            _hover={{ bg: 'transparent' }}
            opacity="0.8"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

interface SortableNavItemProps extends NavItemProps {
  id: string
  handle?: React.ReactNode
}

const SortableNavItem: React.FC<SortableNavItemProps> = (props) => {
  const { id, children, handle, ...rest } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    transition: { duration: 150, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' },
  })

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
      {...rest}
      {...itemProps}
      data-dragging={isDragging || !!transform}
      data-sortable
      sx={{
        position: 'relative',
        a: {
          userSelect: 'none',
          WebkitUserDrag: 'none',
        },
      }}
    >
      {handle ?? (
        <Box
          display="none"
          pos="absolute"
          left="-10px"
          color="muted"
          opacity="0.6"
          cursor="grab"
          data-drag-handle
          sx={{
            '[data-sortable]:hover &': { display: 'block' },
            '[data-dragging] &': { display: 'none' },
          }}
        >
          <GripVerticalIcon size="12" />
        </Box>
      )}
      {children}
    </NavItem>
  )
}
