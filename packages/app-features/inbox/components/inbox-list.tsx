import { usePath } from '@app/features/core/hooks/use-path'
import { HStack, Text } from '@chakra-ui/react'
import { useSplitPage } from '@saas-ui/pro'
import {
  PersonaAvatar,
  StructuredList,
  StructuredListCell,
  StructuredListItem,
  StructuredListItemProps,
  StructuredListProps,
} from '@saas-ui/react'
import { useNavigate } from '@saas-ui/router'
import { DateTimeSince } from '@ui/lib'

export interface InboxListProps extends StructuredListProps {
  items: []
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
  const navigate = useNavigate()
  const { onOpen } = useSplitPage()

  const color = !item.readAt ? 'app-text' : 'muted'

  return (
    <StructuredListItem
      {...rest}
      onClick={() => {
        navigate(`${basePath}/1`)
        onOpen()
      }}
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
    </StructuredListItem>
  )
}
