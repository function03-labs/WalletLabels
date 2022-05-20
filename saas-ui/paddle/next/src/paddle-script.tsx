import * as React from 'react'
import Script, { ScriptProps } from 'next/script'

export interface PaddleScriptProps extends ScriptProps {
  environment?: string
  vendor: string
}

declare global {
  const Paddle: any
}

export const PaddleScript: React.FC<PaddleScriptProps> = (props) => {
  const { environment, vendor, ...rest } = props

  const onEvent = React.useCallback((detail) => {
    const event = new CustomEvent('paddle-event', { detail })
    document.dispatchEvent(event)
  }, [])

  return (
    <>
      <Script
        id="paddle-js"
        src="https://cdn.paddle.com/paddle/paddle.js"
        onLoad={() => {
          if (environment) {
            Paddle.Environment.set(environment)
          }

          Paddle.Setup({
            vendor: Number(vendor),
            eventCallback: onEvent,
          })
        }}
        {...rest}
      />
    </>
  )
}
