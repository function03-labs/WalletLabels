import * as React from 'react'

import { Tour } from '@saas-ui/pro'

/**
 * @todo move this to a TourManager context provider
 */
export const IntroTour = () => {
  const steps = [
    {
      target: '.tenant-menu',
      title: 'Switch workspaces',
      content: 'Saas UI Pro supports multiple workspaces.',
    },
    {
      target: '.appulse-tour-customers',
      title: 'Edit your profile',
      content: 'This is another awesome feature!',
    },
    {
      target: '.appulse-tour-users',
      title: 'Upgrade your account',
      content: 'This is another awesome feature!',
    },
  ]

  const runTour = true // get value from user profile
  const onTourComplete = () => {
    console.log('Tour complete')
    // update user profile
  }

  return (
    <Tour
      continuous
      steps={steps}
      run={runTour}
      showSkipButton
      disableOverlay
      onComplete={onTourComplete}
    />
  )
}
