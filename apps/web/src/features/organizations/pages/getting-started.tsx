'use client'

import * as React from 'react'

import { Center, Container } from '@chakra-ui/react'
import {
  LoadingOverlay,
  LoadingSpinner,
  Steps,
  StepsCompleted,
  StepsItem,
} from '@saas-ui/react'
import {
  OnboardingPage,
  InviteTeamMembersStep,
  CreateOrganizationStep,
} from '../components/onboarding'
import { useRouter } from '@app/nextjs'
import { getCurrentUser } from '@api/client'
import { useQuery } from '@tanstack/react-query'
import { useSessionStorageValue } from '@react-hookz/web'
import { SubscribeStep } from '../components/onboarding/subscribe'
import { AppearanceStep } from '../components/onboarding/appearance'

export const GettingStartedPage: React.FC = () => {
  const { isLoading } = useQuery({
    queryKey: ['CurrentUser'],
    queryFn: () => getCurrentUser(),
  })

  return (
    <OnboardingPage isLoading={isLoading}>
      <Container maxW="container.md">
        <Center minH="$100vh">
          <Steps variant="dots" flexDirection="column-reverse" width="full">
            <StepsItem title="Create organization">
              <CreateOrganizationStep />
            </StepsItem>
            <StepsItem title="Choose your style">
              <AppearanceStep />
            </StepsItem>
            <StepsItem title="Invite team members">
              <InviteTeamMembersStep />
            </StepsItem>
            <StepsItem title="Subscribe to updates">
              <SubscribeStep />
            </StepsItem>

            <StepsCompleted>
              <OnboardingCompleted />
            </StepsCompleted>
          </Steps>
        </Center>
      </Container>
    </OnboardingPage>
  )
}

const OnboardingCompleted = () => {
  const router = useRouter()
  const workspace = useSessionStorageValue('getting-started.workspace')

  React.useEffect(() => {
    router.push(`/${workspace.value}`)
  }, [])

  return (
    <LoadingOverlay
      variant="overlay"
      bg="chakra-body-bg"
      _dark={{ bg: 'chakra-body-bg' }}
    >
      <LoadingSpinner />
    </LoadingOverlay>
  )
}
