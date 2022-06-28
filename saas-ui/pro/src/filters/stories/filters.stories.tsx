import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Badge, BadgeProps, Stack, Box, Text } from '@chakra-ui/react'

import { FiCircle, FiUser } from 'react-icons/fi'

import { FiltersProvider, FiltersProviderProps } from '../provider'
import { FiltersAddButton } from '../filters'
import { ActiveFiltersList } from '../active-filter'

export default {
  title: 'Components/Filters/Filters',
  decorators: [(Story: any) => <Story />],
} as Meta

const Template: Story<FiltersProviderProps> = (args) => {
  return (
    <FiltersProvider {...args}>
      <Stack alignItems="flex-start" width="400px">
        <Box px="3">
          <FiltersAddButton />
        </Box>

        <ActiveFiltersList px="3" py="2" borderBottomWidth="1px" zIndex="2" />
      </Stack>
    </FiltersProvider>
  )
}

const StatusBadge = (props: BadgeProps) => (
  <Badge boxSize="8px" mx="2px" borderRadius="full" {...props} />
)

const filters = [
  {
    id: 'status',
    label: 'Status',
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
    label: 'Contact is lead',
    type: 'boolean',
    icon: <FiUser />,
    value: true,
    format: () => 'lead',
  },
]

export const Basic = Template.bind({})
Basic.args = {
  filters,
  onChange: (filters) => console.log(filters),
}

export const DefaultFilters = Template.bind({})
DefaultFilters.args = {
  filters,
  defaultFilters: [{ id: 'status', operator: 'is', value: 'new' }],
}
