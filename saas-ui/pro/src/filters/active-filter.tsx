import * as React from 'react'

import {
  chakra,
  forwardRef,
  Wrap,
  WrapProps,
  WrapItem,
  HTMLChakraProps,
  useMultiStyleConfig,
  useStyleConfig,
  SystemProps,
  ThemingProps,
  SystemStyleObject,
  createStylesContext,
} from '@chakra-ui/react'

import { cx, __DEV__ } from '@chakra-ui/utils'

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
  ButtonGroupProps,
} from '@saas-ui/react'

import { FilterMenu, FilterItem } from './filter-menu'

import { XIcon } from '../icons'
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

import { useFiltersContext } from './provider'
import { FilterOperatorId } from './operators'

const [StylesProvider, useStyles] = createStylesContext('ActiveFilter')

export interface ActiveFilterProps
  extends Omit<ActiveFilterContainerProps, 'onChange' | 'defaultValue'> {
  id: string
  icon?: React.ReactNode
  label?: string
  value?: FilterValue
  defaultValue?: FilterValue
  items?: FilterItem[]
  operators?: FilterItem[]
  operator?: FilterOperatorId
  defaultOperator?: FilterOperatorId
  onRemove?(): void
  onChange?(filter: Filter): void
  onOperatorChange?(id: FilterOperatorId): void
  onValueChange?(value: FilterValue): void
  formatLabel?(label?: string): string
  formatValue?(value: FilterValue): string
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
    formatLabel,
    formatValue,
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
        <ActiveFilterLabel icon={icon}>
          {formatLabel ? formatLabel(label) : label}
        </ActiveFilterLabel>
        <ActiveFilterOperator
          items={operators}
          value={operator}
          defaultValue={defaultOperator}
          onChange={onOperatorChange}
        />
        <ActiveFilterValue
          items={items}
          value={value}
          defaultValue={defaultValue}
          onChange={onValueChange}
          format={formatValue}
        />
        <ActiveFilterRemove onClick={onRemove} />
      </ActiveFilterContainer>
    </ActiveFilterProvider>
  )
}

if (__DEV__) {
  ActiveFilter.displayName = 'ActiveFilter'
}

export interface ActiveFilterContainerProps
  extends Omit<ButtonGroupProps, 'size' | 'variant' | 'colorScheme'>,
    ThemingProps<'ActiveFilter'> {}

export const ActiveFilterContainer: React.FC<ActiveFilterContainerProps> = (
  props,
) => {
  const { children, ...rest } = props

  const styles = useMultiStyleConfig('ActiveFilter', props) as Record<
    string,
    SystemStyleObject
  >

  const containerStyles: SystemStyleObject = {
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

  const labelStyles: SystemStyleObject = {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    ...styles.label,
  }

  const _icon = React.isValidElement(icon)
    ? React.cloneElement<any>(icon, {
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

  const operatorStyles: SystemStyleObject = {
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
    Omit<HTMLChakraProps<'div'>, 'onChange' | 'defaultValue'> {}

export const ActiveFilterValue: React.FC<ActiveFilterValueProps> = (props) => {
  const {
    children,
    onChange,
    value: valueProp,
    defaultValue,
    format,
    ...htmlProps
  } = props

  const styles = useStyles()

  const valueStyles: SystemStyleObject = {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    ...styles.value,
  }

  const { label, getMenuProps } = useFilterValue(props)

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
      {label || children}
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
      icon={<XIcon />}
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

export interface ActiveFiltersListProps extends WrapProps {
  formatValue?(value: FilterValue): string
}

export const ActiveFiltersList: React.FC<ActiveFiltersListProps> = (props) => {
  const { formatValue, ...rest } = props
  const {
    activeFilters,
    getOperators,
    getFilter,
    enableFilter,
    disableFilter,
  } = useFiltersContext()

  const styles = useStyleConfig('ActiveFiltersList', props)

  return activeFilters?.length ? (
    <Wrap {...rest} __css={styles}>
      {activeFilters?.map((activeFilter) => {
        const { key, id, value, operator } = activeFilter

        const filter = getFilter(id)

        const operators = getOperators(filter?.type).filter(({ id }) => {
          if (filter?.operators && !filter.operators.includes(id)) {
            return false
          }

          return true
        })

        return (
          <WrapItem key={key}>
            <ActiveFilter
              id={id}
              icon={filter?.icon}
              label={filter?.label}
              placeholder={filter?.label}
              value={value}
              defaultOperator={operator}
              items={filter?.items}
              operators={operators}
              onValueChange={(value) => {
                enableFilter({ key, ...activeFilter, value })
              }}
              onOperatorChange={(operator) => {
                enableFilter({ key, ...activeFilter, operator })
              }}
              onRemove={() => key && disableFilter(key)}
              formatValue={formatValue}
            />
          </WrapItem>
        )
      })}
    </Wrap>
  ) : null
}
