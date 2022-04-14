import * as React from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'

import {
  SaasProvider,
  AuthProvider,
  AuthProviderProps,
  ModalsProvider,
  useAuth,
  Form,
} from '@saas-ui/react'
import { yupResolver, yupFieldResolver } from '@saas-ui/forms/yup'
import { AnyObjectSchema } from 'yup'

import { TenancyProvider, Tenant } from '@saas-ui/pro'

import { GraphqlMocksProvider } from '@app/graphql'

import { I18nProvider } from '@app/i18n'

import { theme } from '@ui/theme'
import AppLayout from '@modules/core/layouts/app-layout'

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
  isPublic?: boolean
  layout?: React.ReactNode
  sidebar?: React.ReactNode
}

const GqlProvider: React.FC = (props) => {
  const { user } = useAuth()

  const getUser = React.useCallback(async () => {
    return user
  }, [user])

  return <GraphqlMocksProvider context={{ user: getUser }} {...props} />
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const {
    linkComponent,
    tenant,
    onTenantChange,
    cookies,
    onError,
    authService,
    isPublic,
    layout,
    sidebar,
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
          <GqlProvider>
            <I18nProvider>
              <TenancyProvider tenant={tenant} onChange={onTenantChange}>
                <ModalsProvider>
                  <AppLayout
                    isPublic={isPublic}
                    layout={layout}
                    sidebar={sidebar}
                  >
                    {children}
                  </AppLayout>
                </ModalsProvider>
              </TenancyProvider>
            </I18nProvider>
          </GqlProvider>
        </AuthProvider>
      </SaasProvider>
    </QueryClientProvider>
  )
}
