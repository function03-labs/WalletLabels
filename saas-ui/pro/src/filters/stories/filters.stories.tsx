import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Badge, BadgeProps, Stack, Box } from '@chakra-ui/react'

import { FiCircle, FiUser } from 'react-icons/fi'

import { ActiveFilterProps } from '..'
import { FiltersProvider } from '../provider'
import { FiltersAddButton } from '../filters'
import { ActiveFiltersList } from '../active-filter'

export default {
  title: 'Components/Filters/Filters',
  decorators: [(Story: any) => <Story />],
} as Meta

const Template: Story<ActiveFilterProps> = (args) => {
  return (
    <FiltersProvider filters={filters}>
      <Stack alignItems="flex-start" width="400px">
        <Box px="3">
          <FiltersAddButton />
        </Box>

        <ActiveFiltersList />
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
    label: 'Is lead',
    type: 'boolean',
    icon: <FiUser />,
    value: true,
  },
]

export const Basic = Template.bind({})
Basic.args = {}
