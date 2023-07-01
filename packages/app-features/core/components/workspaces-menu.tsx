import {
  Button,
  HStack,
  Text,
  Avatar,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  AvatarProps,
  Portal,
  MenuGroup,
  MenuItem,
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
import { useTenancy } from '@saas-ui-pro/react'

import { useWorkspaces } from '../hooks/use-workspaces'
import { useWorkspace } from '../hooks/use-workspace'
import { useRouter } from '@app/nextjs'

const WorkspaceLogo: React.FC<AvatarProps> = (props) => {
  const { src, ...rest } = props
  return (
    <Avatar
      display="inline-block"
      src={src}
      size="xs"
      borderRadius="full"
      {...rest}
    />
  )
}

export interface TenantMenuProps {
  title: string
  children?: React.ReactNode
}

export const WorkspacesMenu: React.FC<TenantMenuProps> = (props) => {
  const { title = 'Workspaces', children } = props
  const router = useRouter()
  const workspace = useWorkspace()
  const workspaces = useWorkspaces()

  const activeWorkspace = (function () {
    for (const i in workspaces) {
      if (workspaces[i].slug === workspace) {
        return workspaces[i]
      }
    }
    return workspaces[0]
  })()

  const setWorkspace = (workspace: string) => {
    router.push({
      query: {
        workspace,
      },
    })
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={
          <WorkspaceLogo
            name={activeWorkspace?.label}
            src={activeWorkspace?.logo}
          />
        }
        className="tenant-menu"
        variant="ghost"
        _hover={{
          bg: 'sidebar-on-muted',
        }}
        _active={{
          bg: 'sidebar-on-subtle',
        }}
      >
        {activeWorkspace?.label}
      </MenuButton>
      <Portal>
        {/* Wrap the menu in a portal so that the color scheme tokens get applied correctly.  */}
        <MenuList zIndex={['modal', null, 'dropdown']}>
          <MenuGroup title={title}>
            {workspaces.map(({ id, slug, label, logo, ...props }) => {
              return (
                <MenuItem
                  key={slug}
                  value={slug}
                  icon={<WorkspaceLogo name={label} src={logo} />}
                  onClick={() => setWorkspace(slug)}
                  {...props}
                >
                  <HStack>
                    <Text>{label}</Text>
                    <Spacer />
                    {slug === activeWorkspace?.slug ? <FiCheck /> : null}
                  </HStack>
                </MenuItem>
              )
            })}
          </MenuGroup>
          {children}
        </MenuList>
      </Portal>
    </Menu>
  )
}
