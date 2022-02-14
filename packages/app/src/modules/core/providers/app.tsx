import { QueryClient, QueryClientProvider } from 'react-query'

import { SaasProvider, AuthProvider, AuthProviderProps } from '@saas-ui/react'

import { TenancyProvider } from '@saas-ui/pro'

import { authService } from '@app/config'
import { theme } from '@ui/theme'
import AppLayout from '@modules/core/layouts/app-layout'

const queryClient = new QueryClient()

export interface AppProviderProps {
  linkComponent?: React.ReactNode
  authService?: AuthProviderProps
  tenant?: string
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
            <AppLayout isPublic={isPublic} layout={layout} sidebar={sidebar}>
              {children}
            </AppLayout>
          </TenancyProvider>
        </AuthProvider>
      </SaasProvider>
    </QueryClientProvider>
  )
}
