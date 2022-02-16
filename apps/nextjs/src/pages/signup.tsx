import * as React from 'react'
import router from 'next/router'

import { useAuth } from '@saas-ui/react'
import { createPage } from '@app/nextjs'
import { SignupPage } from '@modules/auth'

/**
 * Enable isPublic to use the custom signup screen
 * Defaults to the default Auth component in AppLayout
 */

export default createPage({
  title: 'Signup',
  // isPublic: true,
  renderComponent: () => {
    const { isAuthenticated } = useAuth()

    React.useEffect(() => {
      if (isAuthenticated) {
        router.push('/')
      }
    }, [isAuthenticated])

    return <SignupPage />
  },
})
