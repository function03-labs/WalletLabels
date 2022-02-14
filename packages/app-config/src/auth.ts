import { AvailableProviders } from '@saas-ui/auth'
import { createAuthService } from '@saas-ui/auth/services/supabase'

import { FaGoogle, FaGithub } from 'react-icons/fa'

import { supabase } from './supabase'

/**
 * The authentication type, magiclink or password
 */
export const authType = 'magiclink'

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
  },
  '/reset_password': {
    view: 'update_password',
  },
}

export const authService = createAuthService(supabase)
