'use client'

import * as React from 'react'

import {
  forwardRef,
  Portal,
  useDisclosure,
  Button,
  ButtonProps,
  MenuProps,
  MenuButton,
  Spinner,
  HStack,
  Checkbox,
  useControllableState,
  MenuListProps,
} from '@chakra-ui/react'

import {
  ResponsiveMenu,
  ResponsiveMenuList,
  MenuInput,
  MenuFilterItem,
} from '../menu'
import { FilterValue, useSearchQuery } from '..'
import { FilterOperatorId, FilterType } from './operators'

export type FilterItems =
  | FilterItem[]
  | ((query: string) => Promise<FilterItem[]>)
  | ((query: string) => FilterItem[])

const itemCache = new Map<string, FilterItem[]>()

export const useFilterItems = (
  id: string,
  items: FilterItems,
  inputValue?: string,
) => {
  const [data, setData] = React.useState<FilterItem[]>(itemCache.get(id) || [])
  const [isLoading, setLoading] = React.useState(false)
  const [isFetched, setFetched] = React.useState(false)

  const getItems = async (inputValue = '') => {
    if (typeof items === 'function') {
      setLoading(true)
      const result = await items(inputValue)
      setLoading(false)
      setFetched(true)
      return result
    }
    return items
  }

  React.useEffect(() => {
    getItems(inputValue).then((data) => {
      setData(data)
      itemCache.set(id, data)
    })
  }, [items, inputValue])

  return { data, isLoading, isFetched }
}

export interface FilterItem {
  /**
   * The filter id
   */
  id: string
  /**
   * The filter label
   *
   * e.g. "Contact is lead"
   */
  label?: string
  /**
   * The active filter label
   *
   * e.g. "Contact"
   */
  activeLabel?: string
  /**
   * Icon displayed before the label
   */
  icon?: React.ReactElement
  /**
   * The filter type
   */
  type?: FilterType
  /**
   * The available
   */
  items?: FilterItems
  /**
   * Enable multiple select if true
   */
  multiple?: boolean
  /**
   * The filter value
   */
  value?: string | string[] | number | boolean | Date
  /**
   * The available operators
   */
  operators?: FilterOperatorId[]
  /**
   * The default operator
   */
  defaultOperator?: FilterOperatorId
}

export interface FilterMenuProps
  extends Omit<MenuProps, 'children' | 'onChange'> {
  value?: FilterValue
  items: FilterItems
  icon?: React.ReactNode
  label?: React.ReactNode
  placeholder?: string
  command?: string
  multiple?: boolean
  onSelect?(item: FilterItem | FilterItem[]): Promise<void>
  onChange?(value?: FilterValue): void
  buttonProps?: ButtonProps
  listProps?: MenuListProps
  inputValue?: string
  inputDefaultValue?: string
  onInputChange?(value: string, activeItemId?: string): void
}

export const FilterMenu = forwardRef<FilterMenuProps, 'button'>(
  (props, forwardedRef) => {
    const {
      items,
      label = 'Filter',
      placeholder = 'Filter...',
      command,
      icon,
      buttonProps,
      listProps,
      onSelect,
      value: valueProp,
      onChange: onChangeProp,
      isOpen: isOpenProp,
      defaultIsOpen,
      onOpen: onOpenProp,
      onClose: onCloseProp,
      inputValue,
      inputDefaultValue,
      onInputChange,
      multiple,
      ...rest
    } = props

    const [value, setValue] = useControllableState<FilterValue | undefined>({
      value: props.value,
      onChange: (value) => {
        onChangeProp?.(value)

        if (!isOpen || !value) {
          return
        }

        // if there is an activeItem we select the value
        if (activeItemRef.current) {
          onSelect?.({
            ...activeItemRef.current,
            value,
          })
          return
        }

        let id: string | null = null
        if (Array.isArray(value)) {
          // we always pick the first value here to retrieve the filter
          // this should be no problem because we only support one filter here.
          id = value[0]
        } else if (typeof value === 'string') {
          id = value
        }

        const filter = results?.find(
          (filter) => filter.id === id || filter.value === id,
        )

        if (filter) {
          onSelect?.(filter)
        }
      },
    })

    const onCheck = (id: string, isChecked: boolean) => {
      setValue((value) => {
        let values: string[] = []
        if (typeof value === 'string') {
          values = [value]
        } else if (Array.isArray(value)) {
          values = value.concat()
        }

        if (isChecked && values.indexOf(id) === -1) {
          values.push(id)
        } else if (!isChecked) {
          values = values.filter((value) => value !== id)
        }

        return values
      })
    }

    const isChecked = (id: string) => {
      return Array.isArray(value) && value?.includes(id)
    }

    const { isOpen, onOpen, onClose } = useDisclosure({
      isOpen: isOpenProp,
      defaultIsOpen,
      onOpen() {
        onOpenProp?.()

        if (!isOpen) {
          setActiveItem(null)

          // if the value is empty we need to reset it
          if (!props.value) {
            setValue(undefined)
          }
        }

        filterRef.current?.focus()
      },
      onClose() {
        onReset()
        onCloseProp?.()
      },
    })

    const filterRef = React.useRef<HTMLInputElement>(null)

    const [activeItem, _setActiveItem] = React.useState<FilterItem | null>(null)
    const activeItemRef = React.useRef<FilterItem | null>(null)

    const setActiveItem = (item: FilterItem | null) => {
      activeItemRef.current = item || null
      _setActiveItem(item)
    }

    const [filterValue, setFilterValue] = React.useState(inputValue || '')

    const { data, isLoading, isFetched } = useFilterItems(
      activeItem?.id || 'default',
      activeItem?.items || items,
      filterValue,
    )

    const { results, onReset, ...inputProps } = useSearchQuery<FilterItem>({
      items: isLoading && !isFetched ? [] : data,
      fields: ['id', 'label'],
      value: inputValue,
      defaultValue: inputDefaultValue,
      onChange: (value) => {
        onInputChange?.(value, activeItem?.id)
        setFilterValue(value)
      },
    })

    const spinner = isLoading ? (
      <Spinner size="sm" position="absolute" top="3" right="3" />
    ) : null

    const onItemClick = React.useCallback(
      async (item: FilterItem, close = true) => {
        const count = item.items?.length || 0
        if (count > 1 || typeof item.items === 'function') {
          setActiveItem(item)
          onReset()
          filterRef.current?.focus()
          return
        } else if (count === 1) {
          setActiveItem(item)
          const value = item.items?.[0].value || item.items?.[0].id
          setValue(value)
        } else {
          const value = item.value || item.id
          const isMulti = multiple || item.multiple || activeItem?.multiple
          setValue(
            isMulti && typeof value === 'string' && !Array.isArray(value)
              ? [value]
              : value,
          )
        }

        if (close) {
          onClose()
        }
      },
      [onReset, onClose, onSelect, activeItem, value],
    )

    const input = (
      <MenuInput
        placeholder={activeItem?.label || placeholder}
        ref={filterRef}
        command={command}
        {...inputProps}
      />
    )

    const filteredItems = React.useMemo(() => {
      const isMulti = multiple || activeItem?.multiple
      return (
        results?.map((item, i) => {
          const {
            id,
            label,
            activeLabel,
            type,
            items,
            value,
            operators,
            defaultOperator,
            multiple,
            icon,
            ...itemProps
          } = item

          const _icon = isMulti ? (
            <HStack>
              <Checkbox
                isChecked={isChecked(id)}
                onChange={(e) => onCheck(id, e.target.checked)}
              />
              {icon}
            </HStack>
          ) : (
            icon
          )

          return (
            <MenuFilterItem
              key={`${id}-${i}`}
              value={id}
              icon={_icon}
              {...itemProps}
              onClick={(e) => {
                if ((e.target as any).closest('.chakra-checkbox')) {
                  e.stopPropagation()
                  return
                }
                onItemClick(item)
              }}
            >
              {item.label}
            </MenuFilterItem>
          )
        }) || null
      )
    }, [results, activeItem, onItemClick])

    return (
      <ResponsiveMenu
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnSelect={false}
        {...rest}
      >
        <MenuButton
          as={Button}
          leftIcon={icon}
          {...buttonProps}
          ref={forwardedRef}
        >
          {label}
        </MenuButton>
        <Portal>
          <ResponsiveMenuList
            zIndex="dropdown"
            pt="0"
            overflow="auto"
            initialFocusRef={filterRef}
            hideCloseButton={true}
            {...listProps}
          >
            {input}
            {spinner}
            {filteredItems}
          </ResponsiveMenuList>
        </Portal>
      </ResponsiveMenu>
    )
  },
)
