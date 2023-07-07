import * as React from 'react'

import { createContext } from '@chakra-ui/react-utils'
import { useLocalStorage } from '@saas-ui/react'

export type Tenant = string

export interface Tenancy {
  setTenant: (tenant: Tenant) => Tenant
}

export interface TenancyContextValue {
  tenant?: Tenant | null
  setTenant: (tenant: Tenant) => void
}

export const [TenancyContextProvider, useTenancy] =
  createContext<TenancyContextValue>({
    name: 'TenancyProvider',
  })

interface TenancyProviderProps {
  tenant?: Tenant | null
  onChange?: (tenant: string) => void
  localStorageKey?: string
  children: React.ReactNode
}

/**
 * @deprecated Tenancy context will be removed in future releases.
 * Please use the `useWorkspace` hook instead.
 *
 * @see `packages/app-features/core/hooks/use-workspace.ts`
 */
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
    [tenant, onChange],
  )

  return (
    <TenancyContextProvider value={context}>{children}</TenancyContextProvider>
  )
}

/**
 * @deprecated Tenancy context will be removed in future releases.
 * Please use the `useWorkspace` hook instead.
 *
 * @see `packages/app-features/core/hooks/use-workspace.ts`
 */
export const useTenant = () => {
  const context = useTenancy()
  return context.tenant
}
