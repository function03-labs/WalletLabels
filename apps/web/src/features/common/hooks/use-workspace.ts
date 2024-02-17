import React from 'react'

import { useParams } from '@app/nextjs'
import { useLocalStorage } from '@saas-ui/react'

/**
 * Get the current workspace from localStorage if available.
 * The value is synced with the query params.
 *
 * @returns {string} The current workspace
 */
export const useWorkspace = () => {
  const params = useParams()
  const workspace = params.workspace?.toString() || ''

  const [activeWorkspace, setWorkspace] = useLocalStorage(
    'app.workspace',
    workspace,
  )

  React.useEffect(() => {
    if (workspace && workspace !== activeWorkspace) {
      setWorkspace(workspace)
    }
  }, [params])

  return activeWorkspace
}
