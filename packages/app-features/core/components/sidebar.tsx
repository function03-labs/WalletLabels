import * as React from 'react'

import {
  Badge,
  Box,
  IconButton,
  Spacer,
  Text,
  useBreakpointValue,
  useControllableState,
} from '@chakra-ui/react'

import {
  FiHome,
  FiPlus,
  FiInbox,
  FiHelpCircle,
  FiHash,
  FiUsers,
  FiSearch,
} from 'react-icons/fi'

import {
  Command,
  Resizer,
  ResizeHandle,
  ResizeHandler,
} from '@saas-ui-pro/react'

import { useActivePath } from '@app/nextjs'

import {
  MenuItem,
  MenuDivider,
  Sidebar,
  SidebarProps,
  SidebarOverlay,
  SidebarSection,
  SidebarToggleButton,
  NavItem,
  NavItemProps,
  NavGroup,
  useModals,
  useLocalStorage,
  useHotkeysShortcut,
} from '@saas-ui/react'

import {
  ElectronNav,
  HelpCenter,
  InviteDialog,
  SortableNavGroup,
  SortableNavItem,
} from '@ui/lib'

import { BillingStatus } from './billing-status'
import { GlobalSearchInput } from './global-search-input'
import { TenantMenu } from './tenant-menu'
import { UserMenu } from './user-menu'

import { usePath } from '@app/features/core/hooks/use-path'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTags, Tags, User } from '@api/client'
import { useCurrentUser } from '../hooks/use-current-user'
import { useRouter } from 'next/router'

export interface AppSidebarProps extends SidebarProps {}

export const AppSidebar: React.FC<AppSidebarProps> = (props) => {
  const user = useCurrentUser()
  const modals = useModals()
  const [width, setWidth] = useLocalStorage('app.sidebar.width', 280)

  const { variant, colorScheme } = props
  const isCondensed = variant === 'condensed'

  const onResize: ResizeHandler = ({ width }) => {
    setWidth(width)
  }

  return (
    <Resizer
      defaultWidth={width}
      onResize={onResize}
      isResizable={useBreakpointValue(
        { base: false, lg: true },
        { fallback: 'lg' },
      )}
    >
      <Sidebar variant={variant} colorScheme={colorScheme} {...props}>
        <SidebarToggleButton />
        <ElectronNav />
        <SidebarSection direction="row">
          <TenantMenu title="Organizations">
            <MenuDivider />
            <MenuItem
              href={usePath('settings/organization')}
              label="Organization settings"
            />
            <MenuItem
              href="/app/getting-started"
              label="Create an organization"
            />
          </TenantMenu>
          {!isCondensed && (
            <>
              <Spacer />
              <UserMenu />
            </>
          )}
        </SidebarSection>
        <Box px={4}>
          {isCondensed ? (
            <IconButton icon={<FiSearch />} aria-label="Search" />
          ) : (
            <GlobalSearchInput />
          )}
        </Box>
        <SidebarSection overflowY="auto" flex="1">
          <NavGroup>
            <AppSidebarLink
              href={usePath()}
              label="Dashboard"
              icon={<FiHome />}
              hotkey="navigation.dashboard"
            />
            <AppSidebarLink
              href={usePath('inbox')}
              label="Inbox"
              icon={<FiInbox />}
              hotkey="navigation.inbox"
            />
            <AppSidebarLink
              href={usePath('contacts')}
              isActive={useActivePath('contacts', { end: false })}
              label="Contacts"
              icon={<FiUsers />}
              hotkey="navigation.contacts"
            />
          </NavGroup>

          {!isCondensed && user && <AppSidebarTags user={user} />}

          <Spacer />

          <NavGroup>
            <NavItem
              onClick={() =>
                modals.open({
                  title: 'Invite people',
                  component: InviteDialog,
                  onInvite: async () => {
                    // TODO: handle invite
                  },
                })
              }
              color="sidebar-muted"
              icon={<FiPlus />}
            >
              Invite people
            </NavItem>
            <NavItem
              onClick={() => modals.open(HelpCenter)}
              color="sidebar-muted"
              icon={<FiHelpCircle />}
            >
              Help &amp; support
            </NavItem>
          </NavGroup>
        </SidebarSection>

        {isCondensed ? (
          <SidebarSection>
            <UserMenu />
          </SidebarSection>
        ) : (
          <BillingStatus />
        )}

        <SidebarOverlay />
        <ResizeHandle />
      </Sidebar>
    </Resizer>
  )
}

interface AppSidebarlink extends NavItemProps {
  hotkey: string
  href: string
  label: string
}

const AppSidebarLink: React.FC<AppSidebarlink> = (props) => {
  const { href, label, hotkey, ...rest } = props
  const { push } = useRouter()
  const isActive = useActivePath(href)

  const command = useHotkeysShortcut(
    hotkey,
    () => {
      push(href)
    },
    [href],
  )

  return (
    <NavItem
      href={href}
      isActive={isActive}
      {...rest}
      tooltip={
        <>
          {label} <Command>{command}</Command>
        </>
      }
    >
      {label}
    </NavItem>
  )
}

const AppSidebarTags = ({ user }: { user: User }) => {
  const queryClient = useQueryClient()
  const { query } = useRouter()

  const userTags = user.workspace?.tags || []

  const mutation = useMutation({
    mutationFn: async (tags: string[]) => {
      /**
       * This just updates the local cache, you should also update the server.
       */
      queryClient.setQueryData<any>(
        ['CurrentUser'],
        (data: { currentUser: User }) => ({
          currentUser: {
            ...data.currentUser,
            workspace: {
              ...data?.currentUser?.workspace,
              tags,
            },
          },
        }),
      )
    },
  })

  const getSortedTags = React.useCallback(
    (tags: Tags) => {
      return userTags
        .map((id) => tags.find((tag) => tag.id === id))
        .filter(Boolean) as Tags
    },
    [userTags],
  )

  const { data } = useQuery({
    queryKey: ['GetTags'],
    queryFn: () => getTags(),
    onSuccess(data) {
      setTags(getSortedTags(data?.tags || []))
    },
  })

  const [sortedTags, setTags] = useControllableState<Tags>({
    defaultValue: getSortedTags(data?.tags || []),
    onChange(tags) {
      if (sortedTags.length) {
        mutation.mutate(tags.map(({ id }) => id))
      }
    },
  })

  const basePath = usePath(`/tag/`)

  if (!sortedTags.length) {
    return null
  }

  return (
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
          my="0"
          href={`${basePath}/${tag.id}`}
          isActive={query.tag === tag.id}
          icon={
            <Badge
              bg={tag.color}
              boxSize="2"
              borderRadius="full"
              variant="solid"
            />
          }
        >
          <Text>{tag.label}</Text>
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
  )
}
