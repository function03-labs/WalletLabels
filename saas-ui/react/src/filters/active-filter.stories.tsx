import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Center, Badge, BadgeProps } from '@chakra-ui/react'

import { FiCircle, FiUser, FiPlus, FiX } from 'react-icons/fi'

import {
  ActiveFilter,
  ActiveFilterOperator,
  ActiveFilterContainer,
  ActiveFilterLabel,
  ActiveFilterProps,
  ActiveFilterValue,
  ActiveFilterRemove,
  FilterValue,
  FilterOperators,
  FilterOperatorId,
} from '..'
import { ActiveFilterProvider, useActiveFilter } from './'

export default {
  title: 'Components/Filters/ActiveFilter',
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Story />
      </Center>
    ),
  ],
} as Meta

const Template: StoryFn<ActiveFilterProps> = (args) => (
  <ActiveFilter {...args} />
)

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

const operators = [
  {
    id: 'is',
    label: 'is',
  },
  {
    id: 'isNot',
    label: 'is not',
  },
]

export const Basic = Template.bind({})
Basic.args = {
  ...filters[0],
  defaultValue: 'new',
  operators,
  defaultOperator: 'is',
}

export const WithCallbacks = Template.bind({})
WithCallbacks.args = {
  ...filters[0],
  defaultValue: 'new',
  operators,
  defaultOperator: 'is',
  onChange: (filter) => console.log('onChange', filter),
  onOperatorChange: (operator) => console.log('onOperatorChange', operator),
  onValueChange: (value) => console.log('onValueChange', value),
  onRemove: () => console.log('onRemove'),
}

/** @TODO this api is likely to change, ActiveFilterProvider will be moved into Container, to keep the api similar as other components. */
export const Composed = () => {
  const [operator, setOperator] = React.useState<FilterOperatorId>('is')
  const [value, setValue] = React.useState<FilterValue>('new')

  const onReset = () => {
    setOperator('is')
    setValue('new')
  }

  const { filter } = useActiveFilter({
    id: 'composed-filter',
  })

  return (
    <ActiveFilterProvider value={filter}>
      <ActiveFilterContainer>
        <ActiveFilterLabel icon={<FiCircle />}>Status</ActiveFilterLabel>
        <ActiveFilterOperator
          items={operators}
          value={operator}
          onChange={(val) => setOperator(val)}
        />
        <ActiveFilterValue
          items={filters[0].items}
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="Status"
        />
        <ActiveFilterRemove onClick={onReset} />
      </ActiveFilterContainer>
    </ActiveFilterProvider>
  )
}
