import Script from 'next/script'

export const LemonSqueezyScript = () => {
  return (
    <Script
      id="lemon-js"
      strategy="afterInteractive"
      src="https://app.lemonsqueezy.com/js/lemon.js"
      onLoad={() => {
        /* @ts-ignore */
        window.createLemonSqueezy?.()
      }}
    />
  )
}
