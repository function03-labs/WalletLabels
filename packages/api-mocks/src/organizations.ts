import slug from 'slug'
import {
  getCurrentUser,
  getOrganization as getMockOrganization,
  getOrganizationMember,
  getOrganizations as getMockOrganizations,
  organizationStore,
} from './mock-data'

export const getOrganization = async (variables: { slug?: string | null }) => {
  return {
    organization: {
      ...getMockOrganization(),
      members: [
        {
          id: '1',
          user: getCurrentUser(),
          roles: ['owner', 'admin'],
        },
        getOrganizationMember(),
      ],
    },
  }
}

export const getOrganizations = async () => {
  return { organizations: getMockOrganizations() }
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
  const organization = getMockOrganization()

  const data = {
    ...organization,
    name: variables.name,
    slug: variables.slug || slug(variables.name),
    members: [
      {
        id: '1',
        user: {
          id: '1',
        },
        roles: ['owner', 'admin'],
      },
    ],
  }

  organizationStore.getState().add(data)

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
