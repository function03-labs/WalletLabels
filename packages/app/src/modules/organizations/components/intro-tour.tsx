import * as React from 'react'

import { ErrorBoundary } from '@saas-ui/pro'
import { Tour, Step } from '@saas-ui/onboarding'

import { useLocalStorage } from '@saas-ui/react'

/**
 * @todo move this to a TourManager context provider
 */
export const IntroTour = () => {
  const [tour, setTour] = useLocalStorage('saas-ui.intro-tour', false)

  const steps: Step[] = [
    {
      target: '.tenant-menu',
      title: 'Welcome to Saas UI!',
      content: 'Press next to start a quick introduction.',
      disableBeacon: true,
      disableOverlay: true,
      showSkipButton: true,
      placement: 'center',
    },
    {
      target: '.tenant-menu',
      title: 'Switch workspaces',
      content: 'Saas UI Pro supports multiple workspaces.',
      disableBeacon: true,
    },
    {
      target: '.pre-order',
      title: 'Share the love ❤️',
      content: 'Pre-order now and get 50% discount.',
    },
  ]

  const onTourComplete = () => {
    setTour(true)
  }

  return (
    <ErrorBoundary>
      <Tour continuous steps={steps} run={!tour} onComplete={onTourComplete} />
    </ErrorBoundary>
  )
}
