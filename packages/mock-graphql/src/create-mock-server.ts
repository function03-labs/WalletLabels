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

let DATA: any = {}

const initData = () => {
  try {
    if (typeof window === 'undefined') {
      return
    }

    const json = localStorage.getItem('@app/graphql/data')
    if (json) {
      DATA = JSON.parse(json)
    }
  } catch (e) {
    console.error(e)
  }
}

const updateStorage = () => {
  try {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem('@app/mock-graphql/data', JSON.stringify(DATA))
  } catch (e) {
    console.error(e)
  }
}

/**
 * Create a Mock Graphql server
 *
 * We use the supabase client here directly to simulate authentication.
 * @param supabase Supabase client
 */
export const createMockServer = (supabase: any) => {
  const mocks: IMocks = {
    Organization: () =>
      DATA.Organization || {
        name: 'Saas UI',
        slug: 'saas-ui',
      },
  }

  initData()

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
            organizations: [store.get('Query', 'organizations')],
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
            users: [store.get('Query', 'currentUser')],
          }

          store.set('Organization', organization.slug, organization)
          store.set('User', user.id, 'organizations', [organization])

          DATA['Organization'] = organization
          updateStorage()

          return store.get('Organization', organization.slug)
        },
      },
    }
  }

  const mockSchema = addMocksToSchema({ schema, mocks, resolvers })

  const preserveResolvers = true

  return mockServer(mockSchema, mocks, preserveResolvers)
}
