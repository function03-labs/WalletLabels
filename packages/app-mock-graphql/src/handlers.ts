import { graphql } from 'msw'

import {
  CreateContactMutation,
  CreateContactMutationVariables,
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables,
  GetContactQuery,
  GetContactsQuery,
  GetContactsQueryVariables,
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetOrganizationQuery,
  GetOrganizationQueryVariables,
  InviteToOrganizationMutation,
  InviteToOrganizationMutationVariables,
  RemoveUserFromOrganizationMutation,
  RemoveUserFromOrganizationMutationVariables,
  UpdateMemberRolesMutation,
  UpdateMemberRolesMutationVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '@app/graphql'

import {
  getUser,
  getContact,
  getContacts,
  getOrganizations,
  getOrganization,
  getOrganizationMember,
} from './mock-data'

export const handlers = [
  graphql.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    'GetCurrentUser',
    (req, res, ctx) => {
      return res(
        ctx.data({
          currentUser: {
            ...getUser(),
            organizations: getOrganizations(),
          },
        }),
      )
    },
  ),
  graphql.query<GetOrganizationQuery, GetOrganizationQueryVariables>(
    'GetOrganization',
    (req, res, ctx) => {
      return res(
        ctx.data({
          organization: {
            ...getOrganization(),
            members: [getOrganizationMember()],
          },
        }),
      )
    },
  ),
  graphql.query<GetContactsQuery, GetContactsQueryVariables>(
    'GetContacts',
    (req, res, ctx) => {
      console.log()

      return res(
        ctx.data({
          contacts: getContacts(),
        }),
      )
    },
  ),
  graphql.query<GetContactQuery, GetContactQuery>(
    'GetContact',
    (req, res, ctx) => {
      return res(
        ctx.data({
          contact: getContact(),
        }),
      )
    },
  ),

  graphql.mutation<
    InviteToOrganizationMutation,
    InviteToOrganizationMutationVariables
  >('InviteToOrganization', (req, res, ctx) => {
    return res(ctx.data({ inviteToOrganization: true }))
  }),

  graphql.mutation<
    RemoveUserFromOrganizationMutation,
    RemoveUserFromOrganizationMutationVariables
  >('RemoveUserFromOrganization', (req, res, ctx) => {
    return res(ctx.data({ removeUserFromOrganization: true }))
  }),

  graphql.mutation<
    UpdateMemberRolesMutation,
    UpdateMemberRolesMutationVariables
  >('UpdateMemberRoles', (req, res, ctx) => {
    return res(ctx.data({}))
  }),

  graphql.mutation<UpdateUserMutation, UpdateUserMutationVariables>(
    'UpdateUser',
    (req, res, ctx) => {
      return res(
        ctx.data({
          updateUser: {
            id: req.body?.variables.id,
            name: req.body?.variables.name,
            email: req.body?.variables.email,
            organizations: getOrganizations(),
          },
        }),
      )
    },
  ),

  graphql.mutation<
    CreateOrganizationMutation,
    CreateOrganizationMutationVariables
  >('CreateOrganization', (req, res, ctx) => {
    return res(
      ctx.data({
        createOrganization: {
          ...getOrganization(),
          name: req.body?.variables.name,
        },
      }),
    )
  }),

  graphql.mutation<CreateContactMutation, CreateContactMutationVariables>(
    'CreateContact',
    (req, res, ctx) => {
      const parts = req.body?.variables.name.split(' ')

      const [firstName, ...lastName] = parts

      return res(
        ctx.data({
          createContact: {
            ...getContact(),
            firstName,
            lastName: lastName.join(' '),
          },
        }),
      )
    },
  ),
]
