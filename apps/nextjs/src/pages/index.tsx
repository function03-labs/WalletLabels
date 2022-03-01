import { useRouter } from 'next/router'
import { Loader, useAuth } from '@saas-ui/react'
import { useEffect } from 'react'
import { useTenant } from '@saas-ui/tenancy'
import { useGetCurrentUserQuery } from '@app/graphql'

export function HomePage() {
  const router = useRouter()
  const { isLoggingIn } = useAuth()
  const tenant = useTenant()

  const { data } = useGetCurrentUserQuery()

  useEffect(() => {
    if (isLoggingIn || !data) {
      return
    }

    const user = data.currentUser

    if (user && (!user.organizations || !user.organizations.length)) {
      router.push('/app/getting-started')
    } else if (tenant) {
      router.push(`/app/${tenant}`)
    } else if (user?.organizations[0]) {
      router.push(`/app/${user.organizations[0].slug}`)
    }
  }, [isLoggingIn, data])

  return <Loader />
}

export default HomePage
