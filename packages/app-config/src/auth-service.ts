/**
 * Authentication is mocked in this example.
 * You should replace this file by your own auth service.
 *
 * @see https://saas-ui.dev/docs/pro/configuration/authentication
 */

import { AuthParams, User } from '@saas-ui/auth'

const defaultUser = {
  id: '1',
  name: 'Demo User',
  email: 'hello@saas-ui.dev',
}

const getSession = () => {
  try {
    if (typeof window === 'undefined') return

    const session = localStorage.getItem('@app/mock/session')

    return session && JSON.parse(session)
  } catch (e) {
    /*  */
  }

  return null
}

const setSession = (session: any) => {
  try {
    if (typeof window === 'undefined') return

    if (!session) {
      return localStorage.removeItem('@app/mock/session')
    }

    localStorage.setItem('@app/mock/session', JSON.stringify(session))
  } catch (e) {
    /*  */
  }
}

let user: User | null = getSession()

export const authService = {
  onLogin: async (params: AuthParams) => {
    user = {
      ...defaultUser,
      ...params,
    }

    setSession(user)

    return user
  },
  onSignup: async (params: AuthParams) => {
    user = {
      ...defaultUser,
      ...params,
    }

    setSession(user)
    return user
  },
  onLogout: async () => {
    setSession(null)
  },
  onLoadUser: async () => {
    return getSession()
  },
  onGetToken: async () => getSession()?.id,
}
