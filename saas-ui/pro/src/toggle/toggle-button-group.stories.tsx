import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Center, Box } from '@chakra-ui/react'

import { ToggleButtonGroup, ToggleButtonGroupProps, ToggleButton } from '..'

export default {
  title: 'Components/Toggle/ToggleButtonGroup',
  component: ToggleButtonGroup,
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

export const CheckboxGroup = {
  render: () => (
    <ToggleButtonGroup
      type="checkbox"
      variant="outline"
      defaultValue={['1', '2']}
      onChange={(e) => console.log(e)}
    >
      <ToggleButton value="1">All</ToggleButton>
      <ToggleButton value="2">Leads</ToggleButton>
      <ToggleButton value="3">Customers</ToggleButton>
    </ToggleButtonGroup>
  ),
}

export const RadioGroup = {
  render: () => (
    <ToggleButtonGroup
      type="radio"
      variant="outline"
      defaultValue="1"
      onChange={(e) => console.log(e)}
    >
      <ToggleButton value="1">All</ToggleButton>
      <ToggleButton value="2">Leads</ToggleButton>
      <ToggleButton value="3">Customers</ToggleButton>
    </ToggleButtonGroup>
  ),
}
