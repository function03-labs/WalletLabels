import * as React from 'react'

import { createContext } from '@chakra-ui/react-utils'

import { useMap } from '@react-hookz/web'

import { FilterItem } from './filter-menu'
import { Filter } from './use-active-filter'
import { defaultOperators, FilterOperators, FilterType } from './operators'

interface FiltersContextValue {
  filters?: FilterItem[]
  operators?: FilterItem[]
  activeFilters?: Filter[]
  enableFilter(filter: Filter): void
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
  onChange?(activeFilters: Filter[]): void
  onBeforeEnableFilter?(
    filter: Filter,
    filterItem?: FilterItem,
  ): Promise<Filter>
  children: React.ReactNode
}

export const FiltersProvider: React.FC<FiltersProviderProps> = (props) => {
  const {
    children,
    filters,
    operators = defaultOperators,
    onChange,
    onBeforeEnableFilter,
  } = props

  const activeFilterMap = useMap<string, Filter>([])

  const getFilter = (id: string) => {
    return filters?.find((filter) => filter.id === id)
  }

  const getActiveFilters = (): Filter[] =>
    [...activeFilterMap].map(([key, filter]) => ({
      key,
      ...filter,
    }))

  const getOperators = (type: FilterType = 'string') => {
    return operators.filter(({ types }) => types.includes(type))
  }

  const enableFilter = async (filter: Filter) => {
    const key = filter.key || `${filter.id}-${activeFilterMap.size}`

    const def = getFilter(filter.id)

    const _enable = (key: string, filter: Filter) => {
      activeFilterMap.set(key, filter)

      onChange?.(getActiveFilters())
    }

    if (onBeforeEnableFilter) {
      try {
        const result = await onBeforeEnableFilter(
          {
            ...filter,
            key,
            operator: filter.operator || def?.defaultOperator || 'is',
          },
          def,
        )

        return _enable(result.key || key, result)
      } catch (e) {
        /* ignore */
        return
      }
    }

    _enable(key, filter)
  }

  const disableFilter = (key: string) => {
    activeFilterMap.delete(key)

    onChange?.(getActiveFilters())
  }

  const reset = () => {
    activeFilterMap.clear()
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
