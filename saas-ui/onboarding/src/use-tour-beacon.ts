import {
  useDisclosure,
  useId,
  popperCSSVars,
  usePopper,
  UsePopperProps,
} from '@chakra-ui/react'
import { PropGetter } from '@chakra-ui/react-utils'
import * as React from 'react'
import { useTourContext } from './use-tour'

export interface UseTourBeaconProps
  extends Pick<
    UsePopperProps,
    | 'modifiers'
    | 'gutter'
    | 'offset'
    | 'arrowPadding'
    | 'direction'
    | 'placement'
  > {
  /**
   * Callback to run when the tooltip shows
   */
  onOpen?(): void
  /**
   * Callback to run when the tooltip hides
   */
  onClose?(): void
  /**
   * Custom `id` to use in place of `uuid`
   */
  id?: string
  /**
   * If `true`, the tooltip will be shown (in controlled mode)
   */
  isOpen?: boolean
  /**
   * If `true`, the tooltip will be initially shown
   */
  defaultIsOpen?: boolean
  isDisabled?: boolean
}

export function useTourBeacon(props: UseTourBeaconProps = {}) {
  const {
    onOpen: onOpenProp,
    onClose: onCloseProp,
    placement = 'right-start',
    id,
    isOpen: isOpenProp,
    defaultIsOpen,
    modifiers,
    isDisabled,
    gutter,
    offset = [-4, -4],
    direction,
    ...htmlProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  })

  const { referenceRef, getPopperProps } = usePopper({
    enabled: isOpen,
    placement,
    modifiers,
    gutter,
    offset,
    direction,
  })

  const { start } = useTourContext()

  const tooltipId = useId(id, 'tooltip')

  const { targetElement, isActive, isCompleted } = useTourContext()

  React.useEffect(() => {
    if (typeof referenceRef === 'function') {
      referenceRef?.(targetElement)
    }
  }, [targetElement])

  React.useEffect(() => {
    targetElement && !isActive && !isCompleted ? onOpen() : onClose()
  }, [targetElement, isActive])

  const onClick = React.useCallback(() => {
    start()
  }, [start])

  const getTourBeaconPositionerProps: PropGetter = React.useCallback(
    (props = {}, forwardedRef = null) =>
      getPopperProps(
        {
          ...props,
          style: {
            ...props.style,
          },
        },
        forwardedRef,
      ),
    [getPopperProps],
  )

  const getTourBeaconProps = React.useCallback(
    (props: any = {}, ref: React.Ref<any> = null) => {
      const tooltipProps = {
        ref,
        ...htmlProps,
        ...props,
        id: tooltipId,
        role: 'tooltip',
        onClick,
        style: {
          ...props.style,
          position: 'relative',
          transformOrigin: popperCSSVars.transformOrigin.varRef,
        },
      }

      return tooltipProps
    },
    [htmlProps, tooltipId, onClick],
  )

  return {
    isOpen,
    getTourBeaconProps,
    getTourBeaconPositionerProps,
  }
}

export type UseTourBeaconReturn = ReturnType<typeof useTourBeacon>
