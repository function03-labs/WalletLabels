import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Box, BoxProps, Text, useBreakpointValue } from '@chakra-ui/react'

import { FiAlertCircle } from 'react-icons/fi'

import { AppShell } from '../../app-shell'

import { Toolbar, ToolbarButton } from '../../toolbar'

import { SplitPage, Page } from '..'
import { EmptyState, List, ListItem } from '@saas-ui/react'
import { BackButton } from '../back-button'
import { useSplitPage } from '../split-page'

export default {
  title: 'Components/Layout/SplitPage',
  decorators: [
    (Story: any) => (
      <AppShell borderWidth="1px" variant="default" height="calc(100vh - 40px)">
        <Story />
      </AppShell>
    ),
  ],
} as Meta

const Template: Story = (args) => <SplitPage {...args} />

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

export const WithContent = Template.bind({})
WithContent.args = {
  title: 'Page with content',
  toolbar: (
    <Toolbar>
      <ToolbarButton label="Save" colorScheme="primary" variant="solid" />
    </Toolbar>
  ),
  children: <PageContent />,
  content: (
    <Page>
      <PageContent />
    </Page>
  ),
}

export const WithEmptyContent = Template.bind({})
WithEmptyContent.args = {
  title: 'Page with empty content',
  toolbar: (
    <Toolbar>
      <ToolbarButton label="Save" colorScheme="primary" variant="solid" />
    </Toolbar>
  ),
  children: <PageContent />,
  content: <EmptyState title="Nothing here" />,
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

export const WithLoading = Template.bind({})
WithLoading.args = {
  title: 'Page with loading',
  isLoading: true,
  children: <PageContent />,
}

export const WithLoadingContent = Template.bind({})
WithLoadingContent.args = {
  title: 'Page with loading',
  isLoading: true,
  children: <PageContent />,
  content: <Page isLoading />,
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

const ResponsiveContent = () => {
  const { onClose } = useSplitPage()

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const nav = isMobile && <BackButton onClick={onClose} />
  return (
    <Page nav={nav}>
      <PageContent />
    </Page>
  )
}

const ResponsiveList = () => {
  const { onOpen } = useSplitPage()
  return (
    <List>
      <ListItem onClick={onOpen}>Responsive item</ListItem>
    </List>
  )
}

export const Responsive = Template.bind({})
Responsive.args = {
  title: 'Responsive SplitPage',
  children: <ResponsiveList />,
  content: <ResponsiveContent />,
}
