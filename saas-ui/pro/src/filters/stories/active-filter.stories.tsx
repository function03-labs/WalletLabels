import * as React from 'react'
import { Story, Meta } from '@storybook/react'
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
  FilterOperator,
} from '..'

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

const Template: Story<ActiveFilterProps> = (args) => <ActiveFilter {...args} />

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
    icon: <FiPlus />,
  },
  {
    id: 'isNot',
    label: 'is not',
    icon: <FiX />,
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

export const Composed = () => {
  const [operator, setOperator] = React.useState<FilterOperator>('is')
  const [value, setValue] = React.useState<FilterValue>('new')

  const onReset = () => {
    setOperator('is')
    setValue('new')
  }

  return (
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
  )
}
