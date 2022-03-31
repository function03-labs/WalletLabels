import { Container, FormControl, FormLabel } from '@chakra-ui/react'
import { START_DATE } from '@datepicker-react/hooks'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { DateRangeInput, DateRangeInputProps } from '../src'

const meta: Meta = {
  title: 'Components/DatePicker/DateRangeInput',
  component: DateRangeInput,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onDayRender: undefined,
    focusedInput: START_DATE,
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

const Template: Story<DateRangeInputProps> = (args) => (
  <FormControl>
    <FormLabel>Select date</FormLabel>
    <DateRangeInput {...args} />
  </FormControl>
)

export const Default = Template.bind({})
Default.args = {
  numberOfMonths: 2,
}

export const OpenOnFocus = Template.bind({})
OpenOnFocus.args = {
  openOnFocus: true,
}

export const CloseOnSelect = Template.bind({})
CloseOnSelect.args = {
  closeOnSelect: true,
}
