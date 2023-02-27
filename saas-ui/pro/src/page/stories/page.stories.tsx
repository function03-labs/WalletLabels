import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Box, BoxProps, Text } from '@chakra-ui/react'

import { FiAlertCircle } from 'react-icons/fi'

import { Toolbar, ToolbarButton } from '../../toolbar'

import { Page, BackButton } from '..'
import { AppShell, EmptyState } from '@saas-ui/react'

export default {
  title: 'Components/Layout/Page',
  decorators: [
    (Story: any) => (
      <AppShell borderWidth="1px" variant="default" height="calc(100vh - 40px)">
        <Story />
      </AppShell>
    ),
  ],
} as Meta

const Template: Story = (args) => <Page {...args} />

const PageContent = (props: BoxProps) => {
  return (
    <Box p="8" {...props}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed nibh
        sit amet nulla ultricies vehicula. Proin consequat auctor vestibulum.
        Phasellus sit amet fringilla erat, nec placerat dui. In iaculis ex non
        lacus dictum pellentesque. Pellentesque malesuada ipsum ex, ac ultricies
        nisi ornare non. Suspendisse potenti. Vestibulum hendrerit tellus elit,
        eget suscipit odio luctus ut. Nunc aliquam urna arcu, sit amet ultrices
        nunc malesuada id. Nam semper ante lectus, id egestas dolor tempus non.
      </Text>
    </Box>
  )
}

const ErrorContent = () => {
  throw new Error()
}

export const Basic = Template.bind({})
Basic.args = {
  title: 'Basic page',
  children: <PageContent />,
}

export const WithToolbar = Template.bind({})
WithToolbar.args = {
  title: 'Page with toolbar',
  toolbar: (
    <Toolbar>
      <ToolbarButton label="Save" colorScheme="primary" variant="solid" />
    </Toolbar>
  ),
  children: <PageContent />,
}

export const WithDescription = Template.bind({})
WithDescription.args = {
  title: 'Page with description',
  description: 'Description',
  children: <PageContent />,
}

export const WithFullWidth = Template.bind({})
WithFullWidth.args = {
  title: 'Page with full width',
  fullWidth: true,
  children: <PageContent />,
}

export const WithLoading = Template.bind({})
WithLoading.args = {
  title: 'Page with loading',
  isLoading: true,
  children: <PageContent />,
}

export const WithError = Template.bind({})
WithError.args = {
  title: 'Page with error',
  children: <ErrorContent />,
  errorComponent: (
    <EmptyState
      icon={FiAlertCircle}
      title="Oops, this doesn't look right"
      description="We've been notified about the problem"
    />
  ),
}

export const VariantHero = Template.bind({})
VariantHero.args = {
  title: 'Hero page',
  description: 'My hero page',
  variant: 'hero',
  colorScheme: 'purple',
  toolbar: (
    <Toolbar>
      <ToolbarButton label="Save" colorScheme="white" variant="subtle" />
    </Toolbar>
  ),
  children: <PageContent />,
}

export const VariantSettings = Template.bind({})
VariantSettings.args = {
  title: 'Settings page',
  description: 'Manage your settings',
  variant: 'settings',
  children: <PageContent px="0" />,
}

export const WithBackButton = Template.bind({})
WithBackButton.args = {
  title: 'Page with back button',
  nav: <BackButton />,
  children: <PageContent />,
}
