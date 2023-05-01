import * as React from 'react'

import {
  useControllableState,
  UseControllableStateProps,
} from '@chakra-ui/react'
import { callAllHandlers } from '@chakra-ui/utils'
import { createContext } from '@chakra-ui/react-utils'
import { formatDistanceToNowStrict, isAfter } from 'date-fns'

import { FilterItem, FilterItems, FilterMenuProps } from './filter-menu'

import { FilterOperatorId, FilterOperators } from './operators'
import { format } from 'date-fns'

export interface Filter {
  key?: string
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
  items?: FilterItems
  value?: FilterValue
  onChange?(value: FilterValue): void
  defaultValue?: FilterValue
  placeholder?: string
  format?(value: FilterValue): string
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
    (item: FilterItem) => {
      return {
        onClick: () => setValue(item.id as FilterOperatorId),
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

const defaultFormatter = (value: FilterValue) => {
  if (value instanceof Date) {
    if (isAfter(value, new Date())) {
      return format(value, 'PP')
    }
    return formatDistanceToNowStrict(value, { addSuffix: true })
  }

  return value?.toString()
}

export interface UseFilterValueProps extends ActiveFilterValueOptions {}

export const useFilterValue = (props: UseFilterValueProps = {}) => {
  const filter = useActiveFilterContext()

  const {
    onChange: onChangeProp,
    value: valueProp,
    defaultValue,
    format,
  } = props

  const [value, setValue] = useControllableState<FilterValue>({
    defaultValue: defaultValue || '',
    value: valueProp,
    onChange: (value) => {
      onChangeProp?.(value)
    },
  })

  const onSelect = React.useCallback(
    (item: FilterItem) => {
      setValue(item.value || item.id)
    },
    [value, setValue],
  )

  const formatter = format || defaultFormatter

  const label = formatter(value)

  const getMenuProps = React.useCallback(
    (props: FilterMenuProps) => {
      return {
        items: props.items || [],
        label: props.label || label,
        placeholder: filter.label || props.placeholder,
        icon: props?.icon,
        onSelect,
      }
    },
    [filter, value, onSelect],
  )

  return {
    value,
    label,
    getMenuProps,
  }
}
