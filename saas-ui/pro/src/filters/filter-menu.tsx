import * as React from 'react'

import {
  forwardRef,
  Portal,
  useDisclosure,
  Button,
  ButtonProps,
} from '@chakra-ui/react'
import { __DEV__ } from '@chakra-ui/utils'

import { MenuProps, MenuButton } from '@saas-ui/react'

import {
  ResponsiveMenu,
  ResponsiveMenuList,
  MenuListFilter,
  MenuFilterItem,
} from '../menu'
import { useSearchQuery } from '..'
import { FilterOperatorId } from './operators'

export interface FilterItem {
  id: string
  label?: string
  icon?: React.ReactElement
  type?: string
  items?: FilterItem[]
  value?: string | number | boolean | Date
  operators?: FilterOperatorId[]
  defaultOperator?: FilterOperatorId
}

export interface FilterMenuProps extends Omit<MenuProps, 'children'> {
  items: FilterItem[]
  icon?: React.ReactNode
  label?: React.ReactNode
  placeholder?: string
  command?: string
  onSelect?(item: FilterItem): void
  buttonProps?: ButtonProps
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

    const { results, onReset, ...inputProps } = useSearchQuery<FilterItem>({
      items: activeItem?.items || items,
      fields: ['id', 'label'],
    })

    const onItemClick = React.useCallback(
      (item: FilterItem) => {
        if (item.items?.length) {
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
      <MenuListFilter
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
