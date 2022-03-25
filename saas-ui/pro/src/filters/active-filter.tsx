import * as React from 'react'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
  useStyles,
  StylesProvider,
  SystemProps,
} from '@chakra-ui/system'

import { cx, callAllHandlers, __DEV__ } from '@chakra-ui/utils'

import { Wrap, WrapProps, WrapItem } from '@chakra-ui/layout'

import {
  ButtonGroup,
  Button,
  IconButton,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuDialogListProps,
  MenuProps,
  ButtonProps,
} from '@saas-ui/react'

import { FilterMenu, FilterItem } from './filter-menu'

import { FiX } from 'react-icons/fi'
import { ResponsiveMenu, ResponsiveMenuList } from '../menu'

import {
  Filter,
  FilterValue,
  useActiveFilter,
  useFilterValue,
  useFilterOperator,
  ActiveFilterContextValue,
  ActiveFilterProvider,
  ActiveFilterValueOptions,
  UseFilterOperatorProps,
} from './use-active-filter'

import { useFiltersContext, FilterOperators, FilterOperator } from './provider'

export interface ActiveFilterProps
  extends Omit<HTMLChakraProps<'div'>, 'onChange' | 'defaultValue'> {
  id: string
  icon?: React.ReactNode
  label?: string
  value?: FilterValue
  defaultValue?: FilterValue
  items?: FilterItem[]
  operators?: FilterOperators
  operator?: FilterOperator
  defaultOperator?: FilterOperator
  onRemove?(): void
  onChange?(filter: Filter): void
  onOperatorChange?(id: FilterOperator): void
  onValueChange?(id: FilterValue): void
}

export const ActiveFilter: React.FC<ActiveFilterProps> = (props) => {
  const {
    icon,
    label,
    value,
    defaultValue,
    items,
    operators,
    operator,
    defaultOperator,
    onRemove,
    onChange,
    onOperatorChange: onOperatorChangeProp,
    onValueChange: onValueChangeProp,
    ...containerProps
  } = props

  const { filter, onOperatorChange, onValueChange } = useActiveFilter(props)

  const context: ActiveFilterContextValue = {
    ...filter,
    label,
  }

  return (
    <ActiveFilterProvider value={context}>
      <ActiveFilterContainer {...containerProps}>
        <ActiveFilterLabel icon={icon}>{label}</ActiveFilterLabel>
        <ActiveFilterOperator
          items={operators}
          value={operator}
          defaultValue={defaultOperator}
          onChange={callAllHandlers(onOperatorChange, onOperatorChangeProp)}
        />
        <ActiveFilterValue
          items={items}
          value={value}
          defaultValue={defaultValue}
          onChange={callAllHandlers(onValueChange, onValueChangeProp)}
        />
        <ActiveFilterRemove onClick={onRemove} />
      </ActiveFilterContainer>
    </ActiveFilterProvider>
  )
}

if (__DEV__) {
  ActiveFilter.displayName = 'ActiveFilter'
}

export const ActiveFilterContainer: React.FC<HTMLChakraProps<'div'>> = (
  props,
) => {
  const { children, ...rest } = props

  const styles = useMultiStyleConfig('ActiveFilter', props)

  const containerStyles = {
    borderWidth: '1px',
    borderRadius: 'md',
    display: 'flex',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <ButtonGroup
        variant="ghost"
        isAttached
        {...rest}
        sx={containerStyles}
        className={cx('saas-active-filter', props.className)}
      >
        {children}
      </ButtonGroup>
    </StylesProvider>
  )
}

if (__DEV__) {
  ActiveFilterContainer.displayName = 'ActiveFilterContainer'
}

export interface ActiveFilterLabelProps extends HTMLChakraProps<'div'> {
  icon?: React.ReactNode
  iconSpacing?: SystemProps['marginRight']
}

export const ActiveFilterLabel: React.FC<ActiveFilterLabelProps> = (props) => {
  const { children, icon, iconSpacing = 2, ...rest } = props

  const styles = useStyles()

  const labelStyles = {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    ...styles.label,
  }

  const _icon = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        'aria-hidden': true,
        focusable: false,
      })
    : null

  return (
    <chakra.div
      {...rest}
      __css={labelStyles}
      className={cx('saas-active-filter__label', props.className)}
    >
      {_icon && (
        <chakra.span marginEnd={iconSpacing} display="inline-block">
          {_icon}
        </chakra.span>
      )}
      <chakra.span>{children}</chakra.span>
    </chakra.div>
  )
}

if (__DEV__) {
  ActiveFilterLabel.displayName = 'ActiveFilterLabel'
}

/**
 * ActiveFilterOperator
 */

export interface ActiveFilterOperatorProps
  extends Omit<MenuProps, 'children'>,
    UseFilterOperatorProps {
  items?: FilterItem[]
  buttonProps?: MenuButtonProps
  menuListProps?: MenuDialogListProps
  children?: React.ReactNode
}

/**
 * ActiveFilterOperator
 */
export const ActiveFilterOperator: React.FC<ActiveFilterOperatorProps> = (
  props,
) => {
  const { items, buttonProps, menuListProps, ...rest } = props

  const styles = useStyles()

  const operatorStyles = {
    color: 'muted',
    px: 2,
    minWidth: 0,
    ...styles.operator,
  }

  const { label, getItemProps } = useFilterOperator(props)

  return (
    <ResponsiveMenu {...rest}>
      <MenuButton
        as={ActiveFilterButton}
        sx={operatorStyles}
        {...buttonProps}
        className={cx('saas-active-filter__operator')}
      >
        {label}
      </MenuButton>
      <ResponsiveMenuList {...menuListProps}>
        {items?.map((item) => (
          <MenuItem key={item.id} icon={item.icon} {...getItemProps(item)}>
            {item.label}
          </MenuItem>
        ))}
      </ResponsiveMenuList>
    </ResponsiveMenu>
  )
}

if (__DEV__) {
  ActiveFilterOperator.displayName = 'ActiveFilterOperator'
}

export interface ActiveFilterValueProps
  extends ActiveFilterValueOptions,
    Omit<HTMLChakraProps<'div'>, 'onChange' | 'defaultValue'> {
  format?(value: FilterValue): FilterValue
}

export const ActiveFilterValue: React.FC<ActiveFilterValueProps> = (props) => {
  const {
    children,
    onChange,
    value: valueProp,
    defaultValue,
    format = (value: FilterValue) => {
      return value?.toString()
    },
    ...htmlProps
  } = props

  const styles = useStyles()

  const valueStyles = {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    ...styles.value,
  }

  const { value, getMenuProps } = useFilterValue(props)

  const { icon, ...menuProps } = getMenuProps(props)

  if (menuProps.items?.length) {
    return (
      <FilterMenu
        {...menuProps}
        buttonProps={{ as: ActiveFilterButton, leftIcon: icon }}
      />
    )
  }

  return (
    <chakra.div
      {...htmlProps}
      __css={valueStyles}
      className={cx('saas-active-filter__value', props.className)}
    >
      {format(value) || children}
    </chakra.div>
  )
}

if (__DEV__) {
  ActiveFilterValue.displayName = 'ActiveFilterValue'
}

export interface ActiveFilterRemove extends HTMLChakraProps<'button'> {}

export const ActiveFilterRemove: React.FC<ActiveFilterRemove> = (props) => {
  const styles = useStyles()

  const removeStyles = {
    px: 2,
    fontSize: '1.2em',
    ...styles.remove,
  }
  return (
    <IconButton
      icon={<FiX />}
      as="div"
      aria-label="Remove filter"
      role="button"
      tabIndex={0}
      {...props}
      sx={removeStyles}
      className={cx('saas-active-filter__remove', props.className)}
    />
  )
}

if (__DEV__) {
  ActiveFilterRemove.displayName = 'ActiveFilterRemove'
}

const ActiveFilterButton = forwardRef<ButtonProps, 'div'>((props, ref) => {
  return (
    <Button
      as="div"
      role="button"
      tabIndex={0}
      {...props}
      fontWeight="normal"
      px="2"
      ref={ref}
    />
  )
})

if (__DEV__) {
  ActiveFilterButton.displayName = 'ActiveFilterButton'
}

export interface ActiveFiltersList extends WrapProps {
  filters: FilterItem[]
}

export const ActiveFiltersList = () => {
  const {
    activeFilters,
    getOperators,
    getFilter,
    enableFilter,
    disableFilter,
  } = useFiltersContext()

  return activeFilters?.length ? (
    <Wrap px="4" py="2" borderBottomWidth="1px" zIndex="2">
      {activeFilters?.map((activeFilter, i) => {
        const { key, id, value, operator } = activeFilter
        const filter = getFilter(id)
        const operators = getOperators(filter?.type)
        return (
          <WrapItem key={key}>
            <ActiveFilter
              id={id}
              icon={filter?.icon}
              label={filter?.label}
              placeholder={filter?.label}
              defaultValue={value}
              defaultOperator={operator}
              items={filter?.items}
              operators={operators}
              onChange={(filter) => enableFilter({ key, ...filter })}
              onRemove={() => disableFilter(key)}
            />
          </WrapItem>
        )
      })}
    </Wrap>
  ) : null
}
