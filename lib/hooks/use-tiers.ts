import { useQuery } from '@tanstack/react-query'

export function useTiers() {
  return useQuery({
    queryKey: ['tiers'],
    queryFn: async () => {
      const response = await fetch('/api/pricing/tiers')
      const data = await response.json()
      return data
    }
  })
} 