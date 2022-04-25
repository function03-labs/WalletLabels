import { Container, FormControl, FormLabel } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { DateInput, DateInputProps } from '../src'

const meta: Meta = {
  title: 'Components/DatePicker/DateInput',
  component: DateInput,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onDayRender: undefined,
  },
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      )
    },
  ],
}
export default meta

const Template: Story<DateInputProps> = (args) => (
  <FormControl>
    <FormLabel>Select date</FormLabel>
    <DateInput {...args} />
  </FormControl>
)

export const Default = Template.bind({})
Default.args = {}

export const OpenOnFocus = Template.bind({})
OpenOnFocus.args = {
  openOnFocus: true,
}

export const CloseOnSelect = Template.bind({})
CloseOnSelect.args = {
  closeOnSelect: true,
}

export const DateFormat = Template.bind({})
DateFormat.args = {
  dateFormat: 'yyyy/dd/MM',
}
