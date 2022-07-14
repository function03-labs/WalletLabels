import * as React from 'react'

import { useScript } from '@saas-ui/pro'

declare global {
  interface Window {
    Paddle: any
  }
}

export interface UsePaddleProps {
  onLoad?(): void
  onEvent?(e: any): void
}

export const usePaddle = (props: UsePaddleProps = {}) => {
  const { onLoad, onEvent } = props

  const status = useScript('https://cdn.paddle.com/paddle/paddle.js')

  const [paddle, setPaddle] = React.useState<any>(null)

  React.useEffect(() => {
    if (typeof window.Paddle !== 'undefined') {
      setPaddle(window.Paddle)
    }
  }, [status])

  React.useEffect(() => {
    if (status === 'ready') {
      onLoad?.()
    }
  }, [status, onLoad])

  React.useEffect(() => {
    if (onEvent) {
      document.addEventListener('paddle-event', onEvent)
    }
    return () => {
      if (onEvent) {
        document.removeEventListener('paddle-event', onEvent)
      }
    }
  }, [onEvent])

  return paddle
}
