import { graphql } from 'msw'

import {
  GetContactQuery,
  GetContactsQuery,
  GetContactsQueryVariables,
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
} from '@app/graphql'

import { getUser, getContact, getContacts, getOrganizations } from './mock-data'

export const handlers = [
  graphql.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    'GetCurrentUser',
    (req, res, ctx) => {
      console.log(ctx)

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
]
