import * as React from 'react'

import { createContext } from '@chakra-ui/react-utils'
import { useLocalStorage } from '@saas-ui/react'

type Tenant = string

export interface Tenancy {
  setTenant: (tenant: Tenant) => Tenant
}

export interface TenancyContextValue {
  tenant?: Tenant
  setTenant: (tenant: Tenant) => void
}

export const [TenancyContextProvider, useTenancy] =
  createContext<TenancyContextValue>({
    name: 'TenancyProvider',
  })

interface TenancyProviderProps {
  tenant?: Tenant
  onChange?: (tenant: string) => void
  localStorageKey?: string
  children: React.ReactNode
}

export function TenancyProvider(props: TenancyProviderProps) {
  const {
    children,
    tenant,
    onChange,
    localStorageKey = 'saas-ui.tenant',
  } = props

  const [_tenant, setTenant] = useLocalStorage(localStorageKey, tenant)

  React.useEffect(() => {
    if (tenant && tenant !== _tenant) {
      setTenant(tenant)
    }
  }, [tenant])

  const context = React.useMemo(
    () => ({
      tenant: _tenant,
      setTenant: (tenant: Tenant) => {
        setTenant(tenant)
        onChange?.(tenant)
      },
    }),
    [tenant],
  )

  return (
    <TenancyContextProvider value={context}>{children}</TenancyContextProvider>
  )
}

export const useTenant = () => {
  const context = useTenancy()
  return context.tenant
}
