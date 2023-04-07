import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'

import { useTenant } from '@saas-ui-pro/react'
import { useAuth } from '@saas-ui/auth'
import {
  MenuItem,
  MenuGroup,
  MenuDivider,
  PersonaAvatar,
  useHotkeysShortcut,
} from '@saas-ui/react'
import { Has } from '@saas-ui-pro/feature-flags'

import { HotkeysWindow } from './hotkeys-window'
import { usePath } from '../hooks/use-path'
import { getCurrentUser } from '@api/client'
import { useQuery } from '@tanstack/react-query'

export const UserMenu = () => {
  const { logOut } = useAuth()

  const { data: { currentUser } = {} } = useQuery({
    queryKey: ['GetCurrentUser'],
    queryFn: () => getCurrentUser(),
  })

  const tenant = useTenant()

  const { toggleColorMode, colorMode } = useColorMode()

  const hotkeysWindow = useDisclosure()
  const showHotkeysCommand = useHotkeysShortcut('general.showHotkeys', () => {
    hotkeysWindow.onOpen()
  })

  const logoutCommand = useHotkeysShortcut('general.logout', () => {
    logOut()
  })

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <PersonaAvatar
            size="xs"
            name={currentUser?.name || ''}
            src={currentUser?.avatar || undefined}
          />
        }
        variant="ghost"
        aria-label="User menu"
        _hover={{
          bg: 'sidebar-on-muted',
        }}
        _active={{
          bg: 'sidebar-on-subtle',
        }}
      />
      <Portal>
        {/* Wrap the menu in a portal so that the color scheme tokens get applied correctly.  */}
        <MenuList zIndex={['modal', null, 'dropdown']}>
          <MenuGroup title={currentUser?.name || ''}>
            <MenuItem href={usePath(`/settings/account`)} label="Profile" />
            <Has feature="settings">
              <MenuItem href={`/app/${tenant}/settings`} label="Settings" />
            </Has>
          </MenuGroup>
          <MenuDivider />
          <MenuItem label="Changelog" />
          <MenuItem
            command={showHotkeysCommand}
            label="Show keyboard shortcuts"
            onClick={() => hotkeysWindow.onOpen()}
          />
          <MenuItem label="Feedback" />
          <MenuItem label="Help &amp; Support" />
          <MenuItem
            label={colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              toggleColorMode()
            }}
          />
          <MenuDivider />
          <MenuItem
            command={logoutCommand}
            onClick={() => logOut()}
            label="Log out"
          />
        </MenuList>
      </Portal>
      <HotkeysWindow {...hotkeysWindow} />
    </Menu>
  )
}
