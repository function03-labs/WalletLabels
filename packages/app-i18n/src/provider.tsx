import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { useAuth } from '@saas-ui/react'

export interface I18nProviderProps {
  children: React.ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = (props) => {
  const { children } = props
  const user = useAuth() // get configured language from user

  let locale = 'en'

  if (typeof navigator !== 'undefined' && navigator.language) {
    locale = navigator.language
  }

  return <IntlProvider locale={locale}>{children}</IntlProvider>
}
