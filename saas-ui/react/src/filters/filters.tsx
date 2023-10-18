import * as React from 'react'
import { forwardRef } from '@chakra-ui/react'
import { FilterIcon } from '../icons'
import { FilterItem, FilterMenu, FilterMenuProps } from './filter-menu'
import { useFiltersContext } from './provider'

export const FiltersAddButton = forwardRef<
  Omit<FilterMenuProps, 'items'>,
  'button'
>((props, ref) => {
  const { onClose: onCloseProp, ...rest } = props
  const { filters, enableFilter } = useFiltersContext()

  const [currentKey, setCurrentKey] = React.useState<string | undefined>()

  const onSelect = async (item: FilterItem) => {
    const { id, value } = item
    // if the filter value changes while the menu is open, we update the filter instead.
    const key = await enableFilter(
      currentKey ? { key: currentKey, id, value } : { id, value },
    )

    setCurrentKey(key)
  }

  const onClose = () => {
    setCurrentKey(undefined)
    onCloseProp?.()
  }

  return (
    <FilterMenu
      items={filters || []}
      icon={<FilterIcon />}
      ref={ref}
      onSelect={onSelect}
      onClose={onClose}
      {...rest}
    />
  )
})
