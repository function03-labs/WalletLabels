import * as React from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@saas-ui/auth'
import { createPage } from '@app/nextjs'
import { SignupPage } from '@app/features/auth'

/**
 * Enable isPublic to use the custom signup screen
 * Defaults to the default Auth component in AppLayout
 */

export default createPage({
  title: 'Signup',
  // isPublic: true,
  renderComponent: () => {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
      if (isAuthenticated) {
        router.push('/')
      }
    }, [isAuthenticated])

    return <SignupPage />
  },
})
