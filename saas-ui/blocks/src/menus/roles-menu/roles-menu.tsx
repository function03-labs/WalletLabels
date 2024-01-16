import * as React from 'react'
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'

export interface RolesMenuProps {}

export const RolesMenu: React.FC<RolesMenuProps> = () => {
  const [role, setRole] = React.useState('moderator')

  const roles = [
    {
      label: 'User',
      value: 'user',
      description: 'Standard access to view and interactive with content.',
    },
    {
      label: 'Moderator',
      value: 'moderator',
      description: 'Abilitity to moderate content and manage users.',
    },
    {
      label: 'Admin',
      value: 'admin',
      description: 'Full access to manage content, users, and settings.',
    },
  ]

  const selectedRole = roles.find((r) => r.value === role) ?? roles[0]

  return (
    <Menu defaultIsOpen closeOnSelect={false}>
      <MenuButton as={Button}>{selectedRole.label}</MenuButton>
      <MenuList maxW="280px">
        <MenuOptionGroup
          title="Privileges"
          color="muted"
          fontWeight="medium"
          mt="0"
          type="radio"
          value={role}
          onChange={(value) => setRole(value as string)}
        >
          {roles.map(({ label, value, description }) => (
            <MenuItemOption
              key={value}
              value={value}
              icon={null}
              position="relative"
              pe="8"
            >
              <Text fontWeight="medium" mb="1">
                {label}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {description}
              </Text>
              {value === role && (
                <Icon
                  as={FiCheck}
                  fontSize="1.2em"
                  position="absolute"
                  top="2.5"
                  right="2.5"
                />
              )}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
