import {
  As,
  Box,
  Card,
  CardFooter,
  CardHeader,
  CardProps,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'

interface SettingsCardProps extends Omit<CardProps, 'title'> {
  icon?: As
  title?: React.ReactNode
  description?: React.ReactNode
  avatar?: React.ReactNode
  footer?: React.ReactNode
}

export const SettingsCard: React.FC<SettingsCardProps> = (props) => {
  const { title, description, footer, avatar, icon, children, ...rest } = props
  const showHeader = title || description || avatar || icon
  return (
    <Card {...rest}>
      {showHeader ? (
        <CardHeader display="flex" px="4" py="3">
          <Box mr="4">{icon ? <Icon as={icon} boxSize="8" /> : avatar}</Box>
          <Stack spacing="1">
            <Heading size="sm">{title}</Heading>

            <Text fontSize="sm" color="muted">
              {description}
            </Text>
          </Stack>
        </CardHeader>
      ) : null}
      {children}
      <CardFooter px="4" py="3" justifyContent="flex-end" borderTopWidth="1px">
        {footer}
      </CardFooter>
    </Card>
  )
}
