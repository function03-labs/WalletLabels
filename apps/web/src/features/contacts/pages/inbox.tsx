import * as React from 'react'
import {
  FiInbox,
  FiChevronLeft,
  FiTrash,
  FiClock,
  FiSliders,
} from 'react-icons/fi'
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
  Box,
  Card,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  Portal,
  Spacer,
  Switch,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getNotifications, Notification } from '@api/client'
import { useRouter } from '@app/nextjs'

/**
 * This is a simple wrapper around the ContactsViewPage with an inbox specific toolbar
 */
function InboxViewPage(props: { item: Notification; onBack?: () => void }) {
  const toolbar = (
    <Toolbar variant="tertiary">
      <ToolbarButton
        display={{ base: 'inline-flex', lg: 'none' }}
        label="All notifications"
        onClick={props.onBack}
        icon={<FiChevronLeft size="1.2em" />}
        variant="ghost"
      />
      <Spacer />
      <ToolbarButton leftIcon={<FiTrash />} label="Delete notification" />
      <ToolbarButton leftIcon={<FiClock />} label="Snooze" />
    </Toolbar>
  )
  return (
    <Page>
      <PageHeader toolbar={toolbar} />
      <PageBody contentWidth="full" bg="page-body-bg-subtle">
        <Card h="100%">
          <ContactsViewPage id={props.item?.contactId} isEmbedded />
        </Card>
      </PageBody>
    </Page>
  )
}

export interface InboxListPageProps {
  id?: string
}

export function InboxListPage(props: InboxListPageProps) {
  const router = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ['Notifications'],
    queryFn: () => getNotifications(),
  })

  const isMobile = useBreakpointValue(
    { base: true, lg: false },
    { fallback: 'base' },
  )

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: !!props.id,
  })

  const [width, setWidth] = useLocalStorage('app.inbox-list.width', 280)

  React.useEffect(() => {
    if (router.isReady && !router.query.id && !isLoading && !isMobile) {
      const firstItem = data?.notifications[0]
      if (firstItem) {
        // redirect to the first inbox notification if it's available.
        router.replace({
          pathname: `/app/${router.query.workspace}/inbox/${firstItem.id}`,
        })
      }
    }
  }, [router, data, isLoading, isMobile])

  React.useEffect(() => {
    if (props.id) {
      onOpen()
    }
    // the isMobile dep is needed so that the SplitPage
    // will open again when the screen size changes to lg
  }, [props.id, isMobile])

  const [visibleProps, setVisibleProps] = React.useState<string[]>([])

  const notificationCount = data?.notifications?.length || 0

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

  let content = <Box />
  if (props.id) {
    const item = data?.notifications?.find((item) => item.id === props.id)
    content = item ? (
      <InboxViewPage item={item} onBack={() => onClose()} />
    ) : (
      <EmptyState
        title="Notification not found"
        description={`There is no notification with id ${props.id}.`}
      />
    )
  } else if (!notificationCount) {
    content = emptyState
  }

  return (
    <SplitPage isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <Resizer
        defaultWidth={width}
        onResize={({ width }) => setWidth(width)}
        isResizable={!isMobile}
      >
        <Page
          borderRightWidth={{ base: 0, lg: '1px' }}
          minWidth="280px"
          maxW={{ base: '100%', lg: '640px' }}
          position="relative"
          isLoading={isLoading}
          flex={{ base: '1', lg: 'unset' }}
        >
          <PageHeader title="Inbox" toolbar={toolbar} />
          <PageBody p="0">
            {!notificationCount && isMobile ? (
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
