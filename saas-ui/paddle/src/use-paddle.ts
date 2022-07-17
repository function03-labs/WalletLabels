import * as React from 'react'

import { useScript } from '@saas-ui/pro'

export interface UsePaddleProps {
  onLoad?(): void
  onEvent?(e: any): void
}

export const usePaddle = (props: UsePaddleProps = {}) => {
  const { onLoad, onEvent } = props

  const status = useScript('https://cdn.paddle.com/paddle/paddle.js')

  const [paddle, setPaddle] = React.useState<any>(null)

  React.useEffect(() => {
    const Paddle = (window as any).Paddle
    if (typeof Paddle !== 'undefined') {
      setPaddle(Paddle)
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
