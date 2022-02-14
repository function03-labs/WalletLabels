import { Container, Stack } from '@chakra-ui/react'
import Link from '@modules/core/components/link'

import { SignupForm } from '@saas-ui/auth'

export const SignupPage = () => {
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
          <SignupForm title="Sign up" type="magiclink" />
        </Container>

        <Link href="/login">Already have an account? Log in.</Link>
      </Stack>
      <Stack flex="1" bg="primary.500"></Stack>
    </Stack>
  )
}
