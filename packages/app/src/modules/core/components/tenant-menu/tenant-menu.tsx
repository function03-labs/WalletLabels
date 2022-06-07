import {
  HStack,
  Text,
  Avatar,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  AvatarProps,
  Portal,
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
import { useTenancy } from '@saas-ui/pro'
import { MenuGroup, MenuItem } from '@saas-ui/menu'

import { useGetTenants } from '../../hooks/use-get-tenants'
import { Button } from '@saas-ui/react'

const TenantLogo: React.FC<AvatarProps> = (props) => {
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

export const TenantMenu: React.FC<TenantMenuProps> = (props) => {
  const { title = 'Tenants', children } = props

  const { tenant, setTenant } = useTenancy()

  const tenants = useGetTenants()

  const activeTenant = (function () {
    for (const i in tenants) {
      if (tenants[i].slug === tenant) {
        return tenants[i]
      }
    }
    return tenants[0]
  })()

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={
          <TenantLogo name={activeTenant?.label} src={activeTenant?.logo} />
        }
        className="tenant-menu"
        variant="ghost"
        isTruncated
      >
        {activeTenant?.label}
      </MenuButton>
      <Portal>
        {/* Wrap the menu in a portal so that the color scheme tokens get applied correctly.  */}
        <MenuList zIndex="dropdown">
          <MenuGroup title={title}>
            {tenants.map(({ id, slug, label, logo, ...props }) => {
              return (
                <MenuItem
                  key={id}
                  value={id}
                  icon={<TenantLogo name={label} src={logo} />}
                  isTruncated
                  onClick={() => setTenant(slug)}
                  {...props}
                >
                  <HStack>
                    <Text>{label}</Text>
                    <Spacer />
                    {id === activeTenant?.id ? <FiCheck /> : null}
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
