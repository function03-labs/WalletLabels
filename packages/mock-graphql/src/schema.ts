import { makeExecutableSchema } from '@graphql-tools/schema'
import gql from 'graphql-tag'

const typeDefs = gql`
  scalar DateTime

  scalar Json

  type Mutation {
    createOrganization(name: String!, slug: String): Organization
    inviteToOrganization(email: String!, organizationId: String!): Boolean
    removeUserFromOrganization(
      organizationId: String!
      userId: String!
    ): Organization
    updateOrganization(
      name: String!
      organizationId: String!
      slug: String
    ): Organization
    updateUser(name: String, userId: String!): User
  }

  enum BillingPlan {
    pro
  }

  type Organization {
    id: String!
    name: String!
    plan: BillingPlan
    slug: String!
    users(
      after: UserWhereUniqueInput
      before: UserWhereUniqueInput
      first: Int
      last: Int
    ): [User!]!
  }

  input OrganizationWhereUniqueInput {
    id: String
    slug: String
  }

  type Query {
    currentUser: User
    organization(id: String, slug: String): Organization
    organizations: [Organization]
  }

  type User {
    email: String!
    id: String!
    name: String
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
`

export const schema = makeExecutableSchema({ typeDefs: typeDefs as any })
