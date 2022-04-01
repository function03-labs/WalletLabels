import * as React from 'react'

import { createContext } from '@chakra-ui/react-utils'

import { useMap } from '@react-hookz/web'

import { FilterItem } from './filter-menu'
import { Filter } from './use-active-filter'
import { defaultOperators, FilterOperators, FilterType } from './operators'

type ActiveFilter = Filter & { key: string }

interface FiltersContextValue {
  filters?: FilterItem[]
  operators?: FilterItem[]
  activeFilters?: ActiveFilter[]
  enableFilter(filter: Filter | ActiveFilter): void
  disableFilter(key: string): void
  getFilter(id: string): FilterItem | undefined
  getOperators(type?: string): FilterOperators
  reset(): void
}

const [FiltersContextProvider, useFiltersContext] =
  createContext<FiltersContextValue>({
    name: 'FiltersContext',
  })

export { useFiltersContext }

export interface FiltersProviderProps {
  filters?: FilterItem[]
  operators?: FilterOperators
  onChange?(activeFilters: ActiveFilter[]): void
}

export const FiltersProvider: React.FC<FiltersProviderProps> = (props) => {
  const { children, filters, operators = defaultOperators, onChange } = props

  const map = useMap<string, Filter>([])

  const getFilter = (id: string) => {
    return filters?.find((filter) => filter.id === id)
  }

  const getActiveFilters = (): ActiveFilter[] =>
    [...map].map(([key, filter]) => ({
      key,
      ...filter,
    }))

  const getOperators = (type: FilterType = 'string') => {
    return operators.filter(({ types }) => types.includes(type))
  }

  const enableFilter = (filter: ActiveFilter) => {
    const key = filter.key || `${filter.id}-${map.size}`
    map.set(key, filter)

    onChange?.(getActiveFilters())
  }

  const disableFilter = (key: string) => {
    map.delete(key)

    onChange?.(getActiveFilters())
  }

  const reset = () => {
    map.clear()
    onChange?.([])
  }

  const activeFilters = getActiveFilters()

  const context = {
    filters,
    activeFilters,
    enableFilter,
    disableFilter,
    getFilter,
    getOperators,
    reset,
  }

  return (
    <FiltersContextProvider value={context}>{children}</FiltersContextProvider>
  )
}

export const useFilters = () => {
  const context = useFiltersContext()
  return context.filters
}
