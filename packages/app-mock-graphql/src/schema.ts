import { makeExecutableSchema } from '@graphql-tools/schema'
import gql from 'graphql-tag'

const typeDefs = gql`
  scalar DateTime

  scalar Json

  type Mutation {
    createOrganization(name: String!, slug: String): Organization
    inviteToOrganization(
      emails: [String]!
      organizationId: String!
      role: String
    ): Boolean
    removeUserFromOrganization(
      organizationId: String!
      userId: String!
    ): Boolean
    updateOrganization(id: String!, name: String!, email: String): Organization
    updateUser(name: String, userId: String!): User
    updateMemberRoles(
      userId: String!
      organizationId: String!
      roles: [String]!
    ): OrganizationMember
    createContact(name: String!): Contact
  }

  type Organization {
    id: String!
    name: String!
    slug: String!
    plan: String
    email: String
    members(
      after: UserWhereUniqueInput
      before: UserWhereUniqueInput
      first: Int
      last: Int
    ): [OrganizationMember!]!
  }

  enum SubscriptionStatus {
    active
    trialing
    past_due
    paused
    canceled
  }

  type Subscription {
    id: String!
    organization: Organization!
    plan: String!
    status: SubscriptionStatus!
    startedAt: DateTime
    trialEndsAt: DateTime
    createdAt: DateTime
    updatedAt: DateTime
  }

  type OrganizationMember {
    id: String!
    user: User!
    organization: Organization
    roles: [String]!
  }

  input OrganizationWhereUniqueInput {
    id: String
    slug: String
  }

  type Query {
    currentUser: User
    organization(id: String, slug: String): Organization
    organizations: [Organization]
    subscription(slug: String): Subscription
    contacts: [Contact]
    contact(id: String): Contact
  }

  type User {
    email: String!
    id: String!
    name: String
    status: String
    avatar: String
    organizations(
      after: OrganizationWhereUniqueInput
      before: OrganizationWhereUniqueInput
      first: Int
      last: Int
    ): [Organization!]!
  }

  input UserWhereUniqueInput {
    email: String
    id: String
  }

  type Contact {
    id: String!
    email: String!
    firstName: String
    lastName: String
    fullName: String
    status: String
    type: String
    createdAt: DateTime
    updatedAt: DateTime
  }
`

export const schema = makeExecutableSchema({ typeDefs: typeDefs as any })
