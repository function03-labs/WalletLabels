import { AvailableProviders } from '@saas-ui/auth'

import { FaGoogle, FaGithub } from 'react-icons/fa'

/**
 * The authentication type, magiclink or password
 */
export const authType = 'password'

/**
 * Available OAuth providers for single sign on.
 */
export const authProviders: AvailableProviders = {
  google: {
    icon: FaGoogle,
    name: 'Google',
  },
  github: {
    icon: FaGithub,
    name: 'Github',
  },
}

/**
 * This maps routes to the corresponding auth view in the `Auth` component.
 */
export const authPaths: Record<string, any> = {
  '/login': {
    view: 'login',
    title: 'Welcome back',
  },
  '/signup': {
    view: 'signup',
    title: 'Sign up for free',
  },
  '/forgot_password': {
    view: 'forgot_password',
    title: 'Reset your password',
  },
  '/reset_password': {
    view: 'update_password',
    title: 'Enter a new password',
  },
}
