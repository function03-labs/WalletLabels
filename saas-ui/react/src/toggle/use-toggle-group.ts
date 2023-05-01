import { useCallbackRef, useControllableState } from '@chakra-ui/react'
import { isObject } from '@chakra-ui/utils'
import { useCallback } from 'react'

function isInputEvent(value: any): value is { target: HTMLInputElement } {
  return value && isObject(value) && isObject(value.target)
}

export type Value = string | number

export type Type = 'checkbox' | 'radio'

export interface UseToggleGroupProps<
  TValue extends Value = Value,
  TType extends Type = Type,
> {
  /**
   * The type of the toggle group
   */
  type?: TType
  /**
   * The value of the toggle group
   */
  value?: TType extends 'checkbox' ? TValue[] : TValue
  /**
   * The initial value of the checkbox group
   */
  defaultValue?: TType extends 'checkbox' ? TValue[] : TValue
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?(value: TValue[] | TValue | undefined): void
  /**
   * If `true`, all wrapped checkbox inputs will be disabled
   */
  isDisabled?: boolean
  /**
   * If `true`, input elements will receive
   * `checked` attribute instead of `isChecked`.
   *
   * This assumes, you're using native radio inputs
   */
  isNative?: boolean
}

/**
 * React hook that provides all the state management logic
 * for a group of checkboxes or radios.
 */
export function useToggleGroup<
  TValue extends Value = Value,
  TType extends Type = Type,
>(props: UseToggleGroupProps<TValue, TType> = {}) {
  const {
    type = 'checkbox',
    defaultValue = type === 'checkbox' ? [] : undefined,
    value: valueProp,
    onChange,
    isDisabled,
    isNative,
  } = props

  const onChangeProp = useCallbackRef(onChange)

  const [value, setValue] = useControllableState<TValue[] | TValue | undefined>(
    {
      value: valueProp,
      defaultValue: defaultValue,
      onChange: onChangeProp,
    },
  )

  const isCheckbox = Array.isArray(value)

  const handleChange = useCallback(
    (eventOrValue: any | React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = isInputEvent(eventOrValue)
        ? eventOrValue.target.checked
        : isCheckbox
        ? !value.includes(eventOrValue)
        : value !== eventOrValue

      const selectedValue = isInputEvent(eventOrValue)
        ? eventOrValue.target.value
        : eventOrValue

      let nextValue
      if (isCheckbox) {
        nextValue = isChecked
          ? [...value, selectedValue]
          : value.filter((v) => String(v) !== String(selectedValue))
      } else {
        nextValue = isChecked ? selectedValue : undefined
      }

      setValue(nextValue)
    },
    [setValue, value],
  )

  const getToggleProps = useCallback(
    (props: Record<string, any> = {}) => {
      const checkedKey = isNative ? 'checked' : 'isChecked'
      return {
        ...props,
        [checkedKey]: isCheckbox
          ? value.some((val) => String(props.value) === String(val))
          : value === props.value,
        onChange: handleChange,
      }
    },
    [handleChange, isNative, value],
  )

  return {
    value,
    isDisabled,
    onChange: handleChange,
    setValue,
    getToggleProps,
  }
}

export type UseCheckboxGroupReturn = ReturnType<typeof useToggleGroup>
