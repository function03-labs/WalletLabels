import * as React from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { IconContext } from 'react-icons'

import { SaasProvider, ModalsProvider, Form } from '@saas-ui/react'
import { AuthProvider, AuthProviderProps } from '@saas-ui/auth'

import { TenancyProvider, Tenant } from '@saas-ui-pro/react'
import { FeaturesProvider } from '@saas-ui-pro/feature-flags'

import { I18nProvider } from '@app/i18n'

import { theme } from '@ui/theme'

import { segments } from '@app/config'

import { queryClient } from '../lib/react-query'

export interface AppProviderProps {
  linkComponent?: React.ElementType<any>
  authService?: AuthProviderProps
  tenant?: Tenant | null
  onTenantChange?: (key: string) => void
  onError?: (error: Error, info: any) => void
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const {
    linkComponent,
    tenant,
    onTenantChange,
    onError,
    authService,
    children,
  } = props

  return (
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ className: 'react-icon', size: '1.1em' }}>
        <SaasProvider
          linkComponent={linkComponent}
          onError={onError}
          theme={theme}
        >
          <AuthProvider {...authService}>
            <FeaturesProvider value={segments}>
              <I18nProvider>
                <TenancyProvider tenant={tenant} onChange={onTenantChange}>
                  <ModalsProvider>{children}</ModalsProvider>
                </TenancyProvider>
              </I18nProvider>
            </FeaturesProvider>
          </AuthProvider>
        </SaasProvider>
      </IconContext.Provider>
    </QueryClientProvider>
  )
}
