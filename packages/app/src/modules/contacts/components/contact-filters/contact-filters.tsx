import * as React from 'react'

import { FiCircle, FiUser, FiFilter } from 'react-icons/fi'

import { Badge, useDisclosure } from '@chakra-ui/react'

import { Filter, FilterMenu, FilterMenuProps } from '@saas-ui/pro'
import { useHotkeysShortcut } from '@saas-ui/react'

export const AddFilterButton: React.FC<Omit<FilterMenuProps, 'filters'>> = (
  props,
) => {
  const disclosure = useDisclosure()

  const filterCommand = useHotkeysShortcut('general.filter', () => {
    disclosure.onOpen()
  })

  const menuRef = React.useRef<HTMLButtonElement>(null)

  const filters: Filter[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'array',
      icon: <FiCircle />,
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
      id: 'lead',
      label: 'Is lead',
      type: 'boolean',
      icon: <FiUser />,
    },
  ]
  return (
    <FilterMenu
      filters={filters}
      icon={<FiFilter />}
      ref={menuRef}
      command={filterCommand}
      {...disclosure}
      {...props}
    />
  )
}
