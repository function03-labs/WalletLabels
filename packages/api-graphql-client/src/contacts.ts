import { client } from './client'
import { graphql } from './gql'
import { CreateContactMutationVariables } from './gql/graphql'

const GetContactsQuery = graphql(`
  query GetContacts($type: String) {
    contacts(type: $type) {
      id
      firstName
      lastName
      name
      email
      type
      tags
      status
      createdAt
      updatedAt
    }
  }
`)

export const getContacts = async (variables: { type?: string | null }) => {
  return client.request(GetContactsQuery, variables)
}

const GetContactQuery = graphql(`
  query GetContact($id: String!) {
    contact(id: $id) {
      id
      firstName
      lastName
      name
      email
      status
      type
      createdAt
      updatedAt
    }
  }
`)

export const getContact = async (variables: { id: string }) => {
  return client.request(GetContactQuery, variables)
}

const GetContactActivitiesQuery = graphql(`
  query GetContactActivities($id: String!) {
    activities(contactId: $id) {
      id
      user {
        id
        firstName
        lastName
        name
        avatar
        status
      }
      type
      data
      date
      createdAt
      updatedAt
    }
  }
`)

export const getContactActivities = async (variables: { id: string }) => {
  return client.request(GetContactActivitiesQuery, variables)
}

const CreateContactMutation = graphql(`
  mutation CreateContact($contact: CreateContactInput!) {
    createContact(contact: $contact) {
      id
      firstName
      lastName
      name
      email
    }
  }
`)

export const createContact = async (
  variables: CreateContactMutationVariables,
) => {
  return client.request(CreateContactMutation, variables)
}

const AddCommentMutation = graphql(`
  mutation AddComment($contactId: String!, $comment: String!) {
    addActivityComment(id: $contactId, comment: $comment) {
      id
      user {
        id
        firstName
        lastName
        name
        avatar
        status
      }
      type
      data
      date
      createdAt
      updatedAt
    }
  }
`)

export const addComment = async (variables: {
  contactId: string
  comment: string
}) => {
  return client.request(AddCommentMutation, variables)
}

const DeleteCommentMutation = graphql(`
  mutation DeleteComment($id: String!) {
    deleteActivityComment(id: $id)
  }
`)

export const deleteComment = async (variables: { id: string }) => {
  return client.request(DeleteCommentMutation, variables)
}
