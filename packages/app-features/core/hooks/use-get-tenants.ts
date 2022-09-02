import { useGetCurrentUserQuery } from '@app/graphql'

export const useGetTenants = () => {
  const { data } = useGetCurrentUserQuery({})

  return (
    data?.currentUser?.organizations?.map((organization) => ({
      id: organization.id,
      slug: organization.slug,
      label: organization.name || organization.id,
      logo: organization.logo || undefined,
      href: `/app/${organization.slug}`,
    })) || []
  )
}
