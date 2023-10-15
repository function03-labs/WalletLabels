import * as React from 'react'

import { FiCircle, FiFilter, FiCalendar, FiTag } from 'react-icons/fi'

import { Badge, useDisclosure } from '@chakra-ui/react'

import {
  FilterItem,
  FilterMenu,
  FilterMenuProps,
  useFiltersContext,
} from '@saas-ui-pro/react'
import { useHotkeysShortcut } from '@saas-ui/react'

import { startOfDay, subDays, formatDistanceToNowStrict } from 'date-fns'
import { StatusBadge } from '@ui/lib'
import { queryClient } from '@app/features/core/lib/react-query'
import { Tags } from '@api/client'

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
    id: 'tags',
    label: 'Tags',
    icon: <FiTag />,
    type: 'string',
    defaultOperator: 'contains',
    operators: ['contains', 'containsNot'],
    items: () => {
      return (
        queryClient
          .getQueryData<{ tags: Tags }>(['GetTags'])
          ?.tags?.map<FilterItem>((tag) => {
            return {
              id: tag.id,
              label: tag.label,
              icon: <StatusBadge color={tag.color} />,
            }
          }) || []
      )
    },
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
    enableFilter({ id, operator: item.defaultOperator, value })
  }

  return (
    <FilterMenu
      items={filters}
      icon={<FiFilter />}
      ref={menuRef}
      command={filterCommand}
      buttonProps={{ variant: 'tertiary', size: 'xs' }}
      onSelect={onSelect}
      {...disclosure}
      {...props}
    />
  )
}
