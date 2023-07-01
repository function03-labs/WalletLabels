import * as React from 'react'

import { useRouter } from '@app/nextjs'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@api/client'
import { useWorkspace } from '@app/features/core/hooks/use-workspace'

export const HomePage: React.FC = () => {
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['CurrentUser'],
    queryFn: () => getCurrentUser(),
  })

  const workspace = useWorkspace()

  React.useEffect(() => {
    if (workspace) {
      router.push(`/app/${workspace}`)
    } else if (!isLoading && data?.currentUser?.organizations?.[0]) {
      router.push(`/app/${data.currentUser.organizations[0].slug}`)
    } else if (!isLoading) {
      router.push('/app/getting-started')
    }
  }, [router, isLoading, data, workspace])

  return (
    <LoadingOverlay>
      <LoadingSpinner />
    </LoadingOverlay>
  )
}
