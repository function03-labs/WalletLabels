import { Container, Stack } from '@chakra-ui/react'
import Link from '@modules/core/components/link'

import { LoginForm } from '@saas-ui/auth'

export const LoginPage = () => {
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
          <LoginForm title="Log in" type="magiclink" />
        </Container>

        <Link href="/signup">Don't have an account yet? Sign up.</Link>
      </Stack>
    </Stack>
  )
}
