import * as React from 'react'

import Joyride, {
  BeaconRenderProps,
  TooltipRenderProps,
  Props,
  Locale,
  Step,
  STATUS,
  LIFECYCLE,
} from 'react-joyride'

export type { Step }

import { Beacon } from './beacon'
import {
  TourDialog,
  TourDialogActions,
  TourDialogBody,
  TourDialogFooter,
  TourDialogProgress,
  TourDialogTrigger,
} from './tour-dialog'

const TourTooltip = React.forwardRef(
  (
    {
      tooltipProps,
      step,
      index,
      size,
      isLastStep,
      continuous,
      skipProps,
      backProps,
      primaryProps,
      closeProps,
      ...rest
    }: TooltipRenderProps,
    ref,
  ) => {
    const {
      content,
      hideBackButton,
      hideCloseButton,
      hideFooter,
      showProgress,
      showSkipButton,
      title,
    } = step

    const { progress, back, last, next, skip } = step.locale as TourLocale

    let secondaryAction = null
    if (index > 0 && !hideBackButton) {
      secondaryAction = {
        label: back,
        ...backProps,
      }
    } else if (showSkipButton) {
      secondaryAction = {
        label: skip,
        ...skipProps,
      }
    }

    const dialogProps = {
      title,
      placement: step.placement === 'center' ? 'bottom' : step.placement,
      hideCloseButton,
      isOpen: true,
      primaryAction: continuous
        ? {
            label: isLastStep ? last : next,
            ...primaryProps,
          }
        : null,
      secondaryAction,
      ...rest,
    }

    return (
      <TourDialog {...dialogProps}>
        <TourDialogTrigger>
          <span {...tooltipProps} />
        </TourDialogTrigger>
        <TourDialogBody>{content}</TourDialogBody>
        {!hideFooter && (
          <TourDialogFooter>
            {showProgress && <TourDialogProgress label={progress} />}

            <TourDialogActions />
          </TourDialogFooter>
        )}
      </TourDialog>
    )
  },
)

export interface TourLocale extends Locale {
  progress?: React.ReactNode
}

export interface TourProps extends Props {
  locale?: TourLocale
  onComplete?: () => void
}

const defaultLocale = {
  progress: 'Step :current of :total',
  back: 'Back',
  close: 'Close',
  last: 'Done',
  next: 'Next',
  open: 'Open the dialog',
  skip: 'Skip',
}

export function Tour({
  steps,
  locale,
  callback,
  onComplete,
  ...props
}: TourProps) {
  const _handleCallback = React.useCallback((data) => {
    if (callback) {
      callback(data)
    }
    if (
      onComplete &&
      [STATUS.FINISHED, STATUS.SKIPPED].includes(data.status) &&
      data.lifecycle === LIFECYCLE.COMPLETE
    ) {
      onComplete()
    }
  }, [])

  return (
    <Joyride
      steps={steps}
      locale={Object.assign({}, defaultLocale, locale || {})}
      beaconComponent={
        Beacon as unknown as React.ElementType<BeaconRenderProps>
      }
      tooltipComponent={TourTooltip}
      showProgress
      floaterProps={{ hideArrow: true }}
      callback={_handleCallback}
      {...props}
    />
  )
}
