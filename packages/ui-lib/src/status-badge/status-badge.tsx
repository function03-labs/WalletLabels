import { Badge, BadgeProps } from '@chakra-ui/react'

export const StatusBadge = (props: BadgeProps) => (
  <Badge
    boxSize="2"
    borderRadius="full"
    borderWidth="2px"
    borderColor={`${props.colorScheme ?? 'gray'}.500`}
    bg="transparent"
    p="0"
    {...props}
  />
)
