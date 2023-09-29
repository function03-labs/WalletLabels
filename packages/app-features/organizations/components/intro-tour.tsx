import * as React from 'react'

import {
  Tour,
  TourDialog,
  TourDialogBody,
  TourDialogFooter,
  TourDialogActions,
  BenefitsModal,
  BenefitsModalHeader,
  BenefitsModalBody,
  BenefitsModalFooter,
  TourNextButton,
  TourDismissButton,
  TourDialogHeader,
  TourSpotlight,
} from '@saas-ui-pro/onboarding'

import { useLocalStorage, ErrorBoundary } from '@saas-ui/react'
import { ButtonGroup, Text, useBreakpointValue } from '@chakra-ui/react'
import { SaasUIGlyph } from '@ui/lib/src/logo/saas-ui-glyph'

/**
 * @todo move this to a TourManager context provider
 */
export const IntroTour = () => {
  const [tour, setTour] = useLocalStorage('saas-ui.intro-tour', false)

  const steps = [
    {
      target: useBreakpointValue({
        base: '.sui-sidebar__toggle-button',
        lg: '.tenant-menu',
      }),
      title: 'Switch workspaces',
      content: 'Saas UI Pro supports multiple workspaces.',
      disableBeacon: true,
      primaryAction: 'Next',
    },
    {
      target: '.pre-order',
      title: 'Share the love ❤️',
      content: 'Pre-order Saas UI Pro now.',
      primaryAction: 'Complete',
    },
  ]

  const onDismiss = (index: number) => {
    setTour(true)
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
          <BenefitsModalHeader>
            <SaasUIGlyph boxSize="8" mb="4" /> <Text>Welcome to Saas UI</Text>
          </BenefitsModalHeader>
          <BenefitsModalBody fontSize="md" color="muted">
            Benefits modals can be used to highlight new features and their
            benefits in your app. Embed illustrations or videos to make ideas
            more accessible.
          </BenefitsModalBody>
          <BenefitsModalFooter>
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
                <TourNextButton variant="subtle" colorScheme="white">
                  {step.primaryAction}
                </TourNextButton>
              </TourDialogActions>
            </TourDialogFooter>
          </TourDialog>
        ))}
        <TourSpotlight />
      </Tour>
    </ErrorBoundary>
  )
}
