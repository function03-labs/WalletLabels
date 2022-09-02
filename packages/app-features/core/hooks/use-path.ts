import React from 'react'
import { useTenant } from '@saas-ui/pro'

/**
 * Returns the path including the app base path and tenant.
 * @param path
 * @returns string The router path
 */
export const usePath = (path = '/') => {
  const tenant = useTenant()
  return React.useMemo(
    () => `/app/${tenant}/${path}`.replace(/\/\//, '/').replace(/\/$/, ''),
    [path, tenant],
  )
}
