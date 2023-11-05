import * as React from 'react'
import { IntlProvider } from 'react-intl'

export interface I18nProviderProps {
  locale?: string
  children: React.ReactNode
}

export const I18nProvider: React.FC<I18nProviderProps> = (props) => {
  const { children } = props

  let locale = props.locale ?? 'en'
  if (typeof navigator !== 'undefined' && navigator.language) {
    locale = navigator.language
  }

  return (
    <IntlProvider
      locale={locale}
      onError={(err) => {
        if (err.code === 'MISSING_TRANSLATION') {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Missing translation', err.message)
          }
          return
        }
        throw err
      }}
    >
      {children}
    </IntlProvider>
  )
}
