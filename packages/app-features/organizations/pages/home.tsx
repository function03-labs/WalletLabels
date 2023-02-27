import * as React from 'react'

import { useRouter } from 'next/router'
import { useTenant } from '@saas-ui/pro'
import { Loader } from '@saas-ui/react'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@api/client'

export const HomePage: React.FC = () => {
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['CurrentUser'],
    queryFn: () => getCurrentUser(),
  })

  const tenant = useTenant()

  React.useEffect(() => {
    if (tenant) {
      router.push(`/app/${tenant}`)
    } else if (!isLoading && data?.currentUser?.organizations?.[0]) {
      router.push(`/app/${data.currentUser.organizations[0].slug}`)
    } else if (!isLoading) {
      router.push('/app/getting-started')
    }
  }, [router, isLoading, data, tenant])

  return <Loader />
}
