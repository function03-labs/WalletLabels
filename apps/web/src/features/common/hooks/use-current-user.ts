import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { getCurrentUser } from '@api/client'

export const useCurrentUser = () => {
  const { data } = useQuery({
    queryKey: ['CurrentUser'],
    queryFn: getCurrentUser,
  })
  return data?.currentUser
}
