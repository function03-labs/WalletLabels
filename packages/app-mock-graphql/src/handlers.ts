import { graphql } from 'msw'

import slug from 'slug'

import {
  Activity,
  AddCommentMutation,
  AddCommentMutationVariables,
  Contact,
  CreateContactMutation,
  CreateContactMutationVariables,
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
  GetContactActivitiesQuery,
  GetContactActivitiesQueryVariables,
  GetContactQuery,
  GetContactQueryVariables,
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
  getCurrentUser,
  getActivities,
  getComment,
  addActivity,
  deleteActivity,
} from './mock-data'

export const handlers = [
  graphql.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    'GetCurrentUser',
    (req, res, ctx) => {
      return res(
        ctx.data({
          currentUser: {
            ...getCurrentUser(),
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
            members: [
              {
                user: getCurrentUser(),
                roles: ['owner', 'admin'],
              },
              getOrganizationMember(),
            ],
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
      const type = (() => {
        switch (req.variables.type) {
          case 'customers':
            return 'customer'
          case 'leads':
            return 'lead'
        }
      })()

      const contacts = getContacts(type)

      return res(
        ctx.data({
          contacts,
        }),
      )
    },
  ),
  graphql.query<GetContactQuery, GetContactQueryVariables>(
    'GetContact',
    (req, res, ctx) => {
      if (!req.variables.id) {
        return res(ctx.status(500, 'Invalid contact id'))
      }

      const contact = getContact(req.variables.id)

      if (!contact) {
        return res(ctx.status(404, 'Contact not found'))
      }

      return res(
        ctx.data({
          contact: getContact(req.variables.id),
        }),
      )
    },
  ),
  graphql.query<GetContactActivitiesQuery, GetContactActivitiesQueryVariables>(
    'GetContactActivities',
    (req, res, ctx) => {
      return res(
        ctx.data({
          activities: getActivities() as Activity[],
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
      const user = getUser()

      return res(
        ctx.data({
          updateUser: {
            ...user,
            id: req.variables.id,
            name: req.variables.name,
            email: req.variables.email || user.email,
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
      name: req.variables.name,
      slug: slug(req.variables.name),
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
      const name = req.variables.name
      const [firstName, ...lastName] = name.split(' ')

      return res(
        ctx.data({
          createContact: {
            ...(getContact() as Contact),
            fullName: name,
            firstName,
            lastName: lastName.join(' '),
          },
        }),
      )
    },
  ),

  graphql.mutation<AddCommentMutation, AddCommentMutationVariables>(
    'AddComment',
    (req, res, ctx) => {
      const comment = getComment(req.variables.comment)
      addActivity(comment)

      return res(
        ctx.data({
          addActivityComment: comment,
        }),
      )
    },
  ),

  graphql.mutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    'DeleteComment',
    (req, res, ctx) => {
      deleteActivity(req.variables.id)
      return res(ctx.data({}))
    },
  ),
]
