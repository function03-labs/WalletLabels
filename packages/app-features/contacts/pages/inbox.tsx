import * as React from 'react'
import { FiInbox, FiFilter, FiTrash, FiClock, FiSliders } from 'react-icons/fi'
import { EmptyState, useLocalStorage } from '@saas-ui/react'
import {
  MenuProperty,
  Page,
  PageBody,
  PageHeader,
  ResizeHandle,
  Resizer,
  SplitPage,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  ToolbarButton,
} from '@saas-ui-pro/react'

import { ContactsViewPage } from './view'
import { InboxList } from '../components/inbox-list'

import {
  Card,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  Switch,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getNotifications, Notification } from '@api/client'

/**
 * This is a simple wrapper around the ContactsViewPage with an inbox specific toolbar
 */
function InboxViewPage(props: { item: Notification }) {
  const toolbar = (
    <Toolbar variant="tertiary">
      <ToolbarButton leftIcon={<FiTrash />} label="Delete notification" />
      <ToolbarButton leftIcon={<FiClock />} label="Snooze" />
    </Toolbar>
  )
  return (
    <Page>
      <PageHeader toolbar={toolbar} />
      <PageBody contentWidth="full">
        <Card h="100%">
          <ContactsViewPage id={props.item?.contactId} />
        </Card>
      </PageBody>
    </Page>
  )
}

export interface InboxListPageProps {
  id?: string
}

export function InboxListPage(props: InboxListPageProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['Notifications'],
    queryFn: () => getNotifications(),
  })

  const isMobile = useBreakpointValue(
    { base: true, lg: false },
    { fallback: 'lg' },
  )

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: !!props.id,
  })

  const [width, setWidth] = useLocalStorage('app.inbox-list.width', 280)

  React.useEffect(() => {
    if (props.id) {
      onOpen()
    }
    // the isMobile dep is needed so that the SplitPage
    // will open again when the screen size changes to lg
  }, [props.id, isMobile])

  const [visibleProps, setVisibleProps] = React.useState<string[]>([])

  const displayProperties = (
    <ToggleButtonGroup
      type="checkbox"
      isAttached={false}
      size="xs"
      spacing="0"
      flexWrap="wrap"
      value={visibleProps}
      onChange={setVisibleProps}
    >
      {['id'].map((id) => {
        return (
          <ToggleButton
            key={id}
            value={id}
            mb="1"
            me="1"
            color="muted"
            _checked={{ color: 'app-text', bg: 'whiteAlpha.200' }}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )

  const toolbar = (
    <Toolbar>
      <Menu>
        <MenuButton
          as={ToolbarButton}
          leftIcon={<FiSliders />}
          label="Display"
          variant="tertiary"
        />
        <Portal>
          <MenuList maxW="260px">
            <MenuProperty
              label="Show snoozed"
              value={<Switch size="sm" defaultChecked={false} />}
            />
            <MenuProperty label="Show read" value={<Switch size="sm" />} />
            <Divider />
            <MenuProperty
              label="Display properties"
              value={displayProperties}
              orientation="vertical"
            />
          </MenuList>
        </Portal>
      </Menu>
    </Toolbar>
  )

  const emptyState = (
    <EmptyState
      icon={FiInbox}
      title="Inbox zero"
      description="Nothing to do here"
      variant="centered"
      height="100%"
    />
  )

  let content

  if (props.id) {
    const item = data?.notifications?.find((item) => item.id === props.id)
    content = item ? (
      <InboxViewPage item={item} />
    ) : (
      <EmptyState
        title="Notification not found"
        description={`There is no notification with id ${props.id}.`}
      />
    )
  } else {
    content = emptyState
  }

  const pageProps = isMobile
    ? {}
    : {
        borderRightWidth: '1px',
        minWidth: '280px',
        maxWidth: '640px',
      }

  return (
    <SplitPage isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Resizer
        defaultWidth={width}
        onResize={({ width }) => setWidth(width)}
        isResizable={!isMobile}
      >
        <Page
          minWidth="280px"
          maxW="640px"
          position="relative"
          flex="none"
          isLoading={isLoading}
          {...pageProps}
        >
          <PageHeader title="Inbox" toolbar={toolbar} />
          <PageBody p="0">
            {!data?.notifications?.length && isMobile ? (
              emptyState
            ) : (
              <InboxList items={data?.notifications || []} />
            )}
          </PageBody>
          <ResizeHandle />
        </Page>
      </Resizer>
      {content}
    </SplitPage>
  )
}
