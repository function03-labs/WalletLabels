import * as React from 'react'

import { FiCircle, FiUser, FiFilter } from 'react-icons/fi'

import { Badge, useDisclosure } from '@chakra-ui/react'

import {
  FilterItem,
  FilterMenu,
  FilterMenuProps,
  useFiltersContext,
} from '@saas-ui/pro'
import { useHotkeysShortcut } from '@saas-ui/react'

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

  const onSelect = ({ id, value }: FilterItem) => {
    enableFilter({ id, value, operator: 'is' }) // @todo make operator dynamic
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
