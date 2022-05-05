import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  Center,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'

import { MenuListFilter, MenuListFilterProps, MenuFilterItem } from '..'

export default {
  title: 'Components/Menu/MenuListFilter',
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

const Template: Story<MenuListFilterProps> = (args) => (
  <Menu isOpen>
    <MenuButton>Menu list filter</MenuButton>
    <MenuList pt="0">
      <MenuListFilter {...args} />
      <MenuFilterItem>Edit</MenuFilterItem>
      <MenuFilterItem>Delete</MenuFilterItem>
    </MenuList>
  </Menu>
)

export const Basic = Template.bind({})
Basic.args = {}

export const Placeholder = Template.bind({})
Placeholder.args = {
  placeholder: 'Filter...',
}

export const Playground = () => {
  return (
    <Menu>
      <MenuButton as={Button}>Menu</MenuButton>
      <MenuList position="static" pt="0">
        <MenuListFilter placeholder="Filter..." />
        <MenuFilterItem>Edit</MenuFilterItem>
        <MenuFilterItem>Delete</MenuFilterItem>
      </MenuList>
    </Menu>
  )
}
