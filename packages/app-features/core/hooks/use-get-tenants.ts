import { useCurrentUser } from './use-current-user'

export const useGetTenants = () => {
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
