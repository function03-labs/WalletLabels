import { Container } from '@chakra-ui/react'
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

export const Default = Template.bind({})
Default.args = {}
