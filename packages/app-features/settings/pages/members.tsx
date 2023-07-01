import * as React from 'react'
import { useSnackbar } from '@saas-ui/react'
import { Section, SectionBody, SectionHeader } from '@saas-ui-pro/react'

import {
  MembersList,
  Member,
} from '@app/features/organizations/components/members-list'
import { useWorkspace } from '@app/features/core/hooks/use-workspace'
import { InviteData, SettingsPage, useModals } from '@ui/lib'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getOrganization,
  inviteToOrganization,
  removeUserFromOrganization,
} from '@api/client'

export function MembersSettingsPage() {
  const slug = useWorkspace()
  const snackbar = useSnackbar()
  const modals = useModals()

  const { data, isLoading } = useQuery({
    queryKey: ['Organization', slug],
    queryFn: () => getOrganization({ slug }),
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

  const inviteUser = useMutation({
    mutationFn: inviteToOrganization,
  })

  const removeUser = useMutation({
    mutationFn: removeUserFromOrganization,
  })

  const onInvite = async ({ emails, role }: InviteData) => {
    if (!organization) return

    return snackbar.promise(
      inviteUser.mutateAsync({
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
        error: (err: Error) => err.message,
      },
    )
  }

  const onCancelInvite = async (member: Member) => {
    if (!organization) return

    return snackbar.promise(
      removeUser.mutateAsync({
        userId: member.id,
        organizationId: organization.id,
      }),
      {
        loading: `Removing ${member.email}...`,
        success: `Removed ${member.email}!`,
        error: (err: Error) => err.message,
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
        children: 'Remove',
      },
      onConfirm: async () => {
        await snackbar.promise(
          removeUser.mutateAsync({
            organizationId: organization.id,
            userId: member.id,
          }),
          {
            loading: `Removing ${member.email}...`,
            success: `Removed ${member.email}!`,
            error: (err: Error) => err.message,
          },
        )
      },
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
      <Section variant="annotated">
        <SectionHeader title="Members" description="Invite your colleagues" />
        <SectionBody>
          <MembersList
            members={members}
            onInvite={onInvite}
            onCancelInvite={onCancelInvite}
            onRemove={onRemove}
            onUpdateRoles={onUpdateRoles}
          />
        </SectionBody>
      </Section>
    </SettingsPage>
  )
}
