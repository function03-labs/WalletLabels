import * as React from 'react'

import { chakra, forwardRef } from '@chakra-ui/system'

import { useDisclosure } from '@chakra-ui/hooks'

import { cx, __DEV__ } from '@chakra-ui/utils'

import {
  Button,
  ButtonProps,
  Menu,
  MenuProps,
  MenuButton,
  useHotkeysShortcut,
} from '@saas-ui/react'

import { ResponsiveMenuList, MenuListFilter, MenuFilterItem } from '../menu'
import { useSearchQuery } from '..'

export interface Filter {
  id: string
  label?: string
  icon?: React.ReactElement
  type?: string
  items?: Filter[]
  value?: string | number | boolean | Date
}

export interface FilterMenuProps extends Omit<MenuProps, 'children'> {
  filters: Filter[]
  icon?: React.ReactNode
  label?: string
  command?: string
  onSelect?(filter: Filter): void
  buttonProps?: ButtonProps
}

export const FilterMenu = forwardRef<FilterMenuProps, 'button'>(
  (props, forwardedRef) => {
    const {
      filters,
      label = 'Filter',
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
          setActiveFilter(null)
        }

        filterRef.current?.focus()
      },
      onClose() {
        onReset()

        onCloseProp?.()
      },
    })

    const filterRef = React.useRef<HTMLInputElement>(null)

    const [activeFilter, setActiveFilter] = React.useState<Filter | null>(null)

    const onFilterClick = (filter: Filter) => {
      if (filter.type === 'array') {
        setActiveFilter(filter)
        onReset()
        filterRef.current?.focus()
      } else {
        onSelect?.(filter)
        onClose()
      }
    }

    const { results, onReset, ...inputProps } = useSearchQuery<Filter>({
      items: activeFilter?.items || filters,
      fields: ['id', 'label'],
    })

    const input = (
      <MenuListFilter
        placeholder={activeFilter?.label || label}
        ref={filterRef}
        command={command}
        {...inputProps}
      />
    )

    const items = React.useMemo(() => {
      return (
        results?.map((filter) => {
          const { id, label, type, items, value, ...itemProps } = filter
          return (
            <MenuFilterItem
              key={id}
              {...itemProps}
              onClick={() => onFilterClick(filter)}
            >
              {filter.label}
            </MenuFilterItem>
          )
        }) || null
      )
    }, [results, activeFilter])

    return (
      <chakra.div>
        <Menu
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          closeOnSelect={false}
          {...rest}
        >
          <MenuButton
            as={Button}
            leftIcon={icon}
            variant="outline"
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
            {input} {items}
          </ResponsiveMenuList>
        </Menu>
      </chakra.div>
    )
  },
)
