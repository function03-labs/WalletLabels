import * as React from 'react'
import { forwardRef } from '@chakra-ui/react'
import { FilterIcon } from '../icons'
import { FilterItem, FilterMenu, FilterMenuProps } from './filter-menu'
import { useFiltersContext } from './provider'

export const FiltersAddButton = forwardRef<
  Omit<FilterMenuProps, 'items'>,
  'button'
>((props, ref) => {
  const { onOpen: onOpenProp, onClose: onCloseProp, isOpen, ...rest } = props
  const { filters, enableFilter } = useFiltersContext()

  const openRef = React.useRef(false)
  const [currentKey, setCurrentKey] = React.useState<string | undefined>()

  const onSelect = async (item: FilterItem) => {
    const { id, value } = item

    // if the filter value changes while the menu is open, we update the filter instead.
    const key = await enableFilter(
      currentKey ? { key: currentKey, id, value } : { id, value },
    )

    if (openRef.current) {
      // only set this if the menu is still open
      setCurrentKey(key)
    }
  }

  const onOpen = () => {
    setCurrentKey(undefined)
    onOpenProp?.()
    openRef.current = true
  }

  const onClose = () => {
    setCurrentKey(undefined)
    onCloseProp?.()
    openRef.current = false
  }

  return (
    <FilterMenu
      items={filters || []}
      icon={<FilterIcon />}
      ref={ref}
      onSelect={onSelect}
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
      {...rest}
    />
  )
})
