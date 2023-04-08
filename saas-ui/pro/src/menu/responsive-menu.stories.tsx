import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
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
  component: ResponsiveMenu,
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

const Template: StoryFn<MenuDialogListProps> = (args) => (
  <ResponsiveMenu isOpen>
    <MenuButton as={Button}>Responsive menu</MenuButton>
    <ResponsiveMenuList {...args}>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </ResponsiveMenuList>
  </ResponsiveMenu>
)

export const Basic = {
  render: Template,
}

export const DialogTitle = {
  render: Template,
  args: {
    title: 'Dialog title',
  },
}

export const Breakpoints = {
  render: Template,
  args: {
    breakpoints: { base: true, lg: false },
  },
}

export const Playground = {
  render: () => {
    return (
      <ResponsiveMenu>
        <MenuButton as={Button}>Menu</MenuButton>
        <ResponsiveMenuList position="static">
          <MenuItem>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </ResponsiveMenuList>
      </ResponsiveMenu>
    )
  },
}
