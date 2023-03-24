import { getTags } from '@api/client'
import { useQuery } from '@tanstack/react-query'

export const useTags = () => {
  return useQuery({
    queryKey: ['Tags'],
    queryFn: async () => {
      const { tags } = await getTags()
      return tags
    },
  })
}
