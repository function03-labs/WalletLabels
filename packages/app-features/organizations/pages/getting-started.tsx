'use client'

import * as React from 'react'

import { Container } from '@chakra-ui/react'
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

export const GettingStartedPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['CurrentUser'],
    queryFn: () => getCurrentUser(),
  })

  return (
    <OnboardingPage isLoading={isLoading}>
      <Container py="40" maxW={['full', null, '480px']}>
        <Steps variant="dots" flexDirection="column-reverse">
          <StepsItem title="Create organization">
            <CreateOrganizationStep />
          </StepsItem>
          <StepsItem title="Invite team members">
            <InviteTeamMembersStep />
          </StepsItem>
          <StepsCompleted>
            <OnboardingCompleted />
          </StepsCompleted>
        </Steps>
      </Container>
    </OnboardingPage>
  )
}

const OnboardingCompleted = () => {
  const router = useRouter()
  const workspace = useSessionStorageValue('getting-started.workspace')

  React.useEffect(() => {
    router.push(`/${workspace}`)
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
