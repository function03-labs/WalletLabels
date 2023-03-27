import { Badge, BadgeProps } from '@chakra-ui/react'

export const StatusBadge = (props: BadgeProps) => (
  <Badge
    boxSize="2"
    borderRadius="full"
    borderWidth="2px"
    borderColor="currentColor"
    bg="transparent"
    p="0"
    {...props}
  />
)
