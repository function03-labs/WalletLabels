import * as mocks from '@common/mocks'
import { getOrganizations } from './organizations'

export const getCurrentUser = async () => {
  const { user } = useAuth()
  console.log("inside current user", user)

  return {
    currentUser: {
      ...(await user),
      ...(await getOrganizations()),
    },
  }
}

export const updateUser = async (variables: {
  id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  passwordConfirmation?: string
}) => {
  return {
    updateUser: {
      id: variables.id,
      firstName: variables.firstName,
      lastName: variables.lastName,
      name: `${variables.firstName} ${variables.lastName}`,
      email: variables.email,
    },
  }
}
function useAuth(): { user: any } {
  throw new Error('Function not implemented.')
}

