import * as React from 'react'
import { CalendarIcon } from '@chakra-ui/icons'
import {
  As,
  forwardRef,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react'
import { dataAttr } from '@chakra-ui/utils'
import { parseDate } from '@datepicker-react/hooks'
import { useDebouncedCallback } from '@react-hookz/web'
import { InputDate } from '../date-picker-provider'
import { defaultDateFormat } from '../utils/formatters'
import { InputRightButton } from '@saas-ui/react'

export interface InputProps {
  allowEditableInputs?: boolean
  dateFormat?: string
  disableAccessibility?: boolean
  icon?: As<any>
  id?: string
  isActive?: boolean
  name?: string
  onChange?(date: InputDate): void
  onClick?(): void
  placeholder?: string
  showCalendarIcon?: boolean
  onCalendarClick?(): void
  value?: string
}

interface BaseProps
  extends Omit<ChakraInputProps, 'onChange' | 'onClick' | 'value'>,
    InputProps {}

export const Input = forwardRef(
  (props: BaseProps, inputRef: React.Ref<any>) => {
    const {
      dateFormat = defaultDateFormat,
      disableAccessibility,
      icon = CalendarIcon,
      id,
      isActive = false,
      name,
      onChange: onChangeProp,
      value: valueProp,
      onFocus,
      placeholder,
      showCalendarIcon = true,
      onCalendarClick,
      ...inputProps
    } = props

    const [value, setValue] = React.useState(valueProp)

    React.useEffect(() => {
      setValue(valueProp)
    }, [valueProp])

    const parse = useDebouncedCallback(
      (dateValue) => {
        const parsedDate = parseDate(dateValue, dateFormat, new Date())
        const isValidDate = !isNaN(parsedDate.getDate())

        if (isValidDate) {
          onChangeProp?.(parsedDate)
        } else {
          onChangeProp?.(null)
        }
      },
      [],
      200,
    )

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = e.target.value
      setValue(dateValue)
      parse(dateValue)
    }

    return (
      <InputGroup>
        <ChakraInput
          {...inputProps}
          ref={inputRef}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          tabIndex={disableAccessibility ? -1 : 0}
          autoComplete="off"
          data-focus={dataAttr(isActive)}
          onFocus={onFocus}
          onChange={onChange}
        />
        {showCalendarIcon && (
          <InputRightButton onClick={onCalendarClick}>
            <Icon as={icon} />
          </InputRightButton>
        )}
      </InputGroup>
    )
  },
)
