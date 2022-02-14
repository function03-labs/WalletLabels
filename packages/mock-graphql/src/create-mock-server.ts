import {
  addMocksToSchema,
  mockServer,
  IMockServer,
  IMockStore,
  IMocks,
} from '@graphql-tools/mock'

import { schema } from './schema'

export type { IMockServer }

import slug from 'slug'

import * as data from './data'

/**
 * Create a Mock Graphql server
 *
 * We use the supabase client here directly to simulate authentication.
 * @param supabase Supabase client
 */
export const createMockServer = (supabase: any) => {
  const mocks: IMocks = {
    Query: {
      currentUser: () => {
        const user = supabase.auth.user()
        console.log('USER', user)
        return (
          user && {
            id: user.id,
            name: user.user_metadata?.name || '',
            email: user.email,
            organizations: [],
          }
        )
      },
      organization: (params: any) => {
        console.log(params)
        return {
          name: 'Saas UI',
        }
      },
    },
    User: () => {
      return {
        organizations: () => {
          return []
        },
      }
    },
    // Organization: () => {
    //   console.log(params)
    //   return {
    //     name: 'Saas UI',
    //   }
    // },
  }

  const resolvers = (store: IMockStore) => {
    return {
      Query: {
        currentUser: () => {
          const user = supabase.auth.user()

          if (!user) return null

          const _user = {
            id: user.id,
            name: user.user_metadata?.name || '',
            email: user.email,
            organizations: [],
          }

          return store.get('User', user.id, _user)
        },
        organization: (_: any, { slug }: any) => {
          return store.get('Organization', slug)
        },
        organizations: () => {
          return store.get('Organization')
        },
      },
      Mutation: {
        createOrganization: (_: any, params: any, ctx: any) => {
          const user = supabase.auth.user()
          const { name } = params

          const organization = {
            id: slug(name),
            name,
            slug: slug(name),
          }

          store.set('Organization', organization.slug, organization)
          store.set('User', user.id, 'organizations', [organization])
        },
      },
    }
  }

  const mockSchema = addMocksToSchema({ schema, mocks, resolvers })

  const preserveResolvers = true

  return mockServer(mockSchema, mocks, preserveResolvers)
}
