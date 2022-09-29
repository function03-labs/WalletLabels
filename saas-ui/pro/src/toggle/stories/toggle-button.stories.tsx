import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Center, Box, HStack, VStack } from '@chakra-ui/react'

import { ToggleButton, ToggleButtonProps } from '..'

export default {
  title: 'Components/Toggle/ToggleButton',
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

const Template: Story<ToggleButtonProps> = (args) => <ToggleButton {...args} />

export const Basic = Template.bind({})
Basic.args = {
  value: '1',
  variant: 'outline',
  children: 'Toggle me',
}

export const ColorScheme = Template.bind({})
ColorScheme.args = {
  value: '1',
  variant: 'outline',
  colorScheme: 'primary',
  children: 'Toggle me',
}
