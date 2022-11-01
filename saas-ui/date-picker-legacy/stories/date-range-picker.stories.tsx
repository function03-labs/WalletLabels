import { Button, Container, useDisclosure } from '@chakra-ui/react'
import {
  FocusedInput,
  OnDatesChangeProps,
  START_DATE,
} from '@datepicker-react/hooks'
import { Meta, Story } from '@storybook/react'
import React, { useRef, useState } from 'react'
import {
  DatePicker,
  DatePickerDialog,
  DatePickerElement,
  DatePickerProps,
  DatePickerTrigger,
  InputDate,
} from '../src'

import { Box } from '@chakra-ui/react'

const meta: Meta = {
  title: 'Components/DatePicker/DateRangePicker',
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
  const [endDate, setEndDate] = useState<InputDate>(null)
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(START_DATE)

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
    onOpen() {
      setFocusedInput(START_DATE)
    },
  })

  function handleOnDatesChange(data: OnDatesChangeProps) {
    setDate(data.startDate)
    setEndDate(data.endDate)

    if (data.focusedInput) setFocusedInput(data.focusedInput)
  }

  return (
    <Container maxW="container.xl">
      <DatePicker
        {...args}
        isOpen={isOpen}
        onOpen={() => onOpen}
        onClose={() => onClose}
        startDate={date}
        endDate={endDate}
        focusedInput={focusedInput}
        onDatesChange={handleOnDatesChange}
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

export const SingleMonth = Template.bind({})
SingleMonth.args = {
  numberOfMonths: 1,
}
