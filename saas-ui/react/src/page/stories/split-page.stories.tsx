import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import {
  chakra,
  Avatar,
  Box,
  BoxProps,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

import { FiAlertCircle, FiCode, FiFilter } from 'react-icons/fi'

import { Toolbar, ToolbarButton } from '../../toolbar'

import { SplitPage, Page, PageHeader, PageBody } from '..'
import {
  AppShell,
  EmptyState,
  StructuredList,
  StructuredListCell,
  StructuredListHeader,
  StructuredListIcon,
  StructuredListItem,
} from '@saas-ui/react'
import { BackButton } from '../back-button'
import { useSplitPage } from '../split-page'
import { ResizeHandle, ResizeHandler, Resizer } from '../../resize'

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

const List = () => (
  <StructuredList>
    <StructuredListItem href="#">
      <StructuredListCell width="14">
        <Avatar name="Elliot Alderson" size="sm" />
      </StructuredListCell>
      <StructuredListCell flex="1">
        <Text fontWeight="bold">A bug is never just a mistake.</Text>
        <Text fontSize="sm" color="muted" noOfLines={2}>
          <Text as="span" color="app-text">
            Elliot Alderson
          </Text>{' '}
          — It represents something bigger. An error of thinking that makes you
          who you are.
        </Text>
      </StructuredListCell>
    </StructuredListItem>
    <StructuredListItem href="#">
      <StructuredListCell width="14">
        <Avatar name="Tyrell Wellick" size="sm" />
      </StructuredListCell>
      <StructuredListCell flex="1">
        <Text fontWeight="bold">Hi</Text>
        <Text fontSize="sm" color="muted" noOfLines={2}>
          <Text as="span" color="app-text">
            Tyrell Wellick
          </Text>{' '}
          — Unfortunately, we’re all human. Except me, of course.
        </Text>
      </StructuredListCell>
    </StructuredListItem>
  </StructuredList>
)

const Content = (props: BoxProps) => {
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
    <SplitPage>
      <Page borderRightWidth="1px" width="30%" maxW="300px">
        <PageHeader title="Inbox" />
        <PageBody p="0">
          <List />
        </PageBody>
      </Page>
      <EmptyState title="Inbox zero" />
    </SplitPage>
  ),
}

export const WithContent = {
  render: () => (
    <SplitPage>
      <Page borderRightWidth="1px" width="30%" maxW="300px">
        <PageHeader title="Inbox" />
        <PageBody p="0">
          <List />
        </PageBody>
      </Page>
      <Page>
        <PageHeader
          title="Elliot Alderson"
          description="A bug is never just a mistake"
        />
        <PageBody>
          <Content />
        </PageBody>
      </Page>
    </SplitPage>
  ),
}

export const WithToolbar = {
  render: () => (
    <SplitPage>
      <Page borderRightWidth="1px" width="30%" maxW="300px">
        <PageHeader
          title="Inbox"
          toolbar={
            <Toolbar>
              <ToolbarButton label="Filter" icon={<FiFilter />} />
            </Toolbar>
          }
        />
        <PageBody p="0">
          <List />
        </PageBody>
      </Page>
      <Page>
        <PageHeader
          title="Elliot Alderson"
          description="A bug is never just a mistake"
        />
        <PageBody>
          <Content />
        </PageBody>
      </Page>
    </SplitPage>
  ),
}

export const Resizable = {
  render: () => {
    const [width, setWidth] = React.useState(300)

    const onResize: ResizeHandler = ({ width }) => {
      setWidth(width)
    }

    return (
      <SplitPage>
        <Resizer
          defaultWidth={width}
          onResize={onResize}
          isResizable={useBreakpointValue(
            { base: false, lg: true },
            { fallback: 'lg' },
          )}
        >
          <Page
            borderRightWidth="1px"
            minWidth="220px"
            maxW="600px"
            flex="none"
            position="relative"
          >
            <PageHeader
              title="Inbox"
              toolbar={
                <Toolbar>
                  <ToolbarButton label="Filter" icon={<FiFilter />} />
                </Toolbar>
              }
            />
            <PageBody p="0">
              <List />
            </PageBody>
            <ResizeHandle />
          </Page>
        </Resizer>
        <Page>
          <PageHeader
            title="Elliot Alderson"
            description="A bug is never just a mistake"
          />
          <PageBody>
            <Content />
          </PageBody>
        </Page>
      </SplitPage>
    )
  },
}

const breakpoints = { base: true, lg: false }

const ResponsiveContent = () => {
  const { onClose } = useSplitPage()

  const isMobile = useBreakpointValue(breakpoints)
  const nav = isMobile && <BackButton onClick={onClose} ms="-2" />

  return (
    <Page>
      <PageHeader
        title="Elliot Alderson"
        description="A bug is never just a mistake"
        nav={nav}
      />
      <PageBody>
        <Content />
      </PageBody>
    </Page>
  )
}

const ResponsiveList = () => {
  const { onOpen } = useSplitPage()
  return (
    <StructuredList>
      <StructuredListItem onClick={onOpen}>Responsive item</StructuredListItem>
    </StructuredList>
  )
}

export const Responsive = {
  render: () => {
    return (
      <SplitPage defaultIsOpen={false} breakpoint="lg">
        <Page
          borderRightWidth="1px"
          width="30%"
          maxW={{ base: 'full', lg: '300px' }}
        >
          <PageHeader title="Inbox" />
          <PageBody p="0">
            <ResponsiveList />
          </PageBody>
        </Page>
        <ResponsiveContent />
      </SplitPage>
    )
  },
}

const Queries = () => {
  const { onOpen } = useSplitPage()
  return (
    <StructuredList>
      <StructuredListItem onClick={() => onOpen}>
        <StructuredListIcon color="muted">
          <FiCode />
        </StructuredListIcon>
        <StructuredListCell px="2" flex="1">
          Get all users
        </StructuredListCell>
      </StructuredListItem>
    </StructuredList>
  )
}

export const Vertical = {
  render: () => {
    const breakpoints = { base: false }

    return (
      <SplitPage
        defaultIsOpen={false}
        breakpoints={breakpoints}
        orientation="vertical"
      >
        <Page borderBottomWidth="1px" height="30%">
          <PageHeader title="Queries" />
          <PageBody p="0">
            <Queries />
          </PageBody>
        </Page>
        <Page>
          <PageBody p="0">
            <chakra.div
              _focus={{ outline: 0 }}
              minH="100%"
              p="4"
              contentEditable
              dangerouslySetInnerHTML={{ __html: 'SELECT * FROM users' }}
            />
          </PageBody>
        </Page>
      </SplitPage>
    )
  },
}
