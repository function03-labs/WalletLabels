import { useGetCurrentUserQuery } from '@app/graphql'

export const useCurrentUser = () => {
  const { data } = useGetCurrentUserQuery()
  return data?.currentUser
}
