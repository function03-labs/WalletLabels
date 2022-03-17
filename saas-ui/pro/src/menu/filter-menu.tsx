import * as React from 'react'

import {
  chakra,
  forwardRef,
  useStyles,
  HTMLChakraProps,
  SystemStyleObject,
} from '@chakra-ui/system'
import { useClickable } from '@chakra-ui/clickable'
import { useId } from '@chakra-ui/hooks'

import {
  cx,
  normalizeEventKey,
  isHTMLElement,
  isActiveElement,
  dataAttr,
  __DEV__,
} from '@chakra-ui/utils'

import { mergeRefs, EventKeyMap } from '@chakra-ui/react-utils'

import {
  InputProps,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/input'

import {
  MenuIcon,
  MenuCommand,
  useMenuContext,
  useMenuDescendantsContext,
  useMenuDescendant,
  UseMenuItemProps,
  MenuItemProps,
} from '@chakra-ui/menu'

type HTMLAttributes = React.HTMLAttributes<HTMLElement>

const navigationKeys = ['ArrowUp', 'ArrowDown', 'Escape']

export interface MenuListFilterProps extends InputProps {
  command?: string
}

export const MenuListFilter = forwardRef<MenuListFilterProps, 'div'>(
  (props, forwardRef) => {
    const { placeholder, command, ...rest } = props

    const { focusedIndex } = useMenuContext()

    const { role, ref, ...inputProps } = useMenuFilterItem(rest)
    const descendants = useMenuDescendantsContext()

    return (
      <InputGroup role={role}>
        <Input
          position="sticky"
          placeholder={placeholder}
          borderBottomRadius="0"
          borderWidth="0"
          borderBottomWidth="1px"
          _focus={{ outline: 'none' }}
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

function isTargetMenuItem(target: EventTarget | null) {
  // this will catch `menuitem`, `menuitemradio`, `menuitemcheckbox`
  return (
    isHTMLElement(target) &&
    !!target.getAttribute('role')?.startsWith('menuitem')
  )
}

export function useMenuFilterItem(
  props: UseMenuItemProps = {},
  externalRef: React.Ref<any> = null,
) {
  const {
    onMouseEnter: onMouseEnterProp,
    onMouseMove: onMouseMoveProp,
    onMouseLeave: onMouseLeaveProp,
    onClick: onClickProp,
    isDisabled,
    isFocusable,
    closeOnSelect,
    ...htmlProps
  } = props

  const menu = useMenuContext()

  const {
    setFocusedIndex,
    focusedIndex,
    closeOnSelect: menuCloseOnSelect,
    onClose,
    menuId,
  } = menu

  const ref = React.useRef<HTMLDivElement>(null)
  const id = `${menuId}-menuitem-${useId()}`

  /**
   * Register the menuitem's node into the domContext
   */
  const { index, register } = useMenuDescendant({
    disabled: isDisabled && !isFocusable,
  })

  const onMouseEnter = React.useCallback(
    (event) => {
      onMouseEnterProp?.(event)
      if (isDisabled) return
      setFocusedIndex(index)
    },
    [setFocusedIndex, index, isDisabled, onMouseEnterProp],
  )

  const onMouseMove = React.useCallback(
    (event) => {
      onMouseMoveProp?.(event)
      if (ref.current && !isActiveElement(ref.current)) {
        onMouseEnter(event)
      }
    },
    [onMouseEnter, onMouseMoveProp],
  )

  const onMouseLeave = React.useCallback(
    (event) => {
      onMouseLeaveProp?.(event)
      if (isDisabled) return
      setFocusedIndex(-1)
    },
    [setFocusedIndex, isDisabled, onMouseLeaveProp],
  )

  const onClick = React.useCallback(
    (event: React.MouseEvent) => {
      onClickProp?.(event)
      if (!isTargetMenuItem(event.currentTarget)) return
      /**
       * Close menu and parent menus, allowing the MenuItem
       * to override its parent menu's `closeOnSelect` prop.
       */
      if (closeOnSelect ?? menuCloseOnSelect) {
        onClose()
      }
    },
    [onClose, onClickProp, menuCloseOnSelect, closeOnSelect],
  )

  const isFocused = index === focusedIndex

  const clickableProps = useClickable({
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    ref: mergeRefs(register, ref, externalRef),
    isDisabled,
    isFocusable,
  })

  return {
    ...htmlProps,
    ...clickableProps,
    id,
    role: 'menuitem',
    tabIndex: isFocused ? 0 : -1,
    'data-focus': dataAttr(isFocused),
  }
}

export interface StyledMenuItemProps extends HTMLChakraProps<'button'> {}

const StyledMenuItem = forwardRef<StyledMenuItemProps, 'button'>(
  (props, ref) => {
    const { type, ...rest } = props
    const styles = useStyles()

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
