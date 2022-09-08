import * as React from 'react'

import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'

import { BackButton, Page } from '@saas-ui/pro'

import { Link, useAuth } from '@saas-ui/react'

export interface OnboardingPageProps {
  isLoading?: boolean
  hideBackButton?: boolean
  children: React.ReactNode
}

export const OnboardingPage: React.FC<OnboardingPageProps> = (props) => {
  const { hideBackButton, ...pageProps } = props
  const { user, logOut } = useAuth()

  const nav = (
    <HStack>
      {!hideBackButton && <BackButton as={Link} href="/app" />}
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          textAlign="left"
          py="2"
          height="auto"
        >
          <Text size="xs" color="muted">
            Logged in as
          </Text>
          <Text>{user?.email}</Text>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => logOut()}>Log out</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )

  return <Page nav={nav} fullWidth {...pageProps} />
}
