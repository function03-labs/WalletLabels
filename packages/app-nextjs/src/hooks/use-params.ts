import { useRouter } from 'next/router'

export const useParams = () => {
  const { query } = useRouter()

  return query
}
