import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Center, Portal } from '@chakra-ui/react'

import { BulkActions, BulkActionsProps } from '..'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@saas-ui/react'

export default {
  title: 'Components/Data Display/BulkActions',
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Story />
      </Center>
    ),
  ],
} as Meta

const Template: Story<BulkActionsProps> = (args) => <BulkActions {...args} />

export const Basic = Template.bind({})
Basic.args = {
  selections: ['1'],
  actions: (
    <>
      <Button>Delete</Button>
    </>
  ),
}

export const WithCustomTitle = Template.bind({})
WithCustomTitle.args = {
  selections: ['1', '2'],
  title: ':selections emails selected',
  actions: (
    <>
      <Button>Delete</Button>
    </>
  ),
}

export const WithMultipleActions = Template.bind({})
WithMultipleActions.args = {
  selections: ['1', '2'],
  title: ':selections emails selected',
  actions: (
    <>
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
    </>
  ),
}

export const WithPositionBottom = Template.bind({})
WithPositionBottom.args = {
  selections: ['1', '2'],
  title: ':selections emails selected',
  actions: (
    <>
      <Button>Delete</Button>
    </>
  ),
  bottom: '0',
  top: 'auto',
  motionPreset: 'slideOutBottom',
}

export const WithCustomStyles = Template.bind({})
WithCustomStyles.args = {
  selections: ['1', '2'],
  title: ':selections emails selected',
  actions: (
    <>
      <Button>Delete</Button>
    </>
  ),
  bottom: '40px',
  top: 'auto',
  right: 'auto',
  left: '50%',
  borderRadius: 'lg',
  boxShadow: 'md',
  maxW: 'container.lg',
  motionPreset: 'slideOutBottom',
  colorScheme: 'gray',
  marginLeft: '-25%',
}
