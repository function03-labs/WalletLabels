import { Center, Heading, Stack } from '@chakra-ui/react'
import { Button } from '@modules/core/components/button'
import { SaasUILogo } from '@modules/core/components/logo/saas-ui'
import { useAuth } from '@saas-ui/auth'
import { ButtonGroup } from '@saas-ui/react'

export default function HomePage() {
  const { isAuthenticated, logOut } = useAuth()

  return (
    <Center height="100vh">
      <Stack spacing="8">
        <SaasUILogo />

        {isAuthenticated ? (
          <ButtonGroup>
            <Button href="/app" colorScheme="primary">
              Dashboard
            </Button>
            <Button onClick={() => logOut()}>Logout</Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <Button href="/login">Login</Button>
            <Button href="/signup">Sign up</Button>
          </ButtonGroup>
        )}
      </Stack>
    </Center>
  )
}
