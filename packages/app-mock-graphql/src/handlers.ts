import { graphql } from 'msw'

import slug from 'slug'

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
  GetSubscriptionQuery,
  GetSubscriptionQueryVariables,
  InviteToOrganizationMutation,
  InviteToOrganizationMutationVariables,
  RemoveUserFromOrganizationMutation,
  RemoveUserFromOrganizationMutationVariables,
  Subscription,
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
  organizationStore,
  getSubscription,
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
  graphql.query<GetSubscriptionQuery, GetSubscriptionQueryVariables>(
    'GetSubscription',
    (req, res, ctx) => {
      const subscription = getSubscription(req.body?.variables.slug)

      if (!subscription) {
        return res(ctx.status(404, 'Subscription not found'))
      }

      return res(
        ctx.data({
          subscription: subscription as Subscription,
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
    const organization = getOrganization()
    const data = {
      ...organization,
      name: req.body?.variables.name,
      slug: slug(req.body?.variables.name),
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

    return res(
      ctx.data({
        createOrganization: data,
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
