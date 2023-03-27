import { client } from './client'
import { graphql } from './gql'
import { UpdateUserInput } from './gql/graphql'

const currentUser = graphql(`
  query GetCurrentUser {
    currentUser {
      id
      firstName
      lastName
      name
      email
      avatar
      organizations {
        id
        name
        slug
        plan
        logo
      }
    }
  }
`)

export const getCurrentUser = () => {
  return client.request(currentUser, {})
}

const updateUserMutation = graphql(`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      firstName
      lastName
      name
      email
      organizations {
        id
        name
        slug
        plan
      }
    }
  }
`)

export const updateUser = (user: UpdateUserInput) => {
  return client.request(updateUserMutation, { user })
}
