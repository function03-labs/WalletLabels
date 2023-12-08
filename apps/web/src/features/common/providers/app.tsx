'use client'

import * as React from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { IconContext } from 'react-icons'

import { ColorMode, localStorageManager } from '@chakra-ui/react'
import { SaasProvider, useHotkeys } from '@saas-ui/react'
import { FeaturesProvider } from '@saas-ui-pro/feature-flags'

import { theme } from '@ui/theme'
import { ModalsProvider } from '@ui/lib'

import { appHotkeys, segments } from '@app/config'

import { queryClient } from '../lib/react-query'
import { Hotkeys } from '../components/hotkeys'
import { AuthProvider } from './auth'
import { Link } from '@app/nextjs'
import { I18nProvider } from './i18n'
import { getCookie, setCookie } from 'cookies-next'

/**
 * We use a custom color mode manager to sync the color mode
 * value with the cookie value. This will prevent any flash
 * of color mode mismatch when the page loads.
 */
type StorageManager = typeof localStorageManager
const colorModeManager: StorageManager = {
  type: 'cookie',
  ssr: true,
  get: (initialColorMode?: ColorMode): ColorMode | undefined => {
    const storedColorMode = getCookie('chakra-ui-color-mode') as
      | ColorMode
      | undefined

    return storedColorMode ? storedColorMode : initialColorMode
  },
  set: (value: string) => {
    setCookie('chakra-ui-color-mode', value, {
      maxAge: 31536000,
      path: '/',
    })
  },
}

export interface AppProviderProps {
  onError?: (error: Error, info: any) => void
  initialColorMode?: ColorMode
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { onError, children } = props

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
          linkComponent={Link}
          onError={onError}
          theme={theme}
          colorModeManager={colorModeManager}
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
      {showDevtools && <ReactQueryDevtools position="right" />}
    </QueryClientProvider>
  )
}
