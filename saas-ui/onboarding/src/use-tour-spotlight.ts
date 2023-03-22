import { useSafeLayoutEffect, HTMLChakraProps } from '@chakra-ui/react'
import { callAllHandlers, __DEV__ } from '@chakra-ui/utils'
import { PropGetterV2 } from '@chakra-ui/react-utils'
import * as React from 'react'
import { useTourContext } from './use-tour'

export interface TourSpotlightOptions {
  motionPreset?: 'fade' | 'none'
  closeOnClick?: boolean
  hideOverlay?: boolean
  spacing?: number
}

export interface TourSpotlightProps
  extends TourSpotlightOptions,
    HTMLChakraProps<'div'> {}

export function useTourSpotlight() {
  const [dimensions, setDimensions] = React.useState<DOMRect | null>(null)
  const { isActive, stop, targetElement } = useTourContext()

  const rafId = React.useRef<number>()

  useSafeLayoutEffect(() => {
    if (!isActive) return undefined

    function measure() {
      rafId.current = requestAnimationFrame(() => {
        const rect = targetElement?.getBoundingClientRect() || null
        setDimensions(rect)
      })
    }

    measure()

    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure)

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)

      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [targetElement, isActive])

  const getSpotlightProps: PropGetterV2<'div', TourSpotlightProps> =
    React.useCallback(
      (props = {}) => {
        const {
          spacing = 4,
          closeOnClick = false,
          hideOverlay,
          onClick,
          sx,
        } = props
        if (isActive) {
          const scrollTop =
            document.scrollingElement?.scrollTop ||
            document.documentElement.scrollTop ||
            0
          const scrollLeft =
            document.scrollingElement?.scrollLeft ||
            document.documentElement.scrollLeft ||
            0

          return {
            animate: 'enter',
            sx: {
              width: dimensions ? dimensions.width + spacing * 2 + 'px' : '0',
              height: dimensions ? dimensions.height + spacing * 2 + 'px' : '0',
              top: dimensions
                ? dimensions.top + scrollTop - spacing + 'px'
                : '-10px',
              left: dimensions
                ? dimensions.left + scrollLeft - spacing + 'px'
                : '50%',
              boxShadow: !hideOverlay
                ? '0 0 0 9999px rgba(0, 0, 0, 0.2)'
                : 'none',
              pointerEvents: closeOnClick ? 'auto' : 'none',
              ...sx,
            },
            onClick: callAllHandlers(onClick, () => {
              // closeOnClick && stop()
            }),
          }
        }
        return {
          animate: 'exit',
          sx,
        }
      },
      [isActive, dimensions, stop],
    )

  return {
    isActive,
    getSpotlightProps,
  }
}
