import { useTenant } from '@saas-ui/pro'

/**
 * Returns the path including the app base path and tenant.
 * @param path
 * @returns string The router path
 */
export const usePath = (path = '/') => {
  const tenant = useTenant()

  return `/app/${tenant}/${path}`.replace('//', '/')
}
