import * as React from 'react'

import {
  LinkBox,
  LinkOverlay,
  LinkOverlayProps,
  Icon,
  As,
  useColorModeValue,
  Text,
} from '@chakra-ui/react'

import { Card, CardProps } from '@saas-ui/react'

interface SupportCardProps extends CardProps, Pick<LinkOverlayProps, 'href'> {
  icon: As<any>
}

export const SupportCard: React.FC<SupportCardProps> = (props) => {
  const { title, subtitle, icon, href } = props
  return (
    <Card
      title={
        <LinkOverlay href={href} fontWeight="medium">
          {title}
        </LinkOverlay>
      }
      subtitle={
        <Text fontSize="sm" color="muted">
          {subtitle}
        </Text>
      }
      avatar={<Icon as={icon} boxSize="4" mt="-6" />}
      as={LinkBox}
      _hover={{
        borderColor: useColorModeValue('blackAlpha.300', 'whiteAlpha.300'),
      }}
      bg="none"
      _dark={{ bg: 'none' }}
    />
  )
}
