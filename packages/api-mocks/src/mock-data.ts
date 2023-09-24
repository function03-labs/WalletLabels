import {
  rand,
  randEmail,
  randFullName,
  randUser,
  randNumber,
  randBetweenDate,
  randFirstName,
  randLastName,
  User as RandUser,
} from '@ngneat/falso'

import { addDays, subDays } from 'date-fns'

import { createMockStore } from './mock-store'
import {
  Organization,
  Contact,
  Activity,
  DeepPartial,
  Notification,
  User,
} from './types'

interface OrganizationsStore extends Organization {
  id: string
}

interface ContactsStore extends Contact {
  id: string
}

export const organizationStore =
  createMockStore<OrganizationsStore>('organizations')
const contactsStore = createMockStore<ContactsStore>('contacts')

interface ActivitiesStore extends Activity {
  id: string
}

const activitiesStore = createMockStore<ActivitiesStore>('activities')

const mapContact = (user: RandUser, type?: string): Contact => {
  const { id, firstName, lastName, email } = user
  const name = [firstName, lastName].join(' ')
  return {
    id,
    firstName,
    lastName,
    name,
    email,
    status: rand(['new', 'active', 'inactive']),
    type: type || rand(['lead', 'customer']),
    tags: rand([[], [rand(['developer', 'designer', 'partner', 'prospect'])]]),
    avatar: `https://xsgames.co/randomusers/avatar.php?g=${rand([
      'male',
      'female',
      'pixel',
    ])}&name=${name}`,
    createdAt: randBetweenDate({
      from: new Date('01/01/2020'),
      to: new Date(),
    }).toISOString(),
    updatedAt: randBetweenDate({
      from: new Date('01/01/2020'),
      to: new Date(),
    }).toISOString(),
  }
}

export const getUser = () => {
  const firstName = randFirstName()
  const lastName = randLastName()
  return {
    id: randNumber().toString(),
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    email: randEmail(),
    status: 'online',
  }
}

export const getCurrentUser = (): User => {
  return {
    id: '1',
    email: 'hello@saas-ui.dev',
    name: 'Renata Alink',
    firstName: 'Renata',
    lastName: 'Alink',
    avatar: 'https://www.saas-ui.dev/showcase-avatar.jpg',
    status: 'online',
    workspace: {
      tags: ['developer', 'designer', 'partner', 'prospect'],
    },
  }
}

export const getTags = () => {
  return [
    {
      id: 'developer',
      label: 'Developer',
      color: 'purple.500',
      count: 210,
    },
    {
      id: 'designer',
      label: 'Designer',
      color: 'green.500',
      count: 83,
    },
    {
      id: 'partner',
      label: 'Partner',
      color: 'blue.500',
      count: 12,
    },
    {
      id: 'prospect',
      label: 'Prospect',
      count: 23,
    },
  ]
}

export const getComment = (comment: string): Activity => {
  const user = getCurrentUser()
  return {
    id: randNumber().toString(),
    user,
    type: 'comment',
    data: {
      comment,
    },
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }
}

export const getActivities = () => {
  const state = activitiesStore.getState()

  const activities = Object.values(state.data)

  if (!activities.length) {
    const user = getCurrentUser()

    const activities: Activity[] = [
      {
        id: '1',
        user,
        type: 'action',
        data: { action: 'created-contact' },
        date: subDays(new Date(), 1).toISOString(),
        createdAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: '2',
        user,
        type: 'comment',
        data: {
          comment:
            'Just talked with the customer and they will upgrade to Pro.',
        },
        date: subDays(new Date(), 1).toISOString(),
        createdAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: '3',
        user: {
          id: '2',
          name: 'Eelco Wiersma',
        },
        type: 'update',
        data: {
          field: 'status',
          value: 'active',
        },
        date: subDays(new Date(), 1).toISOString(),
        createdAt: subDays(new Date(), 1).toISOString(),
      },
    ]
    activities.forEach((activity) => {
      state.add(activity)
    })
  }

  return Object.values(state.data).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}

export const addActivity = (activity: Activity) => {
  const state = activitiesStore.getState()

  state.add(activity)
}

export const deleteActivity = (id: Activity['id']) => {
  const state = activitiesStore.getState()

  state.remove(id)
}

export const getContact = (id?: string): Contact | undefined => {
  if (!id) {
    return mapContact(randUser())
  }

  const contacts = getContacts()
  return contacts.find((contact) => contact.id === id)
}

export const getContacts = (
  type?: string,
  { refresh = false } = {},
): Contact[] => {
  const state = contactsStore.getState()

  const contacts = Object.values(state.data)
  if (refresh || !contacts.length) {
    randUser({ length: 100 })
      .map((user) => mapContact(user))
      .forEach((contact, i) => {
        state.add({
          ...contact,
          sortOrder: i,
        })
      })
  }

  let types: string[]
  switch (type) {
    case 'lead':
      types = ['lead']
      break
    case 'customer':
      types = ['customer']
      break
    default:
      types = ['lead', 'customer']
  }

  return Object.values(state.data).filter((contact) =>
    types.includes(contact.type as string),
  )
}

export const updateContact = (contact: Contact) => {
  return contactsStore.getState().update(contact.id, contact)
}

export const getOrganization = (slug?: string | null) => {
  const orgs = getOrganizations()
  return slug ? orgs.find((org) => org.slug === slug) || orgs[0] : orgs[0]
}

export const getOrganizationMember = () => ({
  id: '1',
  roles: ['member'],
  user: getUser(),
  organization: getOrganization(),
})

export const getOrganizations = () => {
  return organizationStore.getState().all()
}

export const getSubscription = (slug: string) => {
  return getOrganizations().find((org) => org.slug === slug)?.subscription
}

export const getNotification = (comment: string): Partial<Notification> => {
  const user = getCurrentUser()
  return {
    id: randNumber().toString(),
    userId: user.id,
    user,
    type: 'comment',
    date: new Date().toISOString(),
  }
}
