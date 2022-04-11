import * as React from 'react'

import {
  useControllableState,
  UseControllableStateProps,
} from '@chakra-ui/hooks'
import { callAllHandlers } from '@chakra-ui/utils'
import { createContext } from '@chakra-ui/react-utils'

import { FilterItem } from './filter-menu'

import { FilterOperatorId, FilterOperators } from './operators'

export interface Filter {
  id: string
  value?: FilterValue
  operator?: FilterOperatorId
}

export type FilterValue = string | string[] | number | boolean | Date | null

export interface ActiveFilterContextValue {
  label?: string
  operators?: FilterOperators
  operator?: FilterOperatorId
  value?: FilterValue
  items?: FilterItem[]
}

export const [ActiveFilterProvider, useActiveFilterContext] =
  createContext<ActiveFilterContextValue>({
    name: 'ActiveFilterContext',
  })

export interface ActiveFilterValueOptions {
  items?: FilterItem[]
  value?: FilterValue
  onChange?(value: FilterValue): void
  defaultValue?: FilterValue
  placeholder?: string
}

export interface UseActiveFilterProps {
  id: string
  value?: FilterValue
  defaultValue?: FilterValue
  operator?: FilterOperatorId
  defaultOperator?: FilterOperatorId
  onChange?(filter: Filter): void
  onOperatorChange?(id: FilterOperatorId): void
  onValueChange?(id: FilterValue): void
}

export const useActiveFilter = (props: UseActiveFilterProps) => {
  const {
    id,
    defaultValue,
    defaultOperator,
    onChange,
    onOperatorChange: onOperatorChangeProp,
    onValueChange: onValueChangeProp,
  } = props

  const [filter, setFilter] = useControllableState<Filter>({
    defaultValue: {
      id,
      value: defaultValue,
      operator: defaultOperator ?? 'is',
    },
    onChange,
  })

  const onOperatorChange = (operator: FilterOperatorId) => {
    setFilter({
      ...filter,
      operator,
    })
  }

  const onValueChange = (value: FilterValue) => {
    setFilter({
      ...filter,
      value,
    })
  }

  return {
    filter,
    onOperatorChange: callAllHandlers(onOperatorChange, onOperatorChangeProp),
    onValueChange: callAllHandlers(onValueChange, onValueChangeProp),
  }
}

export interface UseFilterOperatorProps
  extends UseControllableStateProps<FilterOperatorId> {
  items?: FilterItem[]
}

export const useFilterOperator = (props: UseFilterOperatorProps) => {
  const {
    items,
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
  } = props

  const [value, setValue] = useControllableState<FilterOperatorId>({
    defaultValue: defaultValue || 'is',
    value: valueProp,
    onChange: onChangeProp,
  })

  const item = React.useMemo(
    () => items?.find(({ id }) => id === value),
    [items, value],
  )

  const getItemProps = React.useCallback(
    (item) => {
      return {
        onClick: () => setValue(item.id),
      }
    },
    [setValue],
  )

  return {
    value,
    label: item?.label || value,
    getItemProps,
  }
}

export interface UseFilterValueProps extends ActiveFilterValueOptions {}

export const useFilterValue = (props: UseFilterValueProps = {}) => {
  const filter = useActiveFilterContext()

  const { onChange: onChangeProp, value: valueProp, defaultValue } = props

  const [value, setValue] = useControllableState<FilterValue>({
    defaultValue: defaultValue || '',
    value: valueProp,
    onChange: (value) => {
      onChangeProp?.(value)
    },
  })

  const onSelect = React.useCallback(
    (item) => setValue(item.id),
    [value, setValue],
  )

  const getMenuProps = React.useCallback(
    (props: ActiveFilterValueOptions) => {
      const item = props.items?.find(({ id }) => id === value)
      return {
        items: props.items || [],
        label: item?.label || value,
        placeholder: filter.label || props.placeholder,
        icon: item?.icon,
        onSelect,
      }
    },
    [filter, value, onSelect],
  )

  return {
    value,
    getMenuProps,
  }
}
