import * as React from 'react'

import { InviteDialog, InviteData, defaultMemberRoles } from '@ui/lib'

import {
  Box,
  Button,
  Card,
  CardHeader,
  CardProps,
  Heading,
  HStack,
  Tag,
  Text,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react'
import { EmptyState, Field, FormLayout, Option } from '@saas-ui/react'
import { useSearchQuery } from '@saas-ui-pro/react'

import {
  StructuredList,
  StructuredListItem,
  StructuredListIcon,
  StructuredListCell,
  OverflowMenu,
  PersonaAvatar,
} from '@saas-ui/react'

import { SearchInput, useModals } from '@ui/lib'
import { z } from 'zod'
import without from 'lodash/without'

export interface Member {
  id: string
  email: string
  name?: string
  status?: 'invited' | 'active'
  roles?: string | string[]
  presence?: string
}

const Roles = ({ roles }: { roles?: string | string[] }) => {
  if (!roles || !roles.length) {
    return null
  }

  if (typeof roles === 'string') {
    return <Tag size="sm">{roles}</Tag>
  }

  return (
    <>
      {roles?.map((role) => (
        <Tag key={role} size="sm">
          {role}
        </Tag>
      ))}
    </>
  )
}

interface ChangeRoleFields {
  roles: string[]
}

interface MemberListItemProps<M> {
  member: M
  onRemove(member: M): void
  onResendInvite(member: M): void
  onCancelInvite(member: M): void
  onChangeRole(member: M): void
}
function MembersListItem<M extends Member = Member>({
  member,
  onRemove,
  onResendInvite,
  onCancelInvite,
  onChangeRole,
}: MemberListItemProps<M>) {
  let actions

  const isInvite = member.status === 'invited'

  if (isInvite) {
    actions = (
      <>
        <MenuItem onClick={() => onResendInvite?.(member)}>
          Resend invitation
        </MenuItem>
        <MenuItem onClick={() => onCancelInvite?.(member)}>
          Cancel invitation
        </MenuItem>
      </>
    )
  } else {
    actions = (
      <>
        <MenuItem onClick={() => onChangeRole?.(member)}>Change role</MenuItem>
        <MenuItem onClick={() => onRemove?.(member)}>Remove member</MenuItem>
      </>
    )
  }

  return (
    <StructuredListItem
      py="4"
      borderBottomWidth="1px"
      sx={{ '&:last-of-type': { borderWidth: 0 } }}
    >
      <StructuredListIcon>
        <PersonaAvatar
          name={member.name}
          presence={member.presence}
          size="xs"
        />
      </StructuredListIcon>
      <StructuredListCell flex="1" px="4">
        <Heading size="sm">{member.name || member.email}</Heading>
        <Text color="muted" size="sm">
          {member.name ? member.email : null}
        </Text>
      </StructuredListCell>
      <StructuredListCell>
        <HStack>
          {isInvite ? (
            <Tag size="sm">{member.status}</Tag>
          ) : (
            <Roles roles={member.roles} />
          )}
        </HStack>
      </StructuredListCell>
      <StructuredListCell>
        <Box>
          <OverflowMenu>{actions}</OverflowMenu>
        </Box>
      </StructuredListCell>
    </StructuredListItem>
  )
}

export interface MembersListProps<M> extends Omit<CardProps, 'children'> {
  inviteLabel?: string
  searchLabel?: string
  noResults?: string
  members: M[]
  roles?: Option[]
  isMultiRoles?: boolean
  onRemove(member: M): void
  onInvite(data: InviteData): Promise<any>
  onCancelInvite(member: M): Promise<any>
  onUpdateRoles(member: M, roles: string[]): Promise<any>
}

export function MembersList<M extends Member = Member>({
  inviteLabel = 'Invite people',
  searchLabel = 'Filter by name or email',
  noResults = 'No people found',
  members,
  roles = defaultMemberRoles,
  isMultiRoles = false,
  onRemove,
  onInvite,
  onCancelInvite,
  onUpdateRoles,
  ...cardProps
}: MembersListProps<M>) {
  const modals = useModals()
  const invite = useDisclosure()

  const { results, ...searchProps } = useSearchQuery<M>({
    items: members,
    fields: ['name', 'email'],
  })

  const onChangeRole = React.useCallback(
    (member: M) => {
      modals.form?.({
        title: 'Update roles',
        schema: z.object({
          roles: isMultiRoles ? z.array(z.string()) : z.string(),
        }),
        onSubmit: async ({ roles }) => {
          if (typeof roles === 'string') {
            roles = [roles]
          }

          onUpdateRoles?.(member, roles)
        },
        defaultValues: {
          roles: isMultiRoles
            ? member.roles
            : without(member.roles, 'owner')?.[0],
        },
        fields: {
          submit: {
            children: 'Update',
          },
        },
        children: (
          <FormLayout>
            <Field name="roles" type="radio" options={defaultMemberRoles} />
          </FormLayout>
        ),
      })
    },
    [roles],
  )

  return (
    <Card {...cardProps}>
      <CardHeader display="flex">
        <SearchInput
          placeholder={searchLabel}
          size="sm"
          {...searchProps}
          mr="2"
        />
        <Button
          onClick={invite.onOpen}
          colorScheme="primary"
          variant="solid"
          flexShrink="0"
        >
          {inviteLabel}
        </Button>
      </CardHeader>
      {results?.length ? (
        <StructuredList py="0">
          {results.map((member, i) => (
            <MembersListItem<M>
              key={i}
              member={member}
              onRemove={onRemove}
              onResendInvite={({ email, roles }) =>
                onInvite({ emails: [email], role: roles?.[0] })
              }
              onCancelInvite={onCancelInvite}
              onChangeRole={onChangeRole}
            />
          ))}
        </StructuredList>
      ) : (
        <EmptyState title={noResults} size="sm" p="4" />
      )}
      <InviteDialog
        title={inviteLabel}
        onInvite={onInvite}
        isOpen={invite.isOpen}
        onClose={invite.onClose}
        roles={roles}
      />
    </Card>
  )
}
