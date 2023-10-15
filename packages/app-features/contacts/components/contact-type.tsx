import { Badge, Tag, TagProps, Text } from '@chakra-ui/react'

const contactTypes: Record<string, { label: string; color: string }> = {
  lead: {
    label: 'Lead',
    color: 'cyan',
  },
  customer: {
    label: 'Customer',
    color: 'purple',
  },
}
export const ContactType: React.FC<
  TagProps & { type?: keyof typeof contactTypes }
> = (props) => {
  const { type: typeProp, ...rest } = props
  const type = (typeProp && contactTypes[typeProp]) || contactTypes.lead
  return (
    <Tag size="sm" colorScheme="gray" h="6" {...rest}>
      <Badge bg={`${type.color}.500`} boxSize="2" rounded="full" me="2" />
      <Text>{type.label}</Text>
    </Tag>
  )
}
