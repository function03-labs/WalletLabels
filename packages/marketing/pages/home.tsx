'use client'

import { Center, Button, ButtonGroup, Stack } from '@chakra-ui/react'
import { LinkButton, Logo } from '@ui/lib'
import { useAuth } from '@saas-ui/auth'
import WalletlabelsLogo from '../../../apps/web/src/features/common/components/Logo';

export const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()

  return (
    <Center height="100vh">
      <Stack spacing="8">
        <Logo logo={<WalletlabelsLogo />} />

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
