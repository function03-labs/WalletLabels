import { HStack, Text, Avatar, Spacer } from '@chakra-ui/react'

import { SidebarMenu } from '@saas-ui/page-shell'
import { MenuDivider, MenuGroup, MenuItem } from '@saas-ui/menu'

import { CheckIcon } from '@chakra-ui/icons'
import { useTenancy } from '@saas-ui/tenancy'

import useGetTenants from '../../hooks/use-get-tenants'

interface TenantLogoProps {
  label: string
  src?: string
}

const TenantLogo = ({ label, src }: TenantLogoProps) => {
  return (
    <Avatar
      display="inline-block"
      name={label}
      src={src}
      size="xs"
      me="1em"
      borderRadius={src ? 'sm' : 'full'}
    />
  )
}

export interface TenantMenuProps {
  title: string
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
    <SidebarMenu
      label={activeTenant?.label}
      icon={<TenantLogo label={activeTenant?.label} />}
    >
      <MenuGroup title={title}>
        {tenants.map(({ id, label, ...props }) => {
          return (
            <MenuItem
              key={id}
              value={id}
              icon={<TenantLogo label={label} />}
              isTruncated
              onClick={() => setTenant(id)}
              {...props}
            >
              <HStack>
                <Text>{label}</Text>
                <Spacer />
                {id === activeTenant?.id ? <CheckIcon /> : null}
              </HStack>
            </MenuItem>
          )
        })}
      </MenuGroup>
      {children}
    </SidebarMenu>
  )
}
