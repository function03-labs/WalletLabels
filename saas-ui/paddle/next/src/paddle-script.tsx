import * as React from 'react'
import Script, { ScriptProps } from 'next/script'

export interface PaddleScriptProps extends ScriptProps {
  environment?: string
  vendor: string
}

export const PaddleScript: React.FC<PaddleScriptProps> = (props) => {
  const { environment, vendor, ...rest } = props

  const onEvent = React.useCallback((detail: any) => {
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
            ;(window as any).Paddle.Environment.set(environment)
          }

          ;(window as any).Paddle.Setup({
            vendor: Number(vendor),
            eventCallback: onEvent,
          })
        }}
        {...rest}
      />
    </>
  )
}
