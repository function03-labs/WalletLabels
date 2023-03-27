import {
  addActivity,
  getActivities,
  getComment,
  getContact as getMockContact,
  getContacts as getMockContacts,
  getTags as getMockTags,
} from './mock-data'
import { Contact } from './types'

export const getContacts = async (variables: { type?: string | null }) => {
  const type = (() => {
    switch (variables.type) {
      case 'customers':
        return 'customer'
      case 'leads':
        return 'lead'
    }
  })()

  const contacts = getMockContacts(type)

  return {
    contacts,
  }
}

export const getContact = async (variables: { id: string }) => {
  if (!variables.id) {
    throw new Error('Invalid contact id')
  }

  const contact = getMockContact(variables.id)

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

  const contact = getMockContact(variables.id)

  if (!contact) {
    throw new Error('Contact not found')
  }

  return {
    activities: getActivities() as any,
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
      ...(getMockContact() as Contact),
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      phone,
      type,
    },
  }
}

export const addComment = async (variables: {
  contactId: string
  comment: string
}) => {
  const comment = getComment(variables.comment)
  addActivity(comment)
  return {
    addActivityComment: comment,
  }
}

export const deleteComment = async (variables: { id: string }) => {
  return {}
}

export const getTags = async () => {
  return {
    tags: getMockTags(),
  }
}
