import * as React from 'react'
import { Portal } from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'
import { Button, ButtonProps } from '@saas-ui/react'
import { useTour, TourProvider, useTourContext, TourOptions } from './use-tour'

export interface TourProps extends TourOptions {
  children?: React.ReactNode
}

export const Tour: React.FC<TourProps> = (props) => {
  const { children } = props

  const _steps = React.Children.toArray(children).filter((child) => {
    return React.isValidElement(child) && child.props['data-target']
  }) as React.ReactElement[]

  const _children = React.Children.toArray(children).filter((child) => {
    return React.isValidElement(child) && !child.props['data-target']
  }) as React.ReactElement[]

  const steps = React.Children.map(_steps, (child) => {
    return {
      id: child.props['data-target'],
      element: child,
    }
  })

  const ctx = useTour({ steps, ...props })

  const { step, getStepProps } = ctx

  const currentStep =
    step?.element && React.cloneElement(step?.element, getStepProps())

  return (
    <TourProvider value={ctx}>
      <Portal>{currentStep}</Portal>
      {_children}
    </TourProvider>
  )
}

export const TourNextButton: React.FC<ButtonProps> = (props) => {
  const { getNextProps } = useTourContext()

  return (
    <Button
      variant="solid"
      colorScheme="primary"
      label="Next"
      {...getNextProps(props)}
    />
  )
}

if (__DEV__) {
  TourNextButton.displayName = 'TourNextButton'
}

export const TourPrevButton: React.FC<ButtonProps> = (props) => {
  const { getPrevProps } = useTourContext()

  return <Button label="Back" {...getPrevProps(props)} />
}

if (__DEV__) {
  TourPrevButton.displayName = 'TourPrevButton'
}

export const TourDismissButton: React.FC<ButtonProps> = (props) => {
  const { getDismissProps } = useTourContext()

  return <Button label="Dismiss" {...getDismissProps(props)} />
}

if (__DEV__) {
  TourDismissButton.displayName = 'TourDismissButton'
}
