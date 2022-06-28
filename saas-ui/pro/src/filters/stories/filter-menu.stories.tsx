import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Center, Badge, BadgeProps } from '@chakra-ui/react'

import { FiCircle, FiUser } from 'react-icons/fi'

import { FilterItem, FilterMenu, FilterMenuProps } from '..'

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
    id: 'new',
    label: 'New',
    icon: <StatusBadge bg="green.400" />,
  },
  {
    id: 'lead',
    label: 'Is lead',
    type: 'boolean',
    icon: <FiUser />,
    value: 'lead',
  },
]

const filtersNested: FilterItem[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'array',
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
    id: 'lead',
    label: 'Is lead',
    type: 'boolean',
    icon: <FiUser />,
  },
]

export const Basic = Template.bind({})
Basic.args = {
  items: filters,
  isOpen: true,
}

export const NestedFilters = Template.bind({})
NestedFilters.args = {
  items: filtersNested,
}
