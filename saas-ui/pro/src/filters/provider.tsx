import * as React from 'react'

import { createContext } from '@chakra-ui/react-utils'

import { useMap } from '@react-hookz/web'

import { FilterItem } from './filter-menu'
import { Filter } from './use-active-filter'

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

export type FilterOperator =
  | 'is'
  | 'isNot'
  | 'before'
  | 'after'
  | 'contains'
  | 'containsNot'
  | 'lessThan'
  | 'moreThan'
  | 'between'
  | string

export interface FiltersProviderProps {
  filters?: FilterItem[]
  operators?: FilterOperators
  onChange?(activeFilters: ActiveFilter[]): void
}

const defaultOperators = [
  {
    id: 'is',
    label: 'is',
    types: ['enum', 'string', 'number', 'boolean', 'date'],
  },
  {
    id: 'isNot',
    label: 'is not',
    types: ['enum', 'string', 'number', 'boolean', 'date'],
  },
  {
    id: 'contains',
    label: 'contains',
    types: ['string'],
  },
  {
    id: 'containsNot',
    label: 'does not contain',
    types: ['string'],
  },
  { id: 'lessThan', label: 'less than', types: ['number'] },
  { id: 'moreThan', label: 'more than', types: ['number'] },
  { id: 'before', label: 'before', types: ['date', 'datetime'] },
  { id: 'after', label: 'after', types: ['date', 'datetime'] },
]

export type FilterOperators = typeof defaultOperators

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

  const getOperators = (type = 'string') => {
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
