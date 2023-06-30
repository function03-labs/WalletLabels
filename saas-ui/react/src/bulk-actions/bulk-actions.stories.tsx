import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import {
  Button,
  Center,
  Portal,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import { BulkActions, BulkActionsProps } from '..'

export default {
  title: 'Components/Data Display/BulkActions',
  component: BulkActions,
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Story />
      </Center>
    ),
  ],
} as Meta

export const Basic = {
  render: (args: BulkActionsProps) => {
    return (
      <BulkActions {...args}>
        <Button>Delete</Button>
      </BulkActions>
    )
  },
  args: {
    selections: ['1'],
  },
}

export const CustomTitle = {
  render: (args: BulkActionsProps) => {
    return (
      <BulkActions {...args}>
        <Button>Delete</Button>
      </BulkActions>
    )
  },
  args: {
    selections: ['1', '2'],
    title: ':selections emails selected',
  },
}

export const MultipleActions = {
  render: (args: BulkActionsProps) => {
    return (
      <BulkActions {...args}>
        <Menu>
          <MenuButton as={Button}>Move to</MenuButton>
          <Portal>
            <MenuList>
              <MenuItem>Inbox</MenuItem>
              <MenuItem>Spam</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
        <Button>Delete</Button>
      </BulkActions>
    )
  },
  args: {
    selections: ['1', '2'],
    title: ':selections emails selected',
  },
}

export const MotionPreset = {
  render: (args: BulkActionsProps) => {
    return (
      <BulkActions {...args}>
        <Menu>
          <MenuButton as={Button}>Move to</MenuButton>
          <Portal>
            <MenuList>
              <MenuItem>Inbox</MenuItem>
              <MenuItem>Spam</MenuItem>
            </MenuList>
          </Portal>
        </Menu>
        <Button>Delete</Button>
      </BulkActions>
    )
  },
  args: {
    selections: ['1', '2'],
    title: ':selections emails selected',
    top: '0',
    bottom: 'auto',
    motionPreset: 'slideOutTop',
  },
}
