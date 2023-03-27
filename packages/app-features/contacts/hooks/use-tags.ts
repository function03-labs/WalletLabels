import { getTags } from '@api/client'
import { useQuery } from '@tanstack/react-query'

export const useTags = () => {
  return useQuery({
    queryKey: ['GetTags'],
    queryFn: async () => {
      return await getTags()
    },
  })
}
