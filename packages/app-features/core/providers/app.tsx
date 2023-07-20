import * as React from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { IconContext } from 'react-icons'

import { SaasProvider, useHotkeys } from '@saas-ui/react'
import { FeaturesProvider } from '@saas-ui-pro/feature-flags'

import { theme } from '@ui/theme'
import { ModalsProvider } from '@ui/lib'

import { I18nProvider } from '@app/i18n'
import { appHotkeys, segments } from '@app/config'

import { queryClient } from '../lib/react-query'
import { Hotkeys } from '../components/hotkeys'
import { AuthProvider } from './auth'

export interface AppProviderProps {
  linkComponent?: React.ElementType<any>
  onError?: (error: Error, info: any) => void
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { linkComponent, onError, children } = props

  const [showDevtools, setShowDevtools] = React.useState(false)

  /**
   * Toggle React Query devtools
   */
  useHotkeys('ctrl+shift+d', () => {
    setShowDevtools((prev) => !prev)
  })

  return (
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ className: 'react-icon', size: '1.1em' }}>
        <SaasProvider
          linkComponent={linkComponent}
          onError={onError}
          theme={theme}
        >
          <AuthProvider>
            <FeaturesProvider value={segments}>
              <I18nProvider>
                <Hotkeys hotkeys={appHotkeys}>
                  <ModalsProvider>{children}</ModalsProvider>
                </Hotkeys>
              </I18nProvider>
            </FeaturesProvider>
          </AuthProvider>
        </SaasProvider>
      </IconContext.Provider>
      {showDevtools && <ReactQueryDevtools position="bottom-right" />}
    </QueryClientProvider>
  )
}
