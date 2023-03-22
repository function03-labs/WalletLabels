import * as React from 'react'
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useTheme,
  VisuallyHidden,
  Portal,
  PortalProps,
} from '@chakra-ui/react'
import { omit, pick } from '@chakra-ui/utils'
import { AnimatePresence, motion, Variants } from 'framer-motion'

import { Beacon } from './beacon'
import { useTourBeacon, UseTourBeaconProps } from './use-tour-beacon'

export const scale: Variants = {
  exit: {
    scale: 0.1,
    opacity: 0,
    transition: {
      opacity: { duration: 0.15, easings: 'easeInOut' },
      scale: { duration: 0.2, easings: 'easeInOut' },
    },
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: { easings: 'easeOut', duration: 0.2 },
      scale: { duration: 0.2, ease: [0.175, 0.885, 0.4, 1.1] },
    },
  },
}

export interface TourBeaconProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'TourBeacon'>,
    UseTourBeaconProps {
  /**
   * The accessible, human friendly label to use for
   * screen readers.
   */
  'aria-label'?: string
  /**
   * Props to be forwarded to the portal component
   */
  portalProps?: Pick<PortalProps, 'appendToParentPortal' | 'containerRef'>
}

/**
 * TourBeacons highlights new features and allows users to start or continue a paused tour.
 *
 * @see Docs     https://saas-ui.com/docs
 */
export const TourBeacon = forwardRef<TourBeaconProps, 'div'>((props, ref) => {
  const ownProps = omitThemingProps(props)
  const theme = useTheme()

  const { children, 'aria-label': ariaLabel, portalProps, ...rest } = ownProps

  const beacon = useTourBeacon({ ...rest, direction: theme.direction })

  const hasAriaLabel = !!ariaLabel

  const _beaconProps = beacon.getTourBeaconProps({}, ref)

  const beaconProps = hasAriaLabel
    ? omit(_beaconProps, ['role', 'id'])
    : _beaconProps

  const hiddenProps = pick(_beaconProps, ['role', 'id'])

  return (
    <>
      <AnimatePresence>
        {beacon.isOpen && (
          <Portal {...portalProps}>
            <chakra.div
              {...beacon.getTourBeaconPositionerProps()}
              __css={{
                zIndex: 'tooltip',
              }}
            >
              <Beacon
                as={motion.div}
                variants={scale}
                {...(beaconProps as any)}
                initial="exit"
                animate="enter"
                exit="exit"
              >
                {hasAriaLabel && (
                  <VisuallyHidden {...hiddenProps}>{ariaLabel}</VisuallyHidden>
                )}
              </Beacon>
            </chakra.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
})

TourBeacon.displayName = 'TourBeacon'
