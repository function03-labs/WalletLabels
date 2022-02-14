import type { AppProps } from 'next/app'
import { Provider } from 'urql'
import { SaasProvider } from '@saas-ui/provider'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '/public/logo.svg'

const LinkWrapper = ({
  href,
  children,
  ...props
}: {
  href: string
  children: React.ReactNode
}) => (
  <Link href={href} passHref {...props}>
    {children}
  </Link>
)

function App({ Component, pageProps }: AppProps) {
  const nextRouter = useRouter()

  return (
    <SaasProvider
      appName="Appulse"
      // logo={<Logo />}
      cookies={pageProps.cookies}
      linkComponent={LinkWrapper}
    >
      <Component />
    </SaasProvider>
  )
}

export default App
