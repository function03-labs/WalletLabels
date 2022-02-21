import * as React from 'react'

import { Tour, Step } from '@saas-ui/pro'
import { useLocalStorage } from '@saas-ui/react'
import { ErrorBoundary } from '@saas-ui/app'

/**
 * @todo move this to a TourManager context provider
 */
export const IntroTour = () => {
  const [runTour, setRunTour] = useLocalStorage('saas-ui.intro-tour', true)

  const steps: Step[] = [
    {
      target: '.tenant-menu',
      title: 'Welcome to Saas UI!',
      content: 'Press next to start a quick introduction.',
      disableBeacon: true,
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
    // setRunTour(false)
  }

  return (
    <ErrorBoundary errorComponent={() => null}>
      <Tour
        continuous
        steps={steps}
        run={runTour}
        disableOverlay
        onComplete={onTourComplete}
      />
    </ErrorBoundary>
  )
}
