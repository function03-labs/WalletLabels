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
  <AppShell borderWidth="1px" {...args}>
    {children}
  </AppShell>
)

export const Basic = Template.bind({})
Basic.args = {
  height: '400px',
  navbar: (
    <Box height="16" borderBottomWidth="1px">
      Navbar
    </Box>
  ),
  sidebar: (
    <Box width="300px" borderRightWidth="1px">
      Sidebar
    </Box>
  ),
  children: <Box as="main">Main content</Box>,
  footer: (
    <Box height="16" borderTopWidth="1px">
      Footer
    </Box>
  ),
}

export const VariantFullscreen = Template.bind({})
VariantFullscreen.args = {
  variant: 'fullscreen',
  navbar: (
    <Box height="16" borderBottomWidth="1px">
      Navbar
    </Box>
  ),
  sidebar: (
    <Box width="300px" borderRightWidth="1px">
      Sidebar
    </Box>
  ),
  children: <Box as="main">Main content</Box>,
  footer: (
    <Box height="16" borderTopWidth="1px">
      Footer
    </Box>
  ),
}
