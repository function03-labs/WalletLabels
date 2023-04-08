import * as React from 'react'

import {
  useMenuContext,
  useMenuDescendant,
  UseMenuItemProps,
  useId,
} from '@chakra-ui/react'

import { useClickable } from '@chakra-ui/clickable'

import { isHTMLElement, isActiveElement, dataAttr } from '@chakra-ui/utils'

import { mergeRefs } from '@chakra-ui/react-utils'

function isTargetMenuItem(target: EventTarget | null) {
  // this will catch `menuitem`, `menuitemradio`, `menuitemcheckbox`
  return (
    isHTMLElement(target) &&
    !!target.getAttribute('role')?.startsWith('menuitem')
  )
}

export interface UseMenuFilterItemProps extends UseMenuItemProps {}

export function useMenuFilterItem(
  props: UseMenuFilterItemProps = {},
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
    (event: React.MouseEvent) => {
      onMouseEnterProp?.(event)
      if (isDisabled) return
      setFocusedIndex(index)
    },
    [setFocusedIndex, index, isDisabled, onMouseEnterProp],
  )

  const onMouseMove = React.useCallback(
    (event: React.MouseEvent) => {
      onMouseMoveProp?.(event)
      if (ref.current && !isActiveElement(ref.current)) {
        onMouseEnter(event)
      }
    },
    [onMouseEnter, onMouseMoveProp],
  )

  const onMouseLeave = React.useCallback(
    (event: React.MouseEvent) => {
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
