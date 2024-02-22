import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@saas-ui/auth'
import { useFetchOrgs } from './use-fetch-orgs'

export const useCurrentUser = () => {
  const { user, isAuthenticated } = useAuth()
  const { fetchOrgs } = useFetchOrgs()

  const getOrgs = async () => {
    if (!user || !isAuthenticated) {
      return []
    }
    if (user.id) {
      return fetchOrgs({ userId: user.id })
    }
  }

  const { data: orgs, isLoading } = useQuery({
    queryKey: ['orgs', user?.email],
    queryFn: getOrgs,
    enabled: !!user && isAuthenticated, // Only run query if user is authenticated
  })
  const dataOrgs = orgs?.map((org: any) => org.name) ?? []
  
  return {
    data: {
      ...user,
      organizations: dataOrgs,
    },
    isLoading,
  }
}
