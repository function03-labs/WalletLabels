import { useControllableState } from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { createContext, PropGetterV2 } from '@chakra-ui/react-utils'
import { useSteps } from '@saas-ui/react'
import * as React from 'react'

export interface TourStep {
  id: string
  element: React.ReactElement
}

export interface TourOptions {
  /**
   * The initial step index.
   */
  initialStep?: number
  /**
   * Activate the tour by default.
   */
  defaultIsActive?: boolean
  /**
   * Make the tour controlled.
   */
  isActive?: boolean
  /**
   * Called when the last step is completed.
   */
  onComplete?(): void
  /**
   * Called when the current step is closed or dismissed.
   * @param index The current index
   */
  onDismiss?(index: number): void
}

export interface UseTourProps extends TourOptions {
  steps: TourStep[]
}

export const useTour = (props: UseTourProps) => {
  const {
    steps,
    initialStep,
    isActive: isActiveProp,
    defaultIsActive,
    onComplete,
    onDismiss,
  } = props
  const [isActive, setActive] = useControllableState<boolean>({
    defaultValue: defaultIsActive,
    value: isActiveProp,
  })
  const {
    index,
    step,
    isLast,
    reset,
    setComplete,
    setUncomplete,
    completed,
    navigation,
  } = useSteps<TourStep>({
    steps,
    initialStep,
  })

  const [targetElement, setTarget] = React.useState<HTMLElement | null>(null)
  const targetRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    if (!step?.id) {
      return
    }
    const el = document.querySelector<HTMLElement>(step.id)
    targetRef.current = el
    setTarget(el)
  }, [steps, step])

  const start = React.useCallback(() => {
    setActive(true)
  }, [])

  const stop = React.useCallback(() => {
    setActive(false)
  }, [])

  const next = React.useCallback(() => {
    setComplete(index)

    if (isLast) {
      stop()
      onComplete?.()
    } else {
      navigation.next()
    }
  }, [setComplete, index, navigation, isLast])

  const prev = React.useCallback(() => {
    setUncomplete(index)
    navigation.prev()
  }, [setUncomplete, index, navigation])

  const dismiss = React.useCallback(() => {
    setActive(false)
    onDismiss?.(index)
  }, [onDismiss, index])

  const getStepProps = React.useCallback(() => {
    return {
      isOpen: isActive,
      onClose: dismiss,
    }
  }, [isActive, dismiss])

  const getNextProps: PropGetterV2<'button'> = React.useCallback(
    (props) => {
      return {
        ...props,
        onClick: callAllHandlers(props?.onClick, next),
      }
    },
    [next],
  )

  const getPrevProps: PropGetterV2<'button'> = React.useCallback(
    (props) => {
      return {
        ...props,
        onClick: callAllHandlers(props?.onClick, prev),
      }
    },
    [prev],
  )

  const getDismissProps: PropGetterV2<'button'> = React.useCallback(
    (props) => {
      return {
        ...props,
        onClick: callAllHandlers(props?.onClick, dismiss),
      }
    },
    [onDismiss, dismiss],
  )

  return {
    isActive,
    isCompleted: completed.length === steps.length,
    targetElement,
    targetRef,
    index,
    step,
    start,
    stop,
    next,
    prev,
    reset,
    getStepProps,
    getNextProps,
    getPrevProps,
    getDismissProps,
  }
}

export type TourContextValue = ReturnType<typeof useTour>

export const [TourProvider, useTourContext] = createContext<TourContextValue>()
