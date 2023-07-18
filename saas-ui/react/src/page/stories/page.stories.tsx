import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Box, BoxProps, Button, Text } from '@chakra-ui/react'

import { FiAlertCircle } from 'react-icons/fi'

import { Toolbar, ToolbarButton } from '../../toolbar'

import { Page, BackButton, PageHeader, PageBody, PageDescription } from '..'
import { AppShell, EmptyState } from '@saas-ui/react'

export default {
  title: 'Components/Layout/Page',
  component: Page,
  decorators: [
    (Story: any) => (
      <AppShell borderWidth="1px" variant="default" height="calc(100vh - 40px)">
        <Story />
      </AppShell>
    ),
  ],
} as Meta

const PageContent = (props: BoxProps) => {
  return (
    <Box {...props}>
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

export const Basic = {
  render: () => (
    <Page>
      <PageHeader title="Basic page" />
      <PageBody>
        <PageContent />
      </PageBody>
    </Page>
  ),
}

export const WithToolbar = {
  render: () => (
    <Page>
      <PageHeader
        title="Page with toolbar"
        toolbar={
          <Toolbar>
            <ToolbarButton label="Save" colorScheme="white" variant="subtle" />
          </Toolbar>
        }
      />
      <PageBody>
        <PageContent />
      </PageBody>
    </Page>
  ),
}

export const WithDescription = {
  render: () => (
    <Page>
      <PageHeader
        title="Page with description"
        description="My page description"
      />
      <PageBody>
        <PageContent />
      </PageBody>
    </Page>
  ),
}

export const WithBackButton = {
  render: () => (
    <Page>
      <PageHeader title="Page with back button" nav={<BackButton />} />
      <PageBody>
        <PageContent />
      </PageBody>
    </Page>
  ),
}

export const WithLoading = {
  render: () => (
    <Page isLoading>
      <PageHeader title="Page with loading" />
      <PageBody>
        <PageContent />
      </PageBody>
    </Page>
  ),
}

export const WithError = {
  render: () => (
    <Page
      errorComponent={
        <EmptyState
          icon={FiAlertCircle}
          title="Oops, this doesn't look right"
          description="We've been notified about the problem"
        />
      }
    >
      <PageHeader title="Page with error" />
      <PageBody>
        <ErrorContent />
      </PageBody>
    </Page>
  ),
}

export const VariantHero = {
  render: () => (
    <Page variant="hero" colorScheme="purple">
      <PageHeader
        title="Analytics"
        description={
          <PageDescription maxW="400px">
            Get detailed analytics to measure and analyze how users engage with
            your apps description
          </PageDescription>
        }
        toolbar={
          <Toolbar>
            <ToolbarButton
              label="Upgrade"
              colorScheme="white"
              variant="subtle"
            />
          </Toolbar>
        }
      />
      <PageBody>
        <PageContent />
      </PageBody>
    </Page>
  ),
}

export const VariantSettings = {
  render: () => (
    <Page variant="settings">
      <PageHeader title="Settings page" description="Manage your settings" />
      <PageBody>
        <PageContent px="0" />
      </PageBody>
    </Page>
  ),
}

export const SettingsWithToolbar = {
  render: () => (
    <Page variant="settings">
      <PageHeader
        title="Settings page"
        description="Manage your settings"
        toolbar={
          <Toolbar>
            <Button variant="primary">Save</Button>
          </Toolbar>
        }
      />
      <PageBody>
        <PageContent px="0" />
      </PageBody>
    </Page>
  ),
}
