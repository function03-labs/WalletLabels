import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Portal,
  useColorMode,
} from '@chakra-ui/react'

import Link from 'next/link'

import { useAuth } from '@saas-ui/auth'
import { PersonaAvatar, useHotkeysShortcut } from '@saas-ui/react'
import { Has } from '@saas-ui-pro/feature-flags'

import { useHelpCenter } from '@ui/lib'
import { usePath } from '../hooks/use-path'
import { getCurrentUser } from '@api/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const UserMenu = () => {
  const { logOut } = useAuth()

  const { data: { currentUser } = {} } = useQuery({
    queryKey: ['GetCurrentUser'],
    queryFn: () => getCurrentUser(),
  })

  const queryClient = useQueryClient()

  const logOutAndClearCache = () => {
    logOut().then(() => {
      queryClient.clear()
    })
  }

  const { toggleColorMode, colorMode } = useColorMode()

  const help = useHelpCenter()
  const helpCommand = useHotkeysShortcut('general.help', () => {
    help.open()
  })

  const logoutCommand = useHotkeysShortcut('general.logout', () => {
    logOutAndClearCache()
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
            <MenuItem as={Link} href={usePath(`/settings/account`)}>
              Profile
            </MenuItem>
            <Has feature="settings">
              <MenuItem as={Link} href={usePath(`/settings`)}>
                Settings
              </MenuItem>
            </Has>
          </MenuGroup>
          <MenuDivider />
          <MenuItem>Changelog</MenuItem>
          <MenuItem command={helpCommand} onClick={() => help.open()}>
            Help
          </MenuItem>
          <MenuItem>Feedback</MenuItem>
          <MenuItem
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              toggleColorMode()
            }}
          >
            {colorMode === 'dark' ? 'Light mode' : 'Dark mode'}
          </MenuItem>
          <MenuDivider />
          <MenuItem
            command={logoutCommand}
            onClick={() => logOutAndClearCache()}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  )
}
