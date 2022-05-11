import * as React from 'react'

import { useScript } from '@saas-ui/pro'

export const usePaddle = () => {
  const status = useScript('https://cdn.paddle.com/paddle/paddle.js')

  const [paddle, setPaddle] = React.useState<any>(null)

  React.useEffect(() => {
    if (typeof Paddle !== 'undefined') {
      setPaddle(Paddle)
    }
  }, [status])

  return paddle
}
