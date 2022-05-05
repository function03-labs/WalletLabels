import * as React from 'react'

import { useEventListener } from '@chakra-ui/hooks'

export type Dimensions = {
  width: number
  height?: number
}

type Limits = {
  minWidth: number
  maxWidth?: number
}

export type ResizeHandler = (size: Dimensions) => void

export interface UseResizeOptions {
  /**
   * The default width
   */
  defaultWidth?: number
  /**
   * Callback called when resizing is finished.
   */
  onResize?: ResizeHandler
  /**
   * Indicate if resizing is enabled.
   */
  isResizable?: boolean
}

/**
 * Hook used to create horizonally resizable elements.
 *
 * Automatically detects min/max width from css properties.
 */
export const useResize = (props: UseResizeOptions) => {
  const { defaultWidth = 280, onResize, isResizable } = props
  const containerRef = React.useRef<HTMLDivElement>(null)
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

      let w = event.clientX - (r?.left || 0)
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
    (props) => ({
      ref: containerRef,
      ...(isResizable
        ? {
            sx: {
              ...props.sx,
              position: 'relative',
            },
            style: { width },
          }
        : {}),
    }),
    [width, isResizable, containerRef],
  )

  const getHandleProps = React.useCallback(
    () => ({
      onMouseDown: () => setIsResizing(true),
    }),
    [],
  )

  return {
    getContainerProps,
    getHandleProps,
  }
}
