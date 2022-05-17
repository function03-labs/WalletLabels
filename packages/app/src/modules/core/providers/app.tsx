import * as React from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'

import {
  SaasProvider,
  AuthProvider,
  AuthProviderProps,
  ModalsProvider,
  Form,
} from '@saas-ui/react'
import { yupResolver, yupFieldResolver } from '@saas-ui/forms/yup'
import { AnyObjectSchema } from 'yup'

import { TenancyProvider, Tenant } from '@saas-ui/pro'

import { I18nProvider } from '@app/i18n'

import { theme } from '@ui/theme'

const queryClient = new QueryClient()

/**
 * Use the Yup resolver as default in all forms
 */
Form.getResolver = (schema: AnyObjectSchema) => yupResolver(schema)
Form.getFieldResolver = (schema: AnyObjectSchema) => yupFieldResolver(schema)

export interface AppProviderProps {
  linkComponent?: React.ElementType<any>
  authService?: AuthProviderProps
  tenant?: Tenant | null
  onTenantChange?: (key: string) => void
  cookies?: any
  onError?: (error: Error, info: any) => void
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const {
    linkComponent,
    tenant,
    onTenantChange,
    cookies,
    onError,
    authService,
    children,
  } = props
  return (
    <QueryClientProvider client={queryClient}>
      <SaasProvider
        cookies={cookies}
        linkComponent={linkComponent}
        onError={onError}
        theme={theme}
      >
        <AuthProvider {...authService}>
          <I18nProvider>
            <TenancyProvider tenant={tenant} onChange={onTenantChange}>
              <ModalsProvider>{children}</ModalsProvider>
            </TenancyProvider>
          </I18nProvider>
        </AuthProvider>
      </SaasProvider>
    </QueryClientProvider>
  )
}
