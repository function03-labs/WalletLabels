import { useCurrentUser } from './use-current-user'

/**
 * Get all workspaces of the current user
 * Workspace is the same as organization
 *
 * @returns {Array} The workspaces
 */
export const useWorkspaces = () => {
  const currentUser = useCurrentUser()

  return (
    currentUser?.data?.organizations?.map((organization) => ({
      id: organization,
      slug: organization,
      label: organization,
      logo: organization.logo || undefined,
      href: `/${organization}`,
    })) || []
  )
}
