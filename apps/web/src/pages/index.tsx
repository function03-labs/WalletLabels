import { Center, Button, Stack } from '@chakra-ui/react'
import { LinkButton, Logo } from '@ui/lib'

import { ButtonGroup, useAuth } from '@saas-ui/react'

export default function HomePage() {
  const { isAuthenticated, logOut } = useAuth() || {}

  return (
    <Center height="100vh">
      <Stack spacing="8">
        <Logo />

        {isAuthenticated ? (
          <ButtonGroup>
            <LinkButton href="/app" colorScheme="primary">
              Dashboard
            </LinkButton>
            <Button onClick={() => logOut()}>Logout</Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <LinkButton href="/login">Login</LinkButton>
            <LinkButton href="/signup">Sign up</LinkButton>
          </ButtonGroup>
        )}
      </Stack>
    </Center>
  )
}

HomePage.isPublic = true
