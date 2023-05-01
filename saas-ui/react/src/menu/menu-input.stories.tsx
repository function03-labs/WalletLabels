import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import {
  Center,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

import { MenuInput, MenuInputProps, MenuFilterItem } from './menu-input'

export default {
  title: 'Components/Menu/MenuInput',
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Box height="200px">
          <Story />
        </Box>
      </Center>
    ),
  ],
} as Meta

const Template: StoryFn<MenuInputProps> = (args) => {
  const items = [
    {
      label: 'Edit',
    },
    {
      label: 'Delete',
    },
  ]
  return (
    <Menu isOpen>
      <MenuButton>Menu with Input</MenuButton>
      <MenuList pt="0">
        <MenuInput {...args} />
        {items.map(({ label, ...rest }) => (
          <MenuFilterItem {...rest}>{label}</MenuFilterItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export const Basic = Template.bind({})
Basic.args = {}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Filter...',
}

export const Playground = () => {
  const items = [
    {
      label: 'Edit',
    },
    {
      label: 'Delete',
    },
  ]
  return (
    <Menu>
      <MenuButton as={Button}>Menu with Input</MenuButton>
      <MenuList position="static" pt="0">
        <MenuInput placeholder="Filter..." />
        {items.map(({ label, ...rest }) => (
          <MenuFilterItem {...rest}>{label}</MenuFilterItem>
        ))}
      </MenuList>
    </Menu>
  )
}
