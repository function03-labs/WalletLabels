import { usePath } from '@app/features/core/hooks/use-path'
import { Text } from '@chakra-ui/react'
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

export interface InboxListProps extends StructuredListProps {
  items: any
}

export const InboxList: React.FC<InboxListProps> = (props) => {
  const { items = [], ...rest } = props
  return (
    <StructuredList {...rest}>
      {items.map((item: any) => (
        <InboxListItem key={item.id} item={item} />
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
      <StructuredListCell flex="1">
        <Text fontWeight="bold">{item.subject}</Text>
        <Text fontSize="sm" color="muted" noOfLines={2}>
          <Text as="span" color="app-text">
            {item.name}
          </Text>{' '}
          — {item.message}
        </Text>
      </StructuredListCell>
    </StructuredListItem>
  )
}
