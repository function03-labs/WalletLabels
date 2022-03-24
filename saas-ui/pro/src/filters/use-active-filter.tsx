import * as React from 'react'

import {
  useControllableState,
  UseControllableStateProps,
} from '@chakra-ui/hooks'
import { callAllHandlers } from '@chakra-ui/utils'
import { createContext } from '@chakra-ui/react-utils'

import { FilterMenuItem } from './filter-menu'

export interface Filter {
  id?: string
  value?: FilterValue
  operator?: FilterOperator
}

export type FilterOperator = 'is' | 'isNot' | 'before' | 'after' | 'contains'

export type FilterValue = string | string[] | number | boolean | Date | null

export interface ActiveFilterContextValue {
  label?: string
  operators?: FilterOperator[]
  operator?: FilterOperator
  value?: FilterValue
  items?: FilterMenuItem[]
}

export const [ActiveFilterProvider, useActiveFilterContext] =
  createContext<ActiveFilterContextValue>({
    name: 'ActiveFilterContext',
  })

export interface ActiveFilterValueOptions {
  items?: FilterMenuItem[]
  value?: FilterValue
  onChange?(value: FilterValue): void
  defaultValue?: FilterValue
  placeholder?: string
}

export interface UseActiveFilterProps {
  value?: FilterValue
  defaultValue?: FilterValue
  operator?: FilterOperator
  defaultOperator?: FilterOperator
  onChange?(filter: Filter): void
  onOperatorChange?(id: FilterOperator): void
  onValueChange?(id: FilterValue): void
}

export const useActiveFilter = (props: UseActiveFilterProps) => {
  const {
    defaultValue,
    defaultOperator,
    onChange,
    onOperatorChange: onOperatorChangeProp,
    onValueChange: onValueChangeProp,
  } = props

  const [filter, setFilter] = useControllableState<Filter>({
    defaultValue: {
      value: defaultValue,
      operator: defaultOperator ?? 'is',
    },
    onChange,
  })

  const onOperatorChange = (operator: FilterOperator) => {
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
    onOperatorChange: callAllHandlers(onOperatorChange, onOperatorChangeProp),
    onValueChange: callAllHandlers(onValueChange, onValueChangeProp),
  }
}

export interface UseFilterOperatorProps
  extends UseControllableStateProps<FilterOperator> {
  items?: FilterMenuItem[]
}

export const useFilterOperator = (props: UseFilterOperatorProps) => {
  const {
    items,
    defaultValue,
    value: valueProp,
    onChange: onChangeProp,
  } = props

  const [value, setValue] = useControllableState<FilterOperator>({
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
