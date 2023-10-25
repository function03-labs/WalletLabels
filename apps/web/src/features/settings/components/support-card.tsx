import * as React from 'react'

import {
  Card,
  CardProps,
  LinkBox,
  LinkOverlay,
  LinkOverlayProps,
  Icon,
  As,
  Text,
  CardHeader,
  Stack,
  Box,
} from '@chakra-ui/react'

interface SupportCardProps
  extends Omit<CardProps, 'title'>,
    Pick<LinkOverlayProps, 'href'> {
  icon: As
  title: React.ReactNode
  description: React.ReactNode
}

export const SupportCard: React.FC<SupportCardProps> = (props) => {
  const { title, description, icon, href } = props
  return (
    <Card as={LinkBox} variant="outline">
      <CardHeader display="flex">
        <Box mr="4">
          <Icon as={icon} boxSize="4" mt="0.5" />
        </Box>
        <Stack spacing="1">
          <LinkOverlay href={href} fontWeight="medium">
            {title}
          </LinkOverlay>

          <Text fontSize="sm" color="muted">
            {description}
          </Text>
        </Stack>
      </CardHeader>
    </Card>
  )
}
