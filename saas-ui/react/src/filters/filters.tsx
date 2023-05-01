import * as React from 'react'
import { forwardRef } from '@chakra-ui/react'
import { FilterIcon } from '../icons'
import { FilterItem, FilterMenu, FilterMenuProps } from './filter-menu'
import { useFiltersContext } from './provider'

export const FiltersAddButton = forwardRef<
  Omit<FilterMenuProps, 'items'>,
  'button'
>((props, ref) => {
  const { filters, enableFilter } = useFiltersContext()

  const onSelect = (item: FilterItem) => {
    const { id, value } = item
    enableFilter({ id, value })
  }

  return (
    <FilterMenu
      items={filters || []}
      icon={<FilterIcon />}
      ref={ref}
      onSelect={onSelect}
      {...props}
    />
  )
})
