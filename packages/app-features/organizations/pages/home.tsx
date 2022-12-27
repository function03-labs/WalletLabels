import * as React from 'react'

import { useRouter } from 'next/router'
import { useTenant } from '@saas-ui/pro'
import { Loader } from '@saas-ui/react'
import { useGetCurrentUserQuery } from '@app/graphql'

export const HomePage: React.FC = () => {
  const router = useRouter()

  const { data, isLoading } = useGetCurrentUserQuery()

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
