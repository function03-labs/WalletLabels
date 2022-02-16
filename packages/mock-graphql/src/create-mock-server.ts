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
import { randEmail, randFullName, randUser, User } from '@ngneat/falso'

export interface MockContext {
  user: () => Promise<any>
}

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
export const createMockServer = (context: MockContext) => {
  const mapContact = (user: User) => {
    const { id, firstName, lastName, email } = user
    return {
      id,
      firstName,
      lastName,
      fullName: [firstName, lastName].join(' '),
      email,
    }
  }

  const mocks: IMocks = {
    Contact: () => mapContact(randUser()),
    Organization: () =>
      DATA.Organization || {
        name: 'Saas UI',
        slug: 'saas-ui',
      },
    Query: {
      contacts: () => {
        return randUser({ length: 20 }).map(mapContact)
      },
    },
  }

  initData()

  const resolvers = (store: IMockStore) => {
    return {
      Query: {
        currentUser: async () => {
          const user = await context.user()

          if (!user) return null

          const _user = {
            id: user.id,
            name: user.name || user.user_metadata?.name || '',
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
        createOrganization: async (_: any, params: any, ctx: any) => {
          const user = await context.user()
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
