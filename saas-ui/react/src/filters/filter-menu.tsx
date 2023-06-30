import * as React from 'react'

import {
  forwardRef,
  Portal,
  useDisclosure,
  Button,
  ButtonProps,
  MenuProps,
  MenuButton,
} from '@chakra-ui/react'

import { usePromise } from '@saas-ui/react'

import {
  ResponsiveMenu,
  ResponsiveMenuList,
  MenuInput,
  MenuFilterItem,
} from '../menu'
import { useSearchQuery } from '..'
import { FilterOperatorId, FilterType } from './operators'

export type FilterItems =
  | FilterItem[]
  | ((query: string) => Promise<FilterItem[]>)
  | ((query: string) => FilterItem[])

export const useFilterItems = (items: FilterItems, inputValue?: string) => {
  const [data, setData] = React.useState<FilterItem[]>([])

  const getItems = async () => {
    if (typeof items === 'function') {
      return items(inputValue || '')
    }
    return items
  }

  React.useEffect(() => {
    getItems().then((data) => setData(data))
  }, [items])

  return data
}

export interface FilterItem {
  id: string
  label?: string
  icon?: React.ReactElement
  type?: FilterType
  items?: FilterItems
  value?: string | number | boolean | Date
  operators?: FilterOperatorId[]
  defaultOperator?: FilterOperatorId
}

export interface FilterMenuProps extends Omit<MenuProps, 'children'> {
  items: FilterItems
  icon?: React.ReactNode
  label?: React.ReactNode
  placeholder?: string
  command?: string
  onSelect?(item: FilterItem): void
  buttonProps?: ButtonProps
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
      onSelect,
      isOpen: isOpenProp,
      defaultIsOpen,
      onOpen: onOpenProp,
      onClose: onCloseProp,
      inputValue,
      inputDefaultValue,
      onInputChange,
      ...rest
    } = props

    const { isOpen, onOpen, onClose } = useDisclosure({
      isOpen: isOpenProp,
      defaultIsOpen,
      onOpen() {
        onOpenProp?.()

        if (!isOpen) {
          setActiveItem(null)
        }

        filterRef.current?.focus()
      },
      onClose() {
        onReset()

        onCloseProp?.()
      },
    })

    const filterRef = React.useRef<HTMLInputElement>(null)

    const [activeItem, setActiveItem] = React.useState<FilterItem | null>(null)

    const data = useFilterItems(activeItem?.items || items, inputValue)

    const { results, onReset, ...inputProps } = useSearchQuery<FilterItem>({
      items: data,
      fields: ['id', 'label'],
      value: inputValue,
      defaultValue: inputDefaultValue,
      onChange: (value) => onInputChange?.(value, activeItem?.id),
    })

    const onItemClick = React.useCallback(
      (item: FilterItem) => {
        if (item.items?.length || typeof item.items === 'function') {
          setActiveItem(item)
          onReset()
          filterRef.current?.focus()
        } else {
          const filter = activeItem
            ? {
                ...activeItem,
                value: item.value || item.id,
              }
            : item
          onSelect?.(filter)
          onClose()
        }
      },
      [onReset, onClose, onSelect, activeItem],
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
      return (
        results?.map((item) => {
          const {
            id,
            label,
            type,
            items,
            value,
            operators,
            defaultOperator,
            ...itemProps
          } = item
          return (
            <MenuFilterItem
              key={id}
              {...itemProps}
              onClick={() => onItemClick(item)}
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
          >
            {input} {filteredItems}
          </ResponsiveMenuList>
        </Portal>
      </ResponsiveMenu>
    )
  },
)
