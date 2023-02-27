import { graphql } from 'msw'

import {
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables,
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetOrganizationQuery,
  GetOrganizationQueryVariables,
  GetOrganizationsQuery,
  GetOrganizationsQueryVariables,
  GetSubscriptionQuery,
  GetSubscriptionQueryVariables,
  InviteToOrganizationMutation,
  InviteToOrganizationMutationVariables,
  RemoveUserFromOrganizationMutation,
  RemoveUserFromOrganizationMutationVariables,
  UpdateMemberRolesMutation,
  UpdateMemberRolesMutationVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  AddCommentMutation,
  AddCommentMutationVariables,
  CreateContactMutation,
  CreateContactMutationVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
  GetContactActivitiesQuery,
  GetContactActivitiesQueryVariables,
  GetContactQuery,
  GetContactQueryVariables,
  GetContactsQuery,
  GetContactsQueryVariables,
} from '@api/graphql-client'

import {
  addComment,
  getContact,
  getContactActivities,
  getContacts,
  createContact,
  deleteComment,
} from '@api/mocks'
import {
  createOrganization,
  inviteToOrganization,
  getOrganization,
  getOrganizations,
  removeUserFromOrganization,
} from '@api/mocks'
import { getCurrentUser, updateUser } from '@api/mocks'
import { getSubscription } from '@api/mocks'

export const handlers = [
  graphql.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    'GetCurrentUser',
    async (req, res, ctx) => {
      return res(ctx.data(await getCurrentUser()))
    },
  ),
  graphql.query<GetOrganizationQuery, GetOrganizationQueryVariables>(
    'GetOrganization',
    async (req, res, ctx) => {
      return res(ctx.data(await getOrganization(req.variables)))
    },
  ),
  graphql.query<GetOrganizationsQuery, GetOrganizationsQueryVariables>(
    'GetOrganizations',
    async (req, res, ctx) => {
      return res(ctx.data(await getOrganizations()))
    },
  ),
  graphql.query<GetSubscriptionQuery, GetSubscriptionQueryVariables>(
    'GetSubscription',
    async (req, res, ctx) => {
      return res(ctx.data((await getSubscription(req.variables)) as any))
    },
  ),
  graphql.query<GetContactsQuery, GetContactsQueryVariables>(
    'GetContacts',
    async (req, res, ctx) => {
      return res(ctx.data(await getContacts(req.variables)))
    },
  ),
  graphql.query<GetContactQuery, GetContactQueryVariables>(
    'GetContact',
    async (req, res, ctx) => {
      return res(ctx.data(await getContact(req.variables)))
    },
  ),
  graphql.query<GetContactActivitiesQuery, GetContactActivitiesQueryVariables>(
    'GetContactActivities',
    async (req, res, ctx) => {
      return res(ctx.data(await getContactActivities(req.variables)))
    },
  ),

  graphql.mutation<
    InviteToOrganizationMutation,
    InviteToOrganizationMutationVariables
  >('InviteToOrganization', async (req, res, ctx) => {
    return res(ctx.data(await inviteToOrganization(req.variables as any)))
  }),

  graphql.mutation<
    RemoveUserFromOrganizationMutation,
    RemoveUserFromOrganizationMutationVariables
  >('RemoveUserFromOrganization', async (req, res, ctx) => {
    return res(ctx.data(await removeUserFromOrganization(req.variables)))
  }),

  graphql.mutation<
    UpdateMemberRolesMutation,
    UpdateMemberRolesMutationVariables
  >('UpdateMemberRoles', async (req, res, ctx) => {
    return res(ctx.data({}))
  }),

  graphql.mutation<UpdateUserMutation, UpdateUserMutationVariables>(
    'UpdateUser',
    async (req, res, ctx) => {
      return res(ctx.data((await updateUser(req.variables.user)) as any))
    },
  ),

  graphql.mutation<
    CreateOrganizationMutation,
    CreateOrganizationMutationVariables
  >('CreateOrganization', async (req, res, ctx) => {
    return res(ctx.data(await createOrganization(req.variables.organization)))
  }),

  graphql.mutation<CreateContactMutation, CreateContactMutationVariables>(
    'CreateContact',
    async (req, res, ctx) => {
      return res(ctx.data(await createContact(req.variables.contact)))
    },
  ),

  graphql.mutation<AddCommentMutation, AddCommentMutationVariables>(
    'AddComment',
    async (req, res, ctx) => {
      return res(ctx.data((await addComment(req.variables)) as any))
    },
  ),

  graphql.mutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    'DeleteComment',
    async (req, res, ctx) => {
      return res(ctx.data(await deleteComment({ id: req.variables.id })))
    },
  ),
]
