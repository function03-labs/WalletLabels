import * as React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { IconContext } from 'react-icons'

import { SaasProvider, ModalsProvider, Form } from '@saas-ui/react'
import { AuthProvider, AuthProviderProps } from '@saas-ui/auth'

import { zodResolver, zodFieldResolver } from '@saas-ui/forms/zod'
import { ZodSchema } from 'zod'

import { TenancyProvider, Tenant } from '@saas-ui/pro'
import { FeaturesProvider } from '@saas-ui/features'

import { I18nProvider } from '@app/i18n'

import { theme } from '@ui/theme'

import features from '@app/config/feature-flags'

const queryClient = new QueryClient()

/**
 * Use the Zod resolver as default in all forms
 */
Form.getResolver = (schema: ZodSchema) => zodResolver(schema)
Form.getFieldResolver = (schema: ZodSchema) => zodFieldResolver(schema)

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
            <FeaturesProvider value={features}>
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
