import { usePath } from '@app/features/core/hooks/use-path'
import { useSplitPage } from '@saas-ui/pro'
import { List, ListItem, ListItemProps, ListProps } from '@saas-ui/react'
import { useNavigate } from '@saas-ui/router'

export interface InboxListProps extends ListProps {
  items: any
}

export const InboxList: React.FC<InboxListProps> = (props) => {
  const { items = [], ...rest } = props
  return (
    <List {...rest}>
      {items.map((item: any) => (
        <InboxListItem key={item.id} item={item} />
      ))}
    </List>
  )
}

interface InboxListItemProps extends ListItemProps {
  item: any
}

const InboxListItem: React.FC<InboxListItemProps> = (props) => {
  const { item, ...rest } = props
  const basePath = usePath('inbox')
  const navigate = useNavigate()
  const { onOpen } = useSplitPage()

  return (
    <ListItem
      {...rest}
      onClick={() => {
        navigate(`${basePath}/1`)
        onOpen()
      }}
      primary={item.title}
    />
  )
}
