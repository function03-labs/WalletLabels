import { Container, VStack } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Beacon, BeaconProps } from '../src'

const meta: Meta = {
  title: 'Components/Onboarding/Beacon',
  component: Beacon,
  parameters: {
    controls: { expanded: true },
  },
  args: {},
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      )
    },
  ],
}
export default meta

const Template: Story<BeaconProps> = (args) => <Beacon {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const ColorScheme = Template.bind({})
ColorScheme.args = {
  colorScheme: 'primary',
}

export const Sizes = () => {
  return (
    <VStack spacing="8">
      <Beacon size="sm" />
      <Beacon size="md" />
      <Beacon size="lg" />
    </VStack>
  )
}
