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
    currentUser?.organizations?.map((organization) => ({
      id: organization.id,
      slug: organization.slug,
      label: organization.name || organization.id,
      logo: organization.logo || undefined,
      href: `/app/${organization.slug}`,
    })) || []
  )
}
