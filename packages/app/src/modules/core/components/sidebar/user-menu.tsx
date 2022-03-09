import { useColorMode, useDisclosure } from '@chakra-ui/react'

import { SidebarMenu, useTenant } from '@saas-ui/pro'

import {
  MenuItem,
  MenuGroup,
  MenuDivider,
  PersonaAvatar,
  useAuth,
  useHotkeysShortcut,
} from '@saas-ui/react'

import { HotkeysWindow } from '@modules/core/components/hotkeys'

export const UserMenu = () => {
  const { user, logOut } = useAuth()

  const tenant = useTenant()

  const { toggleColorMode, colorMode } = useColorMode()

  const hotkeysWindow = useDisclosure()
  const showHotkeysCommand = useHotkeysShortcut('general.showHotkeys', () => {
    hotkeysWindow.onOpen()
  })

  const logoutCommand = useHotkeysShortcut('general.logout', () => {
    logOut()
  })

  const metaData = user?.user_metadata

  return (
    <>
      <SidebarMenu
        icon={
          <PersonaAvatar
            size="xs"
            name={metaData?.name}
            src={metaData?.avatar_url}
          />
        }
      >
        <MenuGroup title={metaData?.name}>
          <MenuItem href={`/app/${tenant}/settings/account`} label="Profile" />
          <MenuItem href={`/app/${tenant}/settings`} label="Settings" />
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
      </SidebarMenu>
      <HotkeysWindow {...hotkeysWindow} />
    </>
  )
}
