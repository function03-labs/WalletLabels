import {
  Card,
  CardBody,
  HStack,
  Heading,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { ContactTag } from './contact-tag'
import { ContactType } from './contact-type'

import { Contact } from '@api/client'
import { Link, PersonaAvatar } from '@saas-ui/react'
import { usePath } from '@app/features/core/hooks/use-path'
import { useDataBoardContext } from '@ui/lib'
import { ContactStatus } from './contact-status'

export const ContactCard = ({ contact }: { contact: Contact }) => {
  const path = usePath(`/contacts/view/${contact.id}`)

  const grid = useDataBoardContext()

  const state = grid.getState()
  const columns = state.columnVisibility
  const groupBy = state.grouping[0]

  const renderColumn = (column: string, component: React.ReactNode) => {
    if (columns[column] && groupBy != column) {
      return component
    }
    return null
  }

  const tags = typeof contact.tags === 'string' ? [contact.tags] : contact.tags

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
      <CardBody as={Stack} spacing="4" position="relative">
        <Stack justifyContent="flex-start" spacing="2">
          <Stack spacing="1">
            <HStack>
              {renderColumn(
                'status',
                <ContactStatus
                  status={contact.status}
                  hideLabel
                  position="absolute"
                  top="4"
                  right="4"
                />,
              )}
              <PersonaAvatar
                name={contact.name}
                src={contact.avatar}
                size="2xs"
              />
              <Heading as="h4" size="2xs" fontWeight="medium">
                {contact.name}
              </Heading>
            </HStack>
            {renderColumn(
              'email',
              <Text color="muted" noOfLines={1}>
                {contact.email}
              </Text>,
            )}
          </Stack>
        </Stack>
        <HStack>
          {renderColumn('type', <ContactType type={contact.type} size="sm" />)}
          {renderColumn(
            'tags',
            tags?.map((tag) => <ContactTag key={tag} tag={tag} size="sm" />),
          )}
        </HStack>
      </CardBody>
    </Card>
  )
}
