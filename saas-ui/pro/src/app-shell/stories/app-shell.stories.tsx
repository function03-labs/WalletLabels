import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { Story, Meta } from '@storybook/react'

// import mdx from './app-shell.mdx'

import { AppShell } from '..'

export default {
  title: 'Components/Layout/AppShell',
  parameters: {
    docs: {
      // page: mdx,
    },
  },
} as Meta

const Template: Story = ({ children, ...args }) => (
  <AppShell {...args}>{children}</AppShell>
)

export const Basic = Template.bind({})
Basic.args = {
  navbar: (
    <Box bg="gray.300" height="16">
      Navbar
    </Box>
  ),
  sidebar: (
    <Box bg="gray.400" width="300px">
      Sidebar
    </Box>
  ),
  children: <Box as="main">Main content</Box>,
}
