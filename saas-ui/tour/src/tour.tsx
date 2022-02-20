import * as React from 'react'
import type { ForwardedRef } from 'react'

import {
  chakra,
  Text,
  ButtonGroup,
  Button,
  Placement,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  keyframes,
} from '@chakra-ui/react'

import Joyride, {
  BeaconRenderProps,
  TooltipRenderProps,
  Props,
  Locale,
  STATUS,
  LIFECYCLE,
} from 'react-joyride'

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  55% {
    transform: scale(1.6);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

const { useCallback, forwardRef } = React

const TourBeacon = forwardRef(
  ({ ...props }: BeaconRenderProps, ref: ForwardedRef<any>) => {
    return (
      <chakra.div
        bg="green.400"
        borderRadius="50%"
        h="4"
        w="4"
        _before={{
          content: '""',
          d: 'block',
          w: '4',
          h: '4',
          animation: `${pulse} 1s ease-in-out infinite`,
          boxShadow: '0 0 2px 2px',
          color: 'green.400',
          borderRadius: '50%',
        }}
        ref={ref}
        {...props}
      />
    )
  },
)

function renderProgress(
  progress: React.ReactNode,
  current: number,
  total: number,
) {
  if (typeof progress === 'string') {
    return progress
      .replace(':current', String(current))
      .replace(':total', String(total))
  }

  return progress
}

const TourTooltip = forwardRef(
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

    const { progress, back, close, last, next, skip } =
      step.locale as TourLocale

    let footer
    if (!hideFooter) {
      footer = (
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {showProgress && (
            <Text>{renderProgress(progress, index + 1, size)}</Text>
          )}
          <ButtonGroup size="sm">
            {showSkipButton && (
              <Button {...skipProps} variant="ghost">
                {skip}
              </Button>
            )}
            {index > 0 && !hideBackButton && (
              <Button {...backProps} variant="ghost">
                {back}
              </Button>
            )}
            {continuous && (
              <Button {...primaryProps} variant="subtle">
                {isLastStep ? last : next}
              </Button>
            )}
          </ButtonGroup>
        </PopoverFooter>
      )
    }

    return (
      <div {...tooltipProps}>
        <Popover isOpen placement={step.placement as Placement}>
          {/* this makes sure the arrow is rendered correctly */}
          <PopoverTrigger>
            <span />
          </PopoverTrigger>
          <PopoverContent
            position="relative"
            bg="primary.500"
            fontSize="md"
            color="white"
          >
            <PopoverArrow bg="primary.500" />
            {title && !hideCloseButton && (
              <PopoverCloseButton {...closeProps} />
            )}
            {title && (
              <PopoverHeader fontWeight="bold" border="0">
                {step.title}
              </PopoverHeader>
            )}
            <PopoverBody>{content}</PopoverBody>
            {footer}
          </PopoverContent>
        </Popover>
      </div>
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
  const _handleCallback = useCallback((data) => {
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
      beaconComponent={TourBeacon as React.ElementType<BeaconRenderProps>}
      tooltipComponent={TourTooltip}
      showProgress
      floaterProps={{ hideArrow: true }}
      callback={_handleCallback}
      {...props}
    />
  )
}
