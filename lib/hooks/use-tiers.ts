import { useQuery } from '@tanstack/react-query'
import type { Tier } from "@/types/pricing"

export function useTiers<T = {
  tiers: Tier[]
}>() {
  return useQuery({
    queryKey: ['tiers'],
    queryFn: async () => {
      const response = await fetch('/api/pricing/tiers')
      const data = await response.json()
      return data as T
    }
  })
} 