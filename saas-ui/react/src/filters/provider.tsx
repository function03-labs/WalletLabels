'use client'

import * as React from 'react'

import { createContext } from '@chakra-ui/react-utils'

import { useMap } from '@react-hookz/web'

import { FilterItem } from './filter-menu'
import { Filter } from './use-active-filter'
import {
  defaultOperators,
  FilterOperatorId,
  FilterOperators,
  FilterType,
} from './operators'

interface FiltersContextValue<
  Operator extends string = FilterOperatorId,
  Type extends string = FilterType,
> {
  /**
   * The list of filters
   */
  filters?: FilterItem[]
  /**
   * The list of filter operators
   */
  operators?: FilterItem[]
  /**
   * The list of active filters
   */
  activeFilters?: Filter[]
  /**
   * Enable a filter
   * @returns the unique key of the filter
   */
  enableFilter(filter: Filter): Promise<string>
  /**
   * Disable a filter
   */
  disableFilter(key: string): void
  /**
   * Get a filter by id
   * @param id the filter id
   * @returns the filter
   */
  getFilter(id: string): FilterItem | undefined
  /**
   * Get a active filter by id
   * @param id the filter id
   * @returns the filter
   */
  getActiveFilter(id: string): Filter | undefined
  /**
   * Get operators by type
   * @returns the list of operators
   */
  getOperators(type?: string): FilterOperators<Operator, Type>
  /**
   * Reset all active filters
   */
  reset(): void
}

const [FiltersContextProvider, useFiltersContext] = createContext<
  FiltersContextValue<any, any>
>({
  name: 'FiltersContext',
})

export { useFiltersContext }

export interface FiltersProviderProps<
  Operator extends string = FilterOperatorId,
  Type extends string = FilterType,
> {
  filters?: FilterItem[]
  activeFilters?: Filter[]
  defaultFilters?: Filter[]
  operators?: FilterOperators<Operator, Type>
  onChange?(activeFilters: Filter[]): void
  onBeforeEnableFilter?(
    filter: Filter,
    filterItem?: FilterItem,
  ): Promise<Filter>
  children: React.ReactNode
}

export const FiltersProvider = <
  Operator extends string = FilterOperatorId,
  Type extends string = FilterType,
>(
  props: FiltersProviderProps<Operator, Type>,
) => {
  const {
    children,
    filters,
    activeFilters: activeFiltersProp,
    defaultFilters,
    operators = defaultOperators,
    onChange,
    onBeforeEnableFilter,
  } = props

  const initializedRef = React.useRef(false)

  const activeFilterMap = useMap<string, Filter>([])

  const getFilter = React.useCallback(
    (id: string) => {
      return filters?.find((filter) => filter.id === id)
    },
    [filters],
  )

  const getActiveFilter = React.useCallback(
    (id: string) => {
      return activeFilterMap.get(id)
    },
    [filters],
  )

  const getActiveFilters = React.useCallback(
    (): Filter[] =>
      Array.from(activeFilterMap.entries()).map(([key, filter]) => ({
        key,
        ...filter,
      })),
    [activeFilterMap],
  )

  const getOperators = React.useCallback(
    (type = 'string') => {
      return operators.filter(({ types }) => types.includes(type as any))
    },
    [operators],
  )

  const _setFilter = React.useCallback((filter: Filter) => {
    const key = filter.key || `${filter.id}-${activeFilterMap.size}`
    const def = getFilter(filter.id)

    const operator = filter.operator || def?.defaultOperator || 'is'

    activeFilterMap.set(key, {
      ...filter,
      operator,
    })
  }, [])

  const enableFilter = React.useCallback(
    async (filter: Filter) => {
      const key = filter.key || `${filter.id}-${activeFilterMap.size}`
      const def = getFilter(filter.id)

      const operator = filter.operator || def?.defaultOperator || 'is'

      const _enable = (key: string, filter: Filter) => {
        activeFilterMap.set(key, filter)

        onChange?.(getActiveFilters())

        return key
      }

      if (onBeforeEnableFilter) {
        const result = await onBeforeEnableFilter(
          {
            ...filter,
            operator,
            key,
          },
          def,
        )

        return _enable(result.key || key, result)
      }

      return _enable(key, {
        ...filter,
        operator,
      })
    },
    [onBeforeEnableFilter, onChange],
  )

  const disableFilter = React.useCallback(
    (key: string) => {
      activeFilterMap.delete(key)

      onChange?.(getActiveFilters())
    },
    [onChange],
  )

  const reset = React.useCallback(() => {
    activeFilterMap.clear()
    onChange?.([])
  }, [onChange])

  const activeFilters = getActiveFilters()

  React.useEffect(() => {
    if (!initializedRef.current) {
      defaultFilters?.forEach((filter) => {
        console.log('enable', filter)
        _setFilter(filter)
      })
      initializedRef.current = true
    }
  }, [defaultFilters, enableFilter])

  React.useEffect(() => {
    if (activeFiltersProp) {
      activeFilterMap.clear()
      activeFiltersProp?.forEach(_setFilter)
    }
  }, [activeFiltersProp])

  const context = {
    filters,
    activeFilters,
    enableFilter,
    disableFilter,
    getFilter,
    getActiveFilter,
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
