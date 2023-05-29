import { getCurrentUser as getMockCurrenUser } from './mock-data'
import { getOrganizations } from './organizations'

export const getCurrentUser = async () => {
  return {
    currentUser: {
      ...(await getMockCurrenUser()),
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
