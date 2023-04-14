import * as React from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@saas-ui/auth'
import { createPage } from '@app/nextjs'
import { LoginPage } from '@app/features/auth'

/**
 * Enable isPublic to use the custom login screen
 * Defaults to the default Auth component in AppLayout
 */

export default createPage({
  title: 'Login',
  layout: 'auth',
  // isPublic: true,
  renderComponent: () => {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
      if (isAuthenticated) {
        router.push('/app')
      }
    }, [isAuthenticated])

    return <LoginPage />
  },
})
