import * as React from 'react'

import { PropertyList, Property, Persona, OverflowMenu } from '@saas-ui/react'

import { Aside, AsideHeader, AsideProps } from '@saas-ui-pro/react'

import type { Contact } from '@api/client'
import {
  Box,
  Button,
  Collapse,
  MenuItem,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { TagsList, TagsListItem, AddTag, TagColor } from '@ui/lib'
import { ContactStatus } from './contact-status'
import { ContactType } from './contact-type'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { DateTime } from '@app/i18n'
import { useTags } from '../hooks/use-tags'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface ContactSidebarProps extends AsideProps {
  contact?: Contact | null
}

export const ContactSidebar: React.FC<ContactSidebarProps> = (props) => {
  const { contact, ...rest } = props

  return (
    <Aside
      defaultWidth={400}
      minWidth="200px"
      maxWidth="500px"
      borderLeftWidth="1px"
      isResizable
      size="lg"
      {...rest}
    >
      {contact ? (
        <>
          <AsideHeader flexDirection="column" alignItems="flex-start" gap="4">
            <ContactType type={contact?.type} />
            <Stack direction="row" w="full">
              <Persona
                flex="1"
                name={contact?.name || ''}
                size="sm"
                secondaryLabel={contact?.email}
              />
              <OverflowMenu>
                <MenuItem>Delete</MenuItem>
              </OverflowMenu>
            </Stack>
          </AsideHeader>
          <ContactDetails contact={contact} />
        </>
      ) : null}
    </Aside>
  )
}

function ContactDetails({ contact }: { contact: Contact }) {
  const tags = contact.tags || []

  const { data: allTags } = useTags()

  const client = useQueryClient()

  const updateTags = useMutation({
    mutationFn: async (tags: string[]) => {
      /**
       * We update the cache here optimistically, so that the UI updates
       * immediately.
       *
       * You should call your api here to update the contact tags.
       *
       * If the mutation fails, we can use the `onError` callback to revert.
       */
      client.setQueryData(['Contact', contact.id], () => ({
        contact: {
          ...contact,
          tags,
        },
      }))
    },
  })

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  })

  const onCreateTags = (tag: string) => {
    updateTags.mutate([tag])
  }

  const onChangeTags = (tags: string[]) => {
    updateTags.mutate(tags)
  }

  return (
    <Box p="6" borderBottomWidth="1px">
      <Button
        variant="ghost"
        onClick={onToggle}
        ms="-3"
        rightIcon={isOpen ? <FiChevronDown /> : <FiChevronUp />}
        color="muted"
        sx={{
          '.chakra-button__icon': {
            opacity: 0,
            transitionProperty: 'all',
          },
          '&:hover .chakra-button__icon': {
            opacity: 1,
          },
        }}
        mb="2"
        fontWeight="medium"
      >
        Details
      </Button>
      <Collapse in={isOpen}>
        <PropertyList>
          <Property
            label="Status"
            value={<ContactStatus status={contact.status || 'new'} />}
          />
          <Property
            label="Signed up"
            value={<DateTime date={new Date(contact.createdAt)} />}
          />
          <Property
            label="Tags"
            value={
              <TagsList mt="2" ms="-2">
                {tags.map((t) => {
                  const tag = allTags?.tags.find((tag) => tag.label === t)
                  return (
                    <TagsListItem
                      key={t}
                      icon={<TagColor color={tag?.color || 'gray'} />}
                    >
                      {tag?.label || t}
                    </TagsListItem>
                  )
                })}
                <AddTag
                  tags={allTags?.tags}
                  onCreate={onCreateTags}
                  onChange={onChangeTags}
                />
              </TagsList>
            }
          />
        </PropertyList>
      </Collapse>
    </Box>
  )
}
