import { PaddleScript } from '@saas-ui/paddle/next'

export const Paddle = () => {
  if (!process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID) {
    return null
  }

  const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'production'

  return (
    <PaddleScript
      vendor={process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID}
      environment={environment}
    />
  )
}
