import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiExternalLink, FiLink } from 'react-icons/fi'

import { IconBadge } from '@saas-ui/react'

export type IntegrationCardProps = {
  name: string
  type: string
  description: string
  icon: any
  docs: string
  isConnected?: boolean
}

export const IntegrationCard: React.FC<IntegrationCardProps> = (props) => {
  return (
    <Card>
      <CardHeader>
        <HStack spacing="2" alignItems="flex-start">
          <IconBadge
            icon={<Icon as={props.icon} color="white" />}
            bg="black"
            variant="solid"
            size="md"
          />

          <VStack alignItems="flex-start" spacing="0" lineHeight="1.2">
            <Heading size="sm" fontWeight="medium">
              {props.name}
            </Heading>
            <Text color="muted" fontSize="sm">
              {props.type}
            </Text>
          </VStack>
        </HStack>
      </CardHeader>
      <CardBody py="0">
        <Text color="muted" fontSize="sm">
          {props.description}
        </Text>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          {!props.isConnected ? (
            <Button variant="primary" leftIcon={<Icon as={FiLink} />}>
              Connect
            </Button>
          ) : (
            <Button variant="secondary">Disconnect</Button>
          )}
          <Button variant="ghost" leftIcon={<Icon as={FiExternalLink} />}>
            Docs
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
