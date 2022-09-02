import * as React from 'react'
import { useSnackbar, useModals } from '@saas-ui/react'
import { Section, useTenant } from '@saas-ui/pro'

import {
  useGetOrganizationQuery,
  useRemoveUserFromOrganizationMutation,
  useInviteToOrganizationMutation,
} from '@app/graphql'

import {
  MembersList,
  Member,
} from '@app/features/organizations/components/members-list'
import { MembersInviteData } from '@app/features/organizations/components/members-invite-dialog'
import { SettingsPage } from '@app/features/core/components/settings-page'

export function MembersSettingsPage() {
  const tenant = useTenant()
  const snackbar = useSnackbar()
  const modals = useModals()

  const { data, isLoading } = useGetOrganizationQuery({
    slug: tenant,
  })

  const organization = data?.organization

  if (!isLoading && !organization) {
    return null
  }

  const members =
    organization?.members.map(
      ({ roles, user: { id, email, name, status } }) => {
        return {
          id,
          email,
          name,
          status,
          roles,
        } as Member
      },
    ) || []

  const inviteToOrganization = useInviteToOrganizationMutation()

  const removeUserFromOrganization = useRemoveUserFromOrganizationMutation()

  const onInvite = async ({ emails, role }: MembersInviteData) => {
    if (!organization) return

    return snackbar.promise(
      inviteToOrganization.mutateAsync({
        organizationId: organization.id,
        emails,
        role,
      }),
      {
        loading:
          emails.length === 1
            ? `Inviting ${emails[0]}...`
            : `Inviting ${emails.length} people...`,
        success: `Invitation(s) have been sent.`,
        error: (err: Error) => err,
      },
    )
  }

  const onCancelInvite = async (member: Member) => {
    if (!organization) return

    return snackbar.promise(
      removeUserFromOrganization.mutateAsync({
        userId: member.id,
        organizationId: organization.id,
      }),
      {
        loading: `Removing ${member.email}...`,
        success: `Removed ${member.email}!`,
        error: (err: Error) => err,
      },
    )
  }

  const onRemove = (member: Member) => {
    if (!organization) return

    modals.confirm?.({
      title: 'Remove member',
      body: `Are you sure you want to remove ${member.email} from ${
        organization.name || 'this organization'
      }?`,
      confirmProps: {
        colorScheme: 'red',
        label: 'Remove',
      },
      onConfirm: () =>
        snackbar.promise(
          removeUserFromOrganization.mutateAsync({
            organizationId: organization.id,
            userId: member.id,
          }),
          {
            loading: `Removing ${member.email}...`,
            success: `Removed ${member.email}!`,
            error: (err: Error) => err,
          },
        ),
    })
  }

  const onUpdateRoles = async (member: Member, roles: string[]) => {
    return null
  }

  return (
    <SettingsPage
      isLoading={isLoading}
      title="Members"
      description="Manage who can access your organization"
    >
      <Section title="Members" description="Invite your colleagues" isAnnotated>
        <MembersList
          members={members}
          onInvite={onInvite}
          onCancelInvite={onCancelInvite}
          onRemove={onRemove}
          onUpdateRoles={onUpdateRoles}
        />
      </Section>
    </SettingsPage>
  )
}
