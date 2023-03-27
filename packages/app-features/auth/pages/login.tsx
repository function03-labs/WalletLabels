import * as React from 'react'

import { Container, Stack } from '@chakra-ui/react'
import { Link } from '@ui/lib'

import { LoginView, useAuth } from '@saas-ui/auth'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'

export const LoginPage = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
      </LoadingOverlay>
    )
  }

  return (
    <Stack flex="1" direction="row">
      <Stack
        flex="1"
        alignItems="center"
        justify="center"
        direction="column"
        spacing="8"
      >
        <Container>
          <LoginView title="Log in" type="magiclink" />
        </Container>

        <Link href="/signup">Don't have an account yet? Sign up.</Link>
      </Stack>
    </Stack>
  )
}
