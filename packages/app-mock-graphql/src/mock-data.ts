import {
  randEmail,
  randFullName,
  randUser,
  randNumber,
  randBetweenDate,
  User,
} from '@ngneat/falso'

import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'

import { Organization } from '@app/graphql'

import { createMockStore } from './mock-store'
import { DeepPartial } from './types'

interface OrganizationsStore extends DeepPartial<Organization> {
  id: string
}

export const organizationStore =
  createMockStore<OrganizationsStore>('organizations')

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

export const getUser = () => {
  return {
    id: randNumber().toString(),
    name: randFullName(),
    email: randEmail(),
    status: 'active',
  }
}

export const getContact = () => mapContact(randUser())

export const getContacts = () => {
  return randUser({ length: 100 }).map(mapContact)
}

export const getOrganization = () => {
  return {
    id: '1',
    name: 'Saas UI',
    slug: 'saas-ui',
    plan: 'pro',
  }
}

export const getOrganizationMember = () => ({
  roles: ['member'],
  user: getUser(),
  organization: getOrganization(),
})

export const getOrganizations = () => {
  return [
    {
      id: '1',
      name: 'Saas UI',
      slug: 'saas-ui',
      subscription: {
        id: '1',
        plan: 'pro',
        status: 'active',
        startedAt: new Date('2022-01-01'),
      },
    },

    {
      id: '2',
      name: 'ACME Corp',
      slug: 'acme-corp',
      subscription: {
        id: '2',
        plan: 'pro',
        status: 'trialing',
        startedAt: new Date(),
        trialEndsAt: addDays(new Date(), 14),
      },
    },

    {
      id: '3',
      name: 'Saas Inc',
      slug: 'saas-inc',
      subscription: {
        id: '3',
        plan: 'enterprise',
        status: 'canceled',
        startedAt: subDays(new Date(), 28),
        trialEndsAt: subDays(new Date(), 14),
      },
    },
  ]
}

export const getSubscription = (slug: string) => {
  return getOrganizations().find((org) => org.slug === slug)?.subscription
}
