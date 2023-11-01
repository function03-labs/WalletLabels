'use client'

import { AuthLayout as BaseAuthLayout } from '@app/features/common/layouts/auth-layout'
import { useAuth } from '@saas-ui/auth'
import { useRouter } from '@app/nextjs'
import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  return <BaseAuthLayout>{children}</BaseAuthLayout>
}
