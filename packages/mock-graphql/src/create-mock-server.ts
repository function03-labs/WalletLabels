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
import {
  randEmail,
  randFullName,
  randUser,
  randNumber,
  randBetweenDate,
  User,
} from '@ngneat/falso'

export interface MockContext {
  user: () => Promise<any>
}

let DATA: any = {}

const initData = () => {
  try {
    if (typeof window === 'undefined') {
      return
    }

    const json = localStorage.getItem('@app/mock-graphql/data')

    console.log('Init mock data', json)

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
      status: 'new',
      type: 'lead',
      createdAt: randBetweenDate({
        from: new Date('01/01/2020'),
        to: new Date(),
      }),
      updatedAt: randBetweenDate({
        from: new Date('01/01/2020'),
        to: new Date(),
      }),
    }
  }

  const mocks: IMocks = {
    Contact: () => mapContact(randUser()),
    Organization: () => {
      return (
        DATA.Organization || {
          name: 'Saas UI',
          slug: 'saas-ui',
        }
      )
    },
    User: () => {
      return {
        id: randNumber(),
        name: randFullName(),
        email: randEmail(),
        status: 'active',
      }
    },
    OrganizationMember: () => {
      return {
        roles: ['member'],
      }
    },
    Query: {
      currentUser: async () => {
        const user = await context.user()

        if (!user) return null

        return {
          id: user.id,
          name: user.name || user.user_metadata?.name || '',
          email: user.email,
        }
      },
      contacts: () => {
        return randUser({ length: 100 }).map(mapContact)
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
            organizations: [store.get('Organization')],
          }

          store.set('User', user.id, _user)

          store.set('OrganizationMember', user.id, {
            roles: ['admin'],
            user: store.get('User', user.id),
          })

          return _user
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
            plan: store.get('BillingPlan', 'pro'),
            slug: slug(name),
            members: [store.get('OrganizationMember', user.id)],
          }

          store.set('Organization', organization.slug, organization)
          store.set('User', user.id, 'organizations', [
            store.get('Organization', organization.slug),
          ])

          const member = {
            id: user.id,
            roles: ['admin'],
            user: store.get('User', user.id),
            organization: store.get('Organization', organization.slug),
          }

          store.set('OrganizationMember', user.id, member)

          DATA['Organization'] = organization
          DATA['OrganizationMember'] = [member]
          updateStorage()

          return store.get('Organization', organization.slug)
        },
        inviteToOrganization: async (_: any, params: any, ctx: any) => {
          const members: any[] = []
          params.emails.forEach(() => {
            const id = randNumber()
            store.set('User', id, {
              email: params.email,
              status: 'invited',
            })
            members.push(store.get('User', id))
          })
          const existingMembers = store.get(
            'Organization',
            'saas-ui',
            'members',
          ) as any[]

          store.set(
            'Organization',
            'saas-ui',
            'members',
            existingMembers.concat(members),
          )

          DATA['Organization'].members = existingMembers.concat(members)
          DATA['OrganizationMember'].concat(members)
          updateStorage()

          return true
        },
        updateMemberRoles: async (_: any, params: any) => {
          store.set('OrganizationMember', params.userId, 'roles', params.roles)

          return store.get('OrganizationMember', params.userId)
        },
      },
    }
  }

  const mockSchema = addMocksToSchema({ schema, mocks, resolvers })

  const preserveResolvers = true

  return mockServer(mockSchema, mocks, preserveResolvers)
}
