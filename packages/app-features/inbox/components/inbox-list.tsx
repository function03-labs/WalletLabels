import { useRouter } from 'next/router'
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
import { useActivePath } from '@app/nextjs'

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
  item: any
}

const InboxListItem: React.FC<InboxListItemProps> = (props) => {
  const { item, ...rest } = props
  const basePath = usePath('inbox')
  const { push } = useRouter()
  const { onOpen } = useSplitPage()

  const color = !item.readAt ? 'app-text' : 'muted'

  const path = `${basePath}/${item.id}`
  const isActive = useActivePath(path)

  return (
    <StructuredListItem p="0" {...rest}>
      <StructuredListButton
        onClick={() => {
          push(path)
          onOpen()
        }}
        data-active={isActive === true ? '' : undefined}
      >
        <StructuredListCell width="14">
          <PersonaAvatar name={item.name} size="sm" />
        </StructuredListCell>
        <StructuredListCell flex="1" color={color}>
          <HStack alignItems="center">
            <Text fontWeight="bold" noOfLines={1} flex="1">
              {item.subject}
            </Text>
            <DateTimeSince
              date={new Date(item.createdAt)}
              format="short"
              color="muted"
              fontSize="sm"
              flexShrink="0"
            />
          </HStack>
          <Text fontSize="sm" color="muted" noOfLines={2}>
            <Text as="span" color={color}>
              {item.name}
            </Text>{' '}
            — {item.excerpt}
          </Text>
        </StructuredListCell>
      </StructuredListButton>
    </StructuredListItem>
  )
}
