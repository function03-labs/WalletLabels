import * as React from 'react'

import { ErrorBoundary } from '@saas-ui/pro'
import {
  Tour,
  TourDialog,
  TourDialogBody,
  TourDialogFooter,
  TourDialogActions,
  BenefitsModal,
  BenefitsModalHeader,
  BenefitsModalMedia,
  BenefitsModalBody,
  BenefitsModalFooter,
  TourNextButton,
  TourDismissButton,
  TourDialogHeader,
  TourSpotlight,
} from '@saas-ui/onboarding'

import { useLocalStorage } from '@saas-ui/react'
import { ButtonGroup, Text } from '@chakra-ui/react'

/**
 * @todo move this to a TourManager context provider
 */
export const IntroTour = () => {
  const [tour, setTour] = useLocalStorage('saas-ui.intro-tour', false)

  const steps = [
    {
      target: '.tenant-menu',
      title: 'Switch workspaces',
      content: 'Saas UI Pro supports multiple workspaces.',
      disableBeacon: true,
      primaryAction: 'Next',
    },
    {
      target: '.pre-order',
      title: 'Share the love ❤️',
      content: 'Pre-order now and get 50% discount.',
      primaryAction: 'Complete',
    },
  ]

  const onDismiss = (index: number) => {
    console.log(index)
  }

  const onTourComplete = () => {
    setTour(true)
  }

  return (
    <ErrorBoundary>
      <Tour
        defaultIsActive={!tour}
        onDismiss={onDismiss}
        onComplete={onTourComplete}
      >
        <BenefitsModal data-target="modal" hideOverlay>
          <BenefitsModalMedia
            src="/onboarding/undraw_building_blocks_re_5ahy.svg"
            mx="16"
            my="8"
          />
          <BenefitsModalHeader textAlign="center">
            Welcome to Saas UI
          </BenefitsModalHeader>
          <BenefitsModalBody textAlign="center">
            Benefits modals can be used to highlight new features and their
            benefits in your app. Embed illustrations or videos to make ideas
            more accessible.
          </BenefitsModalBody>
          <BenefitsModalFooter justifyContent="center">
            <ButtonGroup>
              <TourDismissButton />
              <TourNextButton>Start</TourNextButton>
            </ButtonGroup>
          </BenefitsModalFooter>
        </BenefitsModal>
        {steps.map((step, i) => (
          <TourDialog key={i} data-target={step.target}>
            <TourDialogHeader>{step.title}</TourDialogHeader>
            <TourDialogBody>{step.content}</TourDialogBody>
            <TourDialogFooter>
              <Text>
                Step {i + 2} of {steps.length + 1}
              </Text>
              <TourDialogActions>
                <TourDismissButton />
                <TourNextButton
                  label={step.primaryAction}
                  variant="subtle"
                  colorScheme="white"
                />
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
        ))}
        <TourSpotlight />
      </Tour>
    </ErrorBoundary>
  )
}
