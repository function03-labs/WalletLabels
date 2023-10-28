import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Center, Badge, BadgeProps } from '@chakra-ui/react'

import { FiCircle, FiUser } from 'react-icons/fi'

import { FilterItem, FilterMenu, FilterMenuProps } from '.'

export default {
  title: 'Components/Filters/FilterMenu',
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Story />
      </Center>
    ),
  ],
} as Meta

const Template: Story<FilterMenuProps> = (args) => <FilterMenu {...args} />

const StatusBadge = (props: BadgeProps) => (
  <Badge boxSize="8px" mx="2px" borderRadius="full" {...props} />
)

const filters: FilterItem[] = [
  {
    id: 'status',
    label: 'New users',
    icon: <StatusBadge bg="blue.400" />,
    value: 'new',
  },
  {
    id: 'status',
    label: 'Active users',
    icon: <StatusBadge bg="green.400" />,
    value: 'active',
  },
  {
    id: 'type',
    label: 'Contact is lead',
    activeLabel: 'Contact',
    icon: <FiUser />,
    value: 'lead',
  },
]

const filtersNested: FilterItem[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'enum',
    icon: <FiCircle />,
    items: [
      {
        id: 'new',
        label: 'New',
        icon: <StatusBadge bg="blue.400" />,
      },
      {
        id: 'active',
        label: 'Active',
        icon: <StatusBadge bg="green.400" />,
      },
    ],
  },
  {
    id: 'type',
    label: 'Contact is lead',
    activeLabel: 'Contact',
    icon: <FiUser />,
    value: 'lead',
  },
]

export const Basic = Template.bind({})
Basic.args = {
  items: filters,
  defaultIsOpen: true,
}

export const NestedFilters = Template.bind({})
NestedFilters.args = {
  items: filtersNested,
}

const filtersAsync: FilterItem[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'enum',
    icon: <FiCircle />,
    items: async (query) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 'new',
              label: 'New',
              icon: <StatusBadge bg="blue.400" />,
            },
            {
              id: 'active',
              label: 'Active',
              icon: <StatusBadge bg="green.400" />,
            },
          ])
        }, 1000)
      })
    },
  },
  {
    id: 'lead',
    label: 'Contact is lead',
    activeLabel: 'Contact',
    icon: <FiUser />,
    value: 'lead',
  },
]

export const WithAsyncFilters = () => {
  const [items, setItems] = React.useState<FilterItem[]>(filtersAsync)
  const [query, setQuery] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const onChange = (value: string, activeItemId: string) => {
    // only search root items
    if (activeItemId) {
      return
    }

    setQuery(value)

    // this simulates a fetch from the backend.
    setLoading(true)
    setTimeout(() => {
      setItems(
        filtersAsync.filter((filter) => {
          return filter.id.match(value)
        }),
      )
      setLoading(false)
    }, 1000)
  }

  return (
    <FilterMenu
      items={items}
      inputValue={query}
      onInputChange={onChange}
      buttonProps={{ isLoading }}
    />
  )
}
