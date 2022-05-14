import slug from 'slug'

import {
  randEmail,
  randFullName,
  randUser,
  randNumber,
  randBetweenDate,
  User,
} from '@ngneat/falso'

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

const updateData = () => {
  try {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.setItem('@app/mock-graphql/data', JSON.stringify(DATA))
  } catch (e) {
    console.error(e)
  }
}

const resetData = () => {
  try {
    if (typeof window === 'undefined') {
      return
    }

    localStorage.removeItem('@app/mock-graphql/data')
  } catch (e) {
    console.error(e)
  }
}

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
})

export const getOrganizations = () => {
  return [
    {
      id: '1',
      name: 'Saas UI',
      slug: 'saas-ui',
      plan: 'pro',
    },
  ]
}
