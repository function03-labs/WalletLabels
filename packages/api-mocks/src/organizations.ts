import slug from 'slug'
import * as mocks from './mock-data'
import { addDays } from 'date-fns'

export const getOrganization = async (variables: { slug?: string | null }) => {
  return {
    organization: {
      ...mocks.getOrganization(variables.slug),
      members: [
        {
          id: '1',
          user: mocks.getCurrentUser(),
          roles: ['owner', 'admin'],
        },
        mocks.getOrganizationMember(),
      ],
    },
  }
}

export const getOrganizations = async () => {
  return { organizations: mocks.getOrganizations() }
}

export const inviteToOrganization = async (variables: {
  emails: string[]
  organizationId: string
  role?: string
}) => {
  return { inviteToOrganization: true }
}

export const removeUserFromOrganization = async (variables: {
  userId: string
  organizationId: string
}) => {
  return { removeUserFromOrganization: true }
}

export const createOrganization = async (variables: {
  name: string
  slug?: string | null
}) => {
  const organization = mocks.getOrganization()

  const data = {
    ...organization,
    id: organization ? String(parseInt(organization.id) + 1) : '1',
    name: variables.name,
    slug: variables.slug || slug(variables.name),
    email: 'hello@saas-ui.dev',
    logo: '/img/saasui-round.png',
    members: [
      {
        id: '1',
        user: {
          id: '1',
        },
        roles: ['owner', 'admin'],
      },
    ],
    subscription: {
      id: '1',
      plan: 'pro',
      status: 'trialing',
      startedAt: new Date('2022-01-01').toISOString(),
      trialEndsAt: addDays(new Date(), 14).toISOString(),
    },
  }

  mocks.organizationStore.getState().add(data)

  return {
    createOrganization: data,
  }
}

export const updateOrganization = async (variables: {
  id: string
  name: string
  email?: string | null
}) => {
  const data = {
    id: variables.id,
    name: variables.name,
    email: variables.email,
  }

  return {
    updateOrganization: data,
  }
}
