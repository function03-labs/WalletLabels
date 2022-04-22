import { Button, Container } from '@chakra-ui/react'
import {
  FocusedInput,
  OnDatesChangeProps,
  START_DATE,
} from '@datepicker-react/hooks'
import { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'
import {
  DatePicker,
  DatePickerDialog,
  DatePickerProps,
  DatePickerTrigger,
  InputDate,
} from '../src'

const meta: Meta = {
  title: 'Components/DatePicker/DatePicker',
  component: DatePicker,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    onDayRender: undefined,
  },
}
export default meta

const Template: Story<DatePickerProps> = (args) => {
  const [date, setDate] = useState<InputDate>(null)

  const [showDatePicker, setShowDatePicker] = useState(true)

  function handleOnDatesChange(data: OnDatesChangeProps) {
    setDate(data.startDate)
  }

  return (
    <Container maxW="container.xl">
      <DatePicker
        {...args}
        isOpen={showDatePicker}
        onOpen={() => setShowDatePicker(true)}
        onClose={() => setShowDatePicker(false)}
        startDate={date}
        endDate={date}
        onDatesChange={handleOnDatesChange}
        exactMinBookingDays
        minBookingDays={1}
      >
        <DatePickerTrigger>
          <Button>Open DatePicker</Button>
        </DatePickerTrigger>
        <DatePickerDialog />
      </DatePicker>
    </Container>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const MultiMonth = Template.bind({})
MultiMonth.args = {
  numberOfMonths: 2,
}
