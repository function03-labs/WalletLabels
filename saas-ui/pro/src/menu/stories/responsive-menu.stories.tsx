import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  Center,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import { MenuDialogListProps } from '@saas-ui/react'

import { ResponsiveMenu, ResponsiveMenuList } from '..'

export default {
  title: 'Components/Menu/ResponsiveMenu',
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

const Template: Story<MenuDialogListProps> = (args) => (
  <ResponsiveMenu isOpen>
    <MenuButton as={Button}>Responsive menu</MenuButton>
    <ResponsiveMenuList {...args}>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </ResponsiveMenuList>
  </ResponsiveMenu>
)

export const Basic = Template.bind({})
Basic.args = {}

export const DialogTitle = Template.bind({})
DialogTitle.args = {
  title: 'Dialog title',
}

export const Playground = () => {
  return (
    <ResponsiveMenu>
      <MenuButton as={Button}>Menu</MenuButton>
      <MenuList position="static">
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </ResponsiveMenu>
  )
}
