import { HStack, Tag, Text } from '@chakra-ui/react'
import { StatusBadge } from '@ui/lib'

const contactStatus: Record<string, { label: string; color: string }> = {
  active: {
    label: 'Active',
    color: 'green',
  },
  inactive: {
    label: 'Inactive',
    color: 'orange',
  },
  new: {
    label: 'New',
    color: 'blue',
  },
}

export const ContactStatus: React.FC<{
  status: keyof typeof contactStatus
  hideLabel?: boolean
  color?: string
}> = (props) => {
  const status = contactStatus[props.status] || contactStatus.new
  return (
    <HStack display="inline-flex" color={props.color}>
      <StatusBadge colorScheme={status.color} />
      {!props.hideLabel && <Text>{status.label}</Text>}
    </HStack>
  )
}
