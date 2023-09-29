'use client'

import * as React from 'react'
import { useRouter } from '@app/nextjs'

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
