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
      ...rest
    } = props

    const { isOpen, onOpen, onClose } = useDisclosure({
      onOpen() {
        if (!isOpen) {
          setActiveFilter(null)
        }

        filterRef.current?.focus()
      },
    })

    const filterRef = React.useRef<HTMLInputElement>(null)

    const [activeFilter, setActiveFilter] = React.useState<Filter | null>(null)

    const onFilterClick = (filter: Filter) => {
      if (filter.type === 'array') {
        setActiveFilter(filter)
        filterRef.current?.focus()
      } else {
        onSelect?.(filter)
        onClose()
      }
    }

    const input = (
      <MenuListFilter
        placeholder={activeFilter?.label || label}
        ref={filterRef}
        command={command}
      />
    )

    const items = React.useMemo(() => {
      return (
        (activeFilter?.items || filters)?.map((filter) => {
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
    }, [filters, activeFilter])

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
