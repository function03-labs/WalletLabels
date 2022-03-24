import * as React from 'react'

import { chakra, forwardRef } from '@chakra-ui/system'

import { useDisclosure } from '@chakra-ui/hooks'

import { cx, callAllHandlers, __DEV__ } from '@chakra-ui/utils'

import {
  Button,
  ButtonProps,
  Menu,
  MenuProps,
  MenuButton,
} from '@saas-ui/react'

import {
  ResponsiveMenu,
  ResponsiveMenuList,
  MenuListFilter,
  MenuFilterItem,
} from '../menu'
import { useSearchQuery } from '..'

export interface FilterMenuItem {
  id: string
  label?: string
  icon?: React.ReactElement
  type?: string
  items?: FilterMenuItem[]
  value?: string | number | boolean | Date
}

export interface FilterMenuProps extends Omit<MenuProps, 'children'> {
  items: FilterMenuItem[]
  icon?: React.ReactNode
  label?: React.ReactNode
  placeholder?: string
  command?: string
  onSelect?(item: FilterMenuItem): void
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

    const [activeItem, setActiveItem] = React.useState<FilterMenuItem | null>(
      null,
    )

    const { results, onReset, ...inputProps } = useSearchQuery<FilterMenuItem>({
      items: activeItem?.items || items,
      fields: ['id', 'label'],
    })

    const onItemClick = React.useCallback(
      (item: FilterMenuItem) => {
        if (item.type === 'array') {
          setActiveItem(item)
          onReset()
          filterRef.current?.focus()
        } else {
          onSelect?.(item)
          onClose()
        }
      },
      [onReset, onClose, onSelect],
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
          const { id, label, type, items, value, ...itemProps } = item
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
        <ResponsiveMenuList
          zIndex="dropdown"
          pt="0"
          overflow="auto"
          initialFocusRef={filterRef}
          hideCloseButton={true}
        >
          {input} {filteredItems}
        </ResponsiveMenuList>
      </ResponsiveMenu>
    )
  },
)
