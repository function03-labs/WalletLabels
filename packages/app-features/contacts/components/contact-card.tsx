import React from 'react'
import { Card, CardBody, HStack, Heading, Stack, Text } from '@chakra-ui/react'
import { ContactTag } from './contact-tag'
import { ContactType } from './contact-type'

import { Contact } from '@api/client'
import { Link } from '@saas-ui/react'
import { usePath } from '@app/features/core/hooks/use-path'

export const ContactCard = ({ contact }: { contact: Contact }) => {
  const path = usePath(`/contacts/view/${contact.id}`)
  return (
    <Card
      as={Link}
      href={path}
      position="relative"
      w="full"
      userSelect="none"
      _hover={{
        textDecoration: 'none',
        bg: 'gray.50',
        _dark: {
          bg: 'whiteAlpha.100',
        },
      }}
      sx={{
        WebkitUserDrag: 'none',
      }}
    >
      <CardBody px="3" py="2" as={Stack}>
        <Heading size="xs" fontWeight="medium">
          {contact.name}
        </Heading>
        <Text color="muted">{contact.email}</Text>
        <HStack>
          <ContactType type={contact.type} size="sm" />
          {contact.tags?.map((tag) => (
            <ContactTag key={tag} tag={tag} size="sm" />
          ))}
        </HStack>
      </CardBody>
    </Card>
  )
}
