import * as mocks from './mock-data'

import { Contact, Notification } from './types'

export const getContacts = async (variables: { type?: string | null }) => {
  const type = (() => {
    switch (variables.type) {
      case 'customers':
        return 'customer'
      case 'leads':
        return 'lead'
    }
  })()

  const contacts = mocks.getContacts(type)

  return {
    contacts,
  }
}

export const getContact = async (variables: { id: string }) => {
  if (!variables.id) {
    throw new Error('Invalid contact id')
  }

  const contact = mocks.getContact(variables.id)

  if (!contact) {
    throw new Error('Contact not found')
  }

  return {
    contact,
  }
}

export const getContactActivities = async (variables: { id: string }) => {
  if (!variables.id) {
    throw new Error('Invalid contact id')
  }

  const contact = mocks.getContact(variables.id)

  if (!contact) {
    throw new Error('Contact not found')
  }

  return {
    activities: mocks.getActivities() as any,
  }
}

export const createContact = async (variables: {
  firstName: string
  lastName: string
  email?: string | null
  phone?: string | null
  type?: string
}) => {
  const { firstName, lastName, email, phone, type } = variables
  return {
    createContact: {
      ...(mocks.getContact() as Contact),
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      phone,
      type,
    },
  }
}

export const updateContact = async (
  variables: { id: string } & Partial<Contact>,
) => {
  const { id, ...rest } = variables

  const contact = mocks.getContact(id)

  if (!contact) {
    throw new Error('Contact not found')
  }

  return {
    updateContact: mocks.updateContact({
      ...contact,
      ...rest,
    }),
  }
}

export const addComment = async (variables: {
  contactId: string
  comment: string
}) => {
  const comment = mocks.getComment(variables.comment)
  mocks.addActivity(comment)
  return {
    addActivityComment: comment,
  }
}

export const deleteComment = async (variables: { id: string }) => {
  mocks.deleteActivity(variables.id)
  return
}

export const getTags = async () => {
  return {
    tags: mocks.getTags(),
  }
}

export const getNotifications = async () => {
  const activities = mocks.getActivities()
  const contacts = mocks.getContacts()
  return {
    notifications: activities.map((activity) => {
      const contact = contacts[0]
      return {
        id: activity.id,
        type: activity.type,
        contactId: contact.id,
        contact: contacts[0],
        data: activity.data,
        userId: activity.id,
        user: activity.user,
        date: activity.date,
        createdAt: activity.createdAt,
      } as Notification
    }),
  }
}
