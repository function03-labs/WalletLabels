import * as React from 'react'
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react'
import { FiCheck, FiPlus, FiPower, FiSettings, FiSliders } from 'react-icons/fi'
import { IconBadge } from '@saas-ui/react'
import { FaMagento, FaPaypal, FaSpotify } from 'react-icons/fa6'

export interface OrganizationMenuProps {}

export const OrganizationMenu: React.FC<OrganizationMenuProps> = () => {
  const [currentOrg, setOrg] = React.useState('paypal')

  const orgs = [
    {
      name: 'Paypal',
      slug: 'paypal',
      plan: 'Free plan',
      icon: FaPaypal,
      color: '#00457C',
    },
    {
      name: 'Spotify',
      slug: 'spotify',
      plan: 'Trial',
      icon: FaSpotify,
      color: '#1ED760',
    },
    {
      name: 'Magento',
      slug: 'magento',
      plan: 'Professional plan',
      icon: FaMagento,
      color: '#000000',
    },
  ]

  const selected = orgs.find((r) => r.slug === currentOrg) ?? orgs[0]

  return (
    <Menu defaultIsOpen closeOnSelect={false}>
      <MenuButton
        as={Button}
        variant="ghost"
        leftIcon={
          <IconBadge
            bg={selected.color}
            variant="solid"
            size="sm"
            boxSize="5"
            icon={<Icon as={selected.icon} color="white" />}
          />
        }
      >
        {selected.name}
      </MenuButton>
      <MenuList maxW="280px">
        <MenuGroup
          title="Organizations"
          color="muted"
          fontWeight="medium"
          mt="0"
        >
          {orgs.map(({ name, slug, plan, icon, color }) => (
            <MenuItem
              key={slug}
              value={slug}
              icon={
                <IconBadge
                  bg={color}
                  variant="solid"
                  icon={<Icon as={icon} color="white" />}
                />
              }
              position="relative"
              pe="8"
              onClick={() => setOrg(slug)}
            >
              <Text fontWeight="medium">{name}</Text>
              <Text fontSize="xs" color="gray.500">
                {plan}
              </Text>
              {slug === currentOrg && (
                <Icon
                  as={FiCheck}
                  fontSize="1.2em"
                  position="absolute"
                  top="2.5"
                  right="2.5"
                />
              )}
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem icon={<Icon as={FiSettings} fontSize="1.2em" />}>
            Organization settings
          </MenuItem>
          <MenuItem icon={<Icon as={FiPlus} fontSize="1.2em" />}>
            Add organization
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem icon={<Icon as={FiPower} fontSize="1.2em" />}>
            Log out
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
