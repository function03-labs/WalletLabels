import { Badge, Tag, TagProps, Text } from '@chakra-ui/react'
import { useTags } from '../hooks/use-tags'

export const ContactTag: React.FC<TagProps & { tag: string }> = (props) => {
  const { tag, ...rest } = props

  const { data } = useTags()

  const t = data?.tags.find((t) => t.id === tag)

  if (!t) return null

  return (
    <Tag size="sm" colorScheme="gray" h="6" {...rest}>
      <Badge bg={t.color} boxSize="2" rounded="full" me="2" />
      <Text>{t.label}</Text>
    </Tag>
  )
}
