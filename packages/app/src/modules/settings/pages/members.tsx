import { useRouter } from 'next/router'

import { useGetOrganizationQuery } from '@app/graphql'

import { useState } from 'react'
import { useInviteToOrganizationMutation } from '@app/graphql'

import { useRemoveUserFromOrganizationMutation } from '@app/graphql'

import { useUpdateOrganizationMutation } from '@app/graphql'

import * as Yup from 'yup'
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(25, 'Too long')
    .required()
    .label('Name'),
})

import { FiX, FiCopy } from 'react-icons/fi'

import { Box, Input, InputGroup, Avatar, Tag } from '@chakra-ui/react'

import { Page, Section } from '@saas-ui/pro'

import {
  Card,
  CardBody,
  CardFooter,
  List,
  Form,
  Field,
  Loading,
  InputRightButton,
  useSnackbar,
} from '@saas-ui/react'

function InvitationForm({ organizationId }: { organizationId: string }) {
  const snackbar = useSnackbar()
  const [email, setEmail] = useState('')
  const { isLoading, mutateAsync: inviteToOrganization } =
    useInviteToOrganizationMutation()

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault()
        snackbar
          .promise(
            inviteToOrganization({
              organizationId,
              email,
            }),
            {
              loading: `Inviting ${email}...`,
              success: `Invited ${email}!`,
              error: (err: Error) => err,
            },
          )
          .then(() => {
            setEmail('')
          })
      }}
    >
      <InputGroup>
        <Input
          type="email"
          placeholder="colleague@company.com"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          border="0"
        />
        <InputRightButton
          colorScheme="primary"
          disabled={email.length === 0}
          isLoading={isLoading}
          type="submit"
        >
          Invite
        </InputRightButton>
      </InputGroup>
    </form>
  )
}

function OrganizationUsers({ organization }: any) {
  const snackbar = useSnackbar()
  const { mutateAsync: removeUserFromOrganization } =
    useRemoveUserFromOrganizationMutation()

  const users = organization?.users.map((user: any) => ({
    id: user.id,
    icon: <Avatar name={user.name || user.email} />,
    primary: user.name || user.email,
    secondary: user.name ? user.email : undefined,
    tertiary: <Tag>Owner</Tag>,
    action: {
      icon: <FiX />,
      'aria-label': 'Remove user',
      onClick: () => {
        if (
          window.confirm(
            `Are you sure you want to remove ${user.email} from ${
              organization.name || 'this organization'
            }?`,
          )
        ) {
          snackbar.promise(
            removeUserFromOrganization({
              organizationId: organization.id,
              userId: user.id,
            }),
            {
              loading: `Removing ${user.email}...`,
              success: `Removed ${user.email}!`,
              error: (err: Error) => err,
            },
          )
        }
      },
    },
  }))
  return (
    <Section title="Users" description="Invite your colleagues" annotated>
      <Card>
        <List items={users || []} />
        <Box p="2">
          <InvitationForm organizationId={organization?.id} />
        </Box>
      </Card>
    </Section>
  )
}

export function OrganizationMembersPage() {
  const router = useRouter()
  const { slug } = router.query

  const { data, isLoading, error } = useGetOrganizationQuery({
    slug: String(slug),
  })

  const organization = data?.organization

  return (
    <Page
      isLoading={isLoading}
      variant="settings"
      title="Members"
      description="Manage who can access your organization"
    >
      <OrganizationUsers organization={organization} />
    </Page>
  )
}
