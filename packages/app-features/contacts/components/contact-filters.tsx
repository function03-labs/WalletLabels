import * as React from 'react'

import { FiCircle, FiFilter, FiCalendar } from 'react-icons/fi'

import { Badge, useDisclosure } from '@chakra-ui/react'

import {
  FilterItem,
  FilterMenu,
  FilterMenuProps,
  useFiltersContext,
} from '@saas-ui/pro'
import { useHotkeysShortcut } from '@saas-ui/react'

import { startOfDay, subDays, formatDistanceToNowStrict } from 'date-fns'
import { StatusBadge } from '@ui/lib'

const days = [1, 2, 3, 7, 14, 21, 31, 60]

export const filters: FilterItem[] = [
  {
    id: 'status',
    label: 'Status',
    icon: <StatusBadge colorScheme="gray" />,
    type: 'enum',
    items: [
      {
        id: 'new',
        label: 'New',
        icon: <StatusBadge colorScheme="blue" />,
      },
      {
        id: 'active',
        label: 'Active',
        icon: <StatusBadge colorScheme="green" />,
      },
      {
        id: 'inactive',
        label: 'Inactive',
        icon: <StatusBadge colorScheme="yellow" />,
      },
    ],
  },
  {
    id: 'createdAt',
    label: 'Created at',
    icon: <FiCalendar />,
    type: 'date',
    operators: ['after', 'before'],
    defaultOperator: 'after',
    items: days
      .map((day): FilterItem => {
        const date = startOfDay(subDays(new Date(), day))
        return {
          id: `${day}days`,
          label: formatDistanceToNowStrict(date, { addSuffix: true }),
          value: date,
        }
      })
      .concat([{ id: 'custom', label: 'Custom' }]),
  },
]

export const AddFilterButton: React.FC<Omit<FilterMenuProps, 'items'>> = (
  props,
) => {
  const disclosure = useDisclosure()

  const filterCommand = useHotkeysShortcut('general.filter', () => {
    disclosure.onOpen()
  })

  const menuRef = React.useRef<HTMLButtonElement>(null)

  const { enableFilter } = useFiltersContext()

  const onSelect = (item: FilterItem) => {
    const { id, value } = item
    enableFilter({ id, value })
  }

  return (
    <FilterMenu
      items={filters}
      icon={<FiFilter />}
      ref={menuRef}
      command={filterCommand}
      buttonProps={{ variant: 'secondary' }}
      onSelect={onSelect}
      {...disclosure}
      {...props}
    />
  )
}
