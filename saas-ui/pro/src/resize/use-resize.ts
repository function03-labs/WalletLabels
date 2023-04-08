import * as React from 'react'

import {
  useEventListener,
  ResponsiveValue,
  HTMLChakraProps,
} from '@chakra-ui/react'
import { createContext } from '@chakra-ui/react-utils'
import { dataAttr } from '@chakra-ui/utils'

export type Dimensions = {
  width: number
  height?: number
}

type Limits = {
  minWidth: number
  maxWidth?: number
}

export type ResizeHandler = (size: Dimensions) => void

export interface ResizeOptions {
  /**
   * The default width.
   * @default 280
   */
  defaultWidth?: number
  /**
   * Callback called when resizing is finished.
   */
  onResize?: ResizeHandler
  /**
   * Callback called when the handle is clicked.
   */
  onHandleClick?: React.MouseEventHandler
  /**
   * Indicate if resizing is enabled.
   * @default true
   */
  isResizable?: boolean
  /**
   * The handle position.
   * @default 'right'
   */
  handlePosition?: 'right' | 'left'
}

export interface UseResizeProps extends ResizeOptions {}

export type UseResizeReturn = ReturnType<typeof useResize>

export interface ResizeProviderContext extends UseResizeReturn {
  isResizable: ResponsiveValue<boolean>
  handlePosition: UseResizeProps['handlePosition']
}

export const [ResizeProvider, useResizeContext] =
  createContext<ResizeProviderContext>({
    strict: false,
  })

/**
 * Hook used to create horizonally resizable elements.
 *
 * Automatically detects min/max width from css properties.
 */
export const useResize = (props: UseResizeProps = {}) => {
  const {
    defaultWidth = 280,
    onResize,
    onHandleClick,
    isResizable = true,
    handlePosition = 'right',
  } = props
  const containerRef = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<any>()
  const [isResizing, setIsResizing] = React.useState(false)
  const [width, setWidth] = React.useState(defaultWidth)

  const dimensionsRef = React.useRef<Dimensions>({ width })
  const limitsRef = React.useRef<Limits>({ minWidth: 0, maxWidth: undefined })

  const stopResizing = React.useCallback(() => {
    setIsResizing(false)
    onResize?.(dimensionsRef.current)
  }, [])

  const resize = React.useCallback(
    (event: MouseEvent) => {
      if (!isResizing || !containerRef.current) {
        return
      }

      const r = containerRef.current.getBoundingClientRect()
      const { minWidth, maxWidth } = limitsRef.current

      let w
      if (handlePosition === 'right') {
        w = event.clientX - (r?.left || 0)
      } else {
        w = r.right - event.clientX
      }

      if (w < r.width && minWidth) {
        w = Math.max(w, minWidth)
      } else if (w > r.width && maxWidth) {
        w = Math.min(w, maxWidth)
      }
      setWidth(w)

      dimensionsRef.current = { width: r.width, height: r.height }
    },
    [isResizing],
  )

  React.useEffect(() => {
    if (!containerRef.current || typeof getComputedStyle === 'undefined') {
      return
    }
    const styles = getComputedStyle(containerRef.current)
    limitsRef.current = {
      minWidth: parseInt(styles.getPropertyValue('min-width')),
      maxWidth: parseInt(styles.getPropertyValue('max-width')) || undefined,
    }
  }, [])

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize)
    }

    return () => {
      document.removeEventListener('mousemove', resize)
    }
  }, [isResizing])

  useEventListener('mouseup', stopResizing)

  const getContainerProps = React.useCallback(
    (props: HTMLChakraProps<'div'> = {}) => ({
      ref: containerRef,
      ...(isResizable
        ? {
            style: {
              width,
            } as React.CSSProperties,
          }
        : {}),
    }),
    [width, isResizable, containerRef],
  )

  const getHandleProps = React.useCallback(
    () => ({
      onMouseDown: () => {
        timeoutRef.current = setTimeout(() => setIsResizing(true), 100)
      },
      onMouseUp: (e: any) => {
        if (!isResizing) {
          clearTimeout(timeoutRef.current)
          setIsResizing(false)
          onHandleClick?.(e)
        }
      },
      'data-resizing': dataAttr(isResizing),
      [handlePosition]: '-5px',
    }),
    [handlePosition, isResizing],
  )

  return {
    getContainerProps,
    getHandleProps,
    width,
  }
}
