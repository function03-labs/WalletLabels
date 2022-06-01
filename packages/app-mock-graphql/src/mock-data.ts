import {
  rand,
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

const contactsStore = {}

const mapContact = (user: User, type?: string) => {
  const { id, firstName, lastName, email } = user
  return {
    id,
    firstName,
    lastName,
    fullName: [firstName, lastName].join(' '),
    email,
    status: rand(['new', 'active', 'inactive']),
    type: type || rand(['lead', 'customer']),
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

export const getCurrentUser = () => {
  return {
    id: '1',
    email: 'hello@saas-ui.dev',
    name: 'Renata Alink',
    avatar: 'https://www.saas-ui.dev/showcase-avatar.jpg',
    organizations: getOrganizations(),
  }
}

export const getContact = () => mapContact(randUser())

export const getContacts = (type?: string, { refresh = false } = {}) => {
  const key = type || 'all'
  if (!refresh && contactsStore[key]) {
    return contactsStore[key]
  }
  const contacts = randUser({ length: 100 }).map((user) =>
    mapContact(user, type),
  )
  contactsStore[key] = contacts
  return contacts
}

export const getOrganization = () => {
  return getOrganizations()[0]
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
      email: 'hello@saas-ui.dev',
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
      email: 'info@acme-corp.com',
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
