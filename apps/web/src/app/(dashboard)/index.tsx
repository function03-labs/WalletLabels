'use client'

import { HomePage } from '@app/features/organizations/pages/home'
import { HomePage as MarketingHomePage } from 'marketing/pages/home'

import { useAuth } from '@saas-ui/auth'
import { Center, Spinner } from '@chakra-ui/react'

export const IndexPage = () => {
  const { isAuthenticated, isLoggingIn, ...rest } = useAuth()
  console.log(
    'isAuthenticated',
    isAuthenticated,
    'isLoggingIn',
    isLoggingIn,
    'rest',
    rest,
  )

  if (isLoggingIn) {
    return (
      <Center h="$100vh">
        <Spinner />
      </Center>
    )
  }

  if (isAuthenticated) {
    return <HomePage />
  }

  return <MarketingHomePage />
}
