import * as React from 'react'

import { FiCircle, FiUser, FiFilter, FiCalendar } from 'react-icons/fi'

import { Badge, useDisclosure } from '@chakra-ui/react'

import {
  FilterItem,
  FilterMenu,
  FilterMenuProps,
  useFiltersContext,
} from '@saas-ui/pro'
import { useHotkeysShortcut } from '@saas-ui/react'

import startOfDay from 'date-fns/startOfDay'
import subDays from 'date-fns/subDays'

export const filters: FilterItem[] = [
  {
    id: 'status',
    label: 'Status',
    icon: <FiCircle />,
    type: 'enum',
    items: [
      {
        id: 'new',
        label: 'New',
        icon: <Badge boxSize="8px" borderRadius="full" bg="blue.400" />,
      },
      {
        id: 'active',
        label: 'Active',
        icon: <Badge boxSize="8px" borderRadius="full" bg="green.400" />,
      },
    ],
  },
  {
    id: 'type',
    label: 'Is lead',
    icon: <FiUser />,
    type: 'enum',
    value: 'lead',
  },
  {
    id: 'createdAt',
    label: 'Created at',
    icon: <FiCalendar />,
    type: 'date',
    operators: ['after', 'before'],
    items: [
      {
        id: '1day',
        label: '1 day ago',
        value: startOfDay(subDays(new Date(), 1)),
      },
      {
        id: '2days',
        label: '2 days ago',
        value: startOfDay(subDays(new Date(), 2)),
      },
      {
        id: '3days',
        label: '3 days ago',
        value: startOfDay(subDays(new Date(), 3)),
      },
      {
        id: '1week',
        label: '1 week ago',
        value: startOfDay(subDays(new Date(), 7)),
      },
      {
        id: '1weeks',
        label: '2 weeks ago',
        value: startOfDay(subDays(new Date(), 14)),
      },
      {
        id: '1month',
        label: '1 month ago',
        value: startOfDay(subDays(new Date(), 30)),
      },
      {
        id: 'custom',
        label: 'Custom',
      },
    ],
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
    enableFilter({ id, value, operator: 'is' })
  }

  return (
    <FilterMenu
      items={filters}
      icon={<FiFilter />}
      ref={menuRef}
      command={filterCommand}
      buttonProps={{ variant: 'outline' }}
      onSelect={onSelect}
      {...disclosure}
      {...props}
    />
  )
}
