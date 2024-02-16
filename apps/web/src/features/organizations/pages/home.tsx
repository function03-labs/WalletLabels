import * as React from 'react'
import { useRouter } from '@app/nextjs'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'
import { useWorkspace } from '@app/features/common/hooks/use-workspace'
import { useCurrentUser } from '@app/features/common/hooks/use-current-user'

export const HomePage: React.FC = () => {
  const router = useRouter()
  const { data, isLoading } = useCurrentUser() // Destructure to get data and isLoading
  console.log('data', data)
  const workspace = useWorkspace()

  React.useEffect(() => {
    if (!isLoading) {
      // Check if not loading
      if (workspace) {
        router.push(`/${workspace}/apikeys`)
      } else if (data?.organizations?.[0]) {
        router.push(`/${data.organizations[0]}/apikeys`)
      } else {
        router.push('/getting-started')
      }
    }
  }, [router, isLoading, data, workspace])

  return (
    <LoadingOverlay>
      {' '}
      <LoadingSpinner />
    </LoadingOverlay>
  )
}
