import { Container } from '@chakra-ui/react'
import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Page } from '..'

export default {
  title: 'Components/Layout/Page',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = (args) => <Page {...args} />

export const Basic = Template.bind({})
Basic.args = {}
