import { usePath } from '@app/features/core/hooks/use-path'
import { HStack, Text } from '@chakra-ui/react'
import { useSplitPage } from '@saas-ui-pro/react'
import {
  PersonaAvatar,
  StructuredList,
  StructuredListButton,
  StructuredListCell,
  StructuredListItem,
  StructuredListItemProps,
  StructuredListProps,
} from '@saas-ui/react'
import { DateTimeSince } from '@ui/lib'
import { useActivePath, useRouter } from '@app/nextjs'
import { Notification } from '@api/client'

export interface InboxListProps extends StructuredListProps {
  items: any[]
}

export const InboxList: React.FC<InboxListProps> = (props) => {
  const { items = [], ...rest } = props
  return (
    <StructuredList {...rest}>
      {items.map((item: any, i) => (
        <InboxListItem key={i} item={item} />
      ))}
    </StructuredList>
  )
}

interface InboxListItemProps extends StructuredListItemProps {
  item: Notification
}

const InboxListItem: React.FC<InboxListItemProps> = (props) => {
  const { item, ...rest } = props
  const basePath = usePath('inbox')
  const { push } = useRouter()
  const { onOpen } = useSplitPage()

  const color = !item.readAt ? 'app-text' : 'muted'

  const path = `${basePath}/${item.id}`
  const isActive = useActivePath(path)

  const userAvatar = item.user?.name ? (
    <PersonaAvatar name={item.user?.name} src={item.user?.avatar} size="2xs" />
  ) : null

  return (
    <StructuredListItem p="0" {...rest}>
      <StructuredListButton
        onClick={() => {
          push(path)
          onOpen()
        }}
        data-active={isActive === true ? '' : undefined}
      >
        <StructuredListCell
          flex="1"
          color={color}
          display="flex"
          flexDirection="column"
          gap="2"
        >
          <HStack alignItems="center">
            <Text fontWeight="bold" noOfLines={1} flex="1">
              {item.contact.name}
            </Text>
            <DateTimeSince
              date={new Date(item.date)}
              format="short"
              color="muted"
              fontSize="sm"
              flexShrink="0"
            />
          </HStack>
          <HStack>
            {userAvatar} <Message item={item} />
          </HStack>
        </StructuredListCell>
      </StructuredListButton>
    </StructuredListItem>
  )
}

/**
 * @important dangerouslySetInnerHTML is used here to render the comment,
 * this is because the comment can contain HTML tags.
 *
 * You should make sure to sanitize the HTML before rendering it.
 *
 * @see https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 */
const Message = ({ item }: { item: Notification }) => {
  let message = ''
  const tags = Array.isArray(item.data?.tags) ? item.data?.tags : []

  if (item.type === 'comment' && item.data?.comment) {
    return (
      <Text fontSize="sm" noOfLines={2}>
        <Text as="span" color="inherit">
          {item.user?.name}
        </Text>{' '}
        —{' '}
        <Text
          as="span"
          color="muted"
          dangerouslySetInnerHTML={{ __html: item.data.comment }}
        />
      </Text>
    )
  }

  switch (item.type) {
    case 'action':
      switch (item.data?.action) {
        case 'created-contact':
          message = 'created contact'
      }
      break
    case 'update':
      message = `updated ${item.data?.field} to ${item.data?.value}`
      break
    case 'comment':
      message = 'left a comment'
      break
    case 'tags':
      message = 'updated tags to ' + tags?.join(', ')
      break
    case 'type':
      message = `changed type to ${item.data?.type}`
      break
    case 'status':
      message = `changed status to ${item.data?.status}`
  }

  return (
    <Text fontSize="sm" color="muted" noOfLines={2}>
      <Text as="span">{item.user?.name}</Text> {message}
    </Text>
  )
}
