import React from 'react'
import { useWorkspace } from './use-workspace'

/**
 * Returns the path including the app base path and workspace.
 * @param path
 * @returns string The router path
 */
export const usePath = (path = '/') => {
  const workspace = useWorkspace()
  return React.useMemo(
    () => `/app/${workspace}/${path}`.replace(/\/\//, '/').replace(/\/$/, ''),
    [path, workspace],
  )
}
