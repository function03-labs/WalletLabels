import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'

import { useTenant } from '@saas-ui/pro'

import {
  MenuItem,
  MenuGroup,
  MenuDivider,
  PersonaAvatar,
  useAuth,
  useHotkeysShortcut,
} from '@saas-ui/react'

import { HotkeysWindow } from '@app/features/core/components/hotkeys'
import { useGetCurrentUserQuery } from '@app/graphql'
import { usePath } from '@app/features/core/hooks/use-path'
import { Has } from '@saas-ui/features'

export const UserMenu = () => {
  const { logOut } = useAuth()

  const { data: { currentUser } = {} } = useGetCurrentUserQuery()

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
