import * as React from 'react'

import {
  MembersInviteDialog,
  MembersInviteData,
  defaultMemberRoles,
} from '../members-invite-dialog'

import { Box, Tag, useDisclosure } from '@chakra-ui/react'
import {
  Card,
  CardProps,
  EmptyState,
  Field,
  FormLayout,
  Option,
  useModals,
} from '@saas-ui/react'
import { useSearchQuery } from '@saas-ui/pro'

import {
  Button,
  List,
  ListItem,
  ListItemAction,
  ListItemIcon,
  ListItemLabel,
  ListItemTertiary,
  MenuItem,
  OverflowMenu,
  PersonaAvatar,
} from '@saas-ui/react'

import { SearchInput } from '@app/features/core/components/search-input'

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
    <ListItem
      px="4"
      py="2"
      pe="14"
      borderBottomWidth="1px"
      sx={{ '&:last-of-type': { borderWidth: 0 } }}
    >
      <ListItemIcon>
        <PersonaAvatar
          name={member.name}
          presence={member.presence}
          size="xs"
        />
      </ListItemIcon>
      <ListItemLabel
        primary={member.name || member.email}
        secondary={member.name ? member.email : null}
      ></ListItemLabel>
      <ListItemTertiary>
        {isInvite ? (
          <Tag size="sm">{member.status}</Tag>
        ) : (
          <Roles roles={member.roles} />
        )}
      </ListItemTertiary>
      <ListItemAction>
        <Box>
          <OverflowMenu>{actions}</OverflowMenu>
        </Box>
      </ListItemAction>
    </ListItem>
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
  onInvite(data: MembersInviteData): Promise<any>
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
      modals.open?.({
        title: 'Update roles',
        type: 'form',
        onSubmit: ({ roles }: ChangeRoleFields) =>
          onUpdateRoles?.(member, roles),
        defaultValues: {
          roles: isMultiRoles ? member.roles : member.roles?.[0],
        },
        submitLabel: 'Update',
        body: (
          <FormLayout>
            <Field name="roles" type="radio" options={defaultMemberRoles} />
          </FormLayout>
        ),
      })
    },
    [roles],
  )

  return (
    <Card
      title={
        <SearchInput placeholder={searchLabel} size="sm" {...searchProps} />
      }
      action={
        <Button onClick={invite.onOpen} colorScheme="primary" variant="solid">
          {inviteLabel}
        </Button>
      }
      {...cardProps}
    >
      {results?.length ? (
        <List>
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
        </List>
      ) : (
        <EmptyState title={noResults} size="sm" p="4" />
      )}
      <MembersInviteDialog
        title={inviteLabel}
        onInvite={onInvite}
        isOpen={invite.isOpen}
        onClose={invite.onClose}
        roles={roles}
      />
    </Card>
  )
}
