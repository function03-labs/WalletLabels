import * as React from 'react'

import { Container } from '@chakra-ui/react'

import { useRouter } from 'next/router'

import { Stepper, StepperCompleted, StepperStep } from '@saas-ui/react'
import {
  OnboardingPage,
  InviteTeamMembersStep,
  CreateOrganizationStep,
} from '../components/onboarding'
import { getCurrentUser } from '@api/client'
import { useQuery } from '@tanstack/react-query'

export const GettingStartedPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['CurrentUser'],
    queryFn: () => getCurrentUser(),
  })

  return (
    <OnboardingPage isLoading={isLoading}>
      <Container py="40" maxW={['full', null, '480px']}>
        <Stepper variant="dots" flexDirection="column-reverse">
          <StepperStep title="Create organization">
            <CreateOrganizationStep />
          </StepperStep>
          <StepperStep title="Invite team members">
            <InviteTeamMembersStep />
          </StepperStep>
          <StepperCompleted>
            <OnboardingCompleted />
          </StepperCompleted>
        </Stepper>
      </Container>
    </OnboardingPage>
  )
}

const OnboardingCompleted = () => {
  const router = useRouter()
  React.useEffect(() => {
    router.push(`/app/${router.query.tenant}`)
  }, [])
  return null
}
