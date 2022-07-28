import { Badge, BadgeProps } from '@chakra-ui/react'

export const StatusBadge = (props: BadgeProps) => (
  <Badge
    boxSize="12px"
    borderRadius="full"
    borderWidth="2px"
    borderColor="currentColor"
    bg="transparent"
    {...props}
  />
)
