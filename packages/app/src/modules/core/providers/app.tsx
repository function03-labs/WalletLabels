import { QueryClient, QueryClientProvider } from 'react-query'

import {
  SaasProvider,
  AuthProvider,
  AuthProviderProps,
  ModalsProvider,
} from '@saas-ui/react'

import { TenancyProvider, Tenant } from '@saas-ui/pro'

import { theme } from '@ui/theme'
import AppLayout from '@modules/core/layouts/app-layout'

const queryClient = new QueryClient()

export interface AppProviderProps {
  linkComponent?: React.ReactNode
  authService?: AuthProviderProps
  tenant?: Tenant | null
  onTenantChange?: (key: string) => void
  cookies?: any
  onError?: (error: Error, info: any) => void
  isPublic?: boolean
  layout?: React.ReactNode
  sidebar?: React.ReactNode
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
          <TenancyProvider tenant={tenant} onChange={onTenantChange}>
            <ModalsProvider>
              <AppLayout isPublic={isPublic} layout={layout} sidebar={sidebar}>
                {children}
              </AppLayout>
            </ModalsProvider>
          </TenancyProvider>
        </AuthProvider>
      </SaasProvider>
    </QueryClientProvider>
  )
}
