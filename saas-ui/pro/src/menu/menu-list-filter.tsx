import * as React from 'react'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
  MenuIcon,
  MenuCommand,
  useMenuContext,
  useMenuDescendantsContext,
  MenuItemProps,
  InputProps,
  Input,
  InputGroup,
  InputRightElement,
  useMultiStyleConfig,
} from '@chakra-ui/react'

import { cx, normalizeEventKey, __DEV__ } from '@chakra-ui/utils'
import { mergeRefs, EventKeyMap } from '@chakra-ui/react-utils'

import { useMenuFilterItem } from './use-menu-filter-item'

type HTMLAttributes = React.HTMLAttributes<HTMLElement>

const navigationKeys = ['ArrowUp', 'ArrowDown', 'Escape']

export interface MenuListFilterProps extends Omit<InputProps, 'type'> {
  command?: string
}

export const MenuListFilter = forwardRef<MenuListFilterProps, 'div'>(
  (props, forwardRef) => {
    const { placeholder, command, ...rest } = props

    const { focusedIndex } = useMenuContext()

    const { role, ref, ...inputProps } = useMenuFilterItem(rest)
    const descendants = useMenuDescendantsContext()

    return (
      <InputGroup role={role} className={cx('saas-menu-list__filter')}>
        <Input
          type="text"
          position="sticky"
          placeholder={placeholder}
          borderBottomRadius="0"
          borderWidth="0"
          borderBottomWidth="1px"
          borderColor="default-border-color"
          _focus={{
            outline: 'none',
            boxShadow: 'none',
            borderColor: 'default-border-color',
          }}
          _focusVisible={{
            outline: 'none',
            boxShadow: 'none',
            borderColor: 'default-border-color',
          }}
          ref={mergeRefs(forwardRef, ref)}
          {...inputProps}
          onKeyDown={(event) => {
            const eventKey = normalizeEventKey(event)
            const keyMap: EventKeyMap = {
              Enter: () => {
                const item = descendants.item(focusedIndex)
                item?.node?.click()
              },
            }

            const action = keyMap[eventKey]

            if (action) {
              event.preventDefault()
              event.stopPropagation()

              action(event)
            }

            if (!navigationKeys.includes(event.key)) {
              event.stopPropagation()
            }
          }}
        />
        {command && (
          <InputRightElement>
            <MenuCommand>{command}</MenuCommand>
          </InputRightElement>
        )}
      </InputGroup>
    )
  },
)

export interface StyledMenuItemProps extends HTMLChakraProps<'button'> {}

const StyledMenuItem = forwardRef<StyledMenuItemProps, 'button'>(
  (props, ref) => {
    const { type, ...rest } = props

    // @todo find a better way to do this, since useStyles is not supported anymore.
    const styles = useMultiStyleConfig('Menu')

    /**
     * Given another component, use its type if present
     * Else, use no type to avoid invalid html, e.g. <a type="button" />
     * Else, fall back to "button"
     */
    const btnType = rest.as ? type ?? undefined : 'button'

    const buttonStyles: SystemStyleObject = {
      textDecoration: 'none',
      color: 'inherit',
      userSelect: 'none',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      textAlign: 'start',
      flex: '0 0 auto',
      outline: 0,
      ...styles.item,
    }

    return (
      <chakra.button ref={ref} type={btnType} {...rest} __css={buttonStyles} />
    )
  },
)

export const MenuFilterItem = forwardRef<MenuItemProps, 'button'>(
  (props, ref) => {
    const {
      icon,
      iconSpacing = '0.75rem',
      command,
      commandSpacing = '0.75rem',
      children,
      ...rest
    } = props

    const menuitemProps = useMenuFilterItem(rest, ref) as HTMLAttributes

    const shouldWrap = icon || command

    const _children = shouldWrap ? (
      <span style={{ pointerEvents: 'none', flex: 1 }}>{children}</span>
    ) : (
      children
    )

    return (
      <StyledMenuItem
        {...menuitemProps}
        className={cx('chakra-menu__menuitem', menuitemProps.className)}
      >
        {icon && (
          <MenuIcon fontSize="0.8em" marginEnd={iconSpacing}>
            {icon}
          </MenuIcon>
        )}
        {_children}
        {command && (
          <MenuCommand marginStart={commandSpacing}>{command}</MenuCommand>
        )}
      </StyledMenuItem>
    )
  },
)

if (__DEV__) {
  MenuFilterItem.displayName = 'MenuFilterItem'
}
