import { client } from './client'
import { graphql } from './gql'
import { UpdateMemberRolesMutationVariables } from './gql/graphql'

const GetOrganizationQuery = graphql(`
  query GetOrganization($id: String, $slug: String) {
    organization(id: $id, slug: $slug) {
      id
      name
      slug
      plan
      email
      logo
      members {
        roles
        user {
          id
          firstName
          lastName
          name
          email
          status
        }
      }
    }
  }
`)

export const getOrganization = async (variables: { slug?: string | null }) => {
  return client.request(GetOrganizationQuery, variables)
}

const GetOrganizationsQuery = graphql(`
  query GetOrganizations {
    organizations {
      id
      name
      slug
      plan
      logo
    }
  }
`)

export const getOrganizations = async () => {
  return client.request(GetOrganizationsQuery, {})
}

const InviteToOrganizationMutation = graphql(`
  mutation InviteToOrganization(
    $emails: [String]!
    $organizationId: String!
    $role: String
  ) {
    inviteToOrganization(
      emails: $emails
      organizationId: $organizationId
      role: $role
    )
  }
`)

export const inviteToOrganization = async (variables: {
  emails: string[]
  organizationId: string
  role?: string
}) => {
  return client.request(InviteToOrganizationMutation, variables)
}

const RemoveUserFromOrganizationMutation = graphql(`
  mutation RemoveUserFromOrganization(
    $userId: String!
    $organizationId: String!
  ) {
    removeUserFromOrganization(userId: $userId, organizationId: $organizationId)
  }
`)

export const removeUserFromOrganization = async (variables: {
  userId: string
  organizationId: string
}) => {
  return client.request(RemoveUserFromOrganizationMutation, variables)
}

const CreateOrganizationMutation = graphql(`
  mutation CreateOrganization($organization: CreateOrganizationInput!) {
    createOrganization(organization: $organization) {
      id
      name
      slug
      plan
    }
  }
`)

export const createOrganization = async (variables: {
  name: string
  slug?: string | null
}) => {
  return client.request(CreateOrganizationMutation, { organization: variables })
}

const UpdateOrganizationMutation = graphql(`
  mutation UpdateOrganization($organization: UpdateOrganizationInput!) {
    updateOrganization(organization: $organization) {
      id
      name
      slug
      email
    }
  }
`)

export const updateOrganization = async (variables: {
  id: string
  name: string
  email?: string | null
}) => {
  return client.request(UpdateOrganizationMutation, { organization: variables })
}

const UpdateMemberRolesMutation = graphql(`
  mutation UpdateMemberRoles(
    $userId: String!
    $organizationId: String!
    $roles: [String]!
  ) {
    updateMemberRoles(
      userId: $userId
      organizationId: $organizationId
      roles: $roles
    ) {
      roles
    }
  }
`)

export const updateMemberRoles = async (
  variables: UpdateMemberRolesMutationVariables,
) => {
  return client.request(UpdateMemberRolesMutation, variables)
}
