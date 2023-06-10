import * as React from 'react'

import { Menu, MenuProps, MenuList, useBreakpointValue } from '@chakra-ui/react'

import { MenuDialogList, MenuDialogListProps } from '@saas-ui/react'
import {
  ResponseMenuContext,
  useResponsiveMenuContext,
} from './responsive-menu-context'

export interface ResponsiveMenuProps extends MenuProps {
  /**
   * The breakpoints to use for the responsive menu.
   * @default { base: true, md: false }
   */
  breakpoints?: Record<string, boolean | string> | (string | boolean)[]
}

export const ResponsiveMenu: React.FC<ResponsiveMenuProps> = (props) => {
  const { breakpoints = { base: true, md: false }, ...rest } = props
  const isMobile = useBreakpointValue(breakpoints)

  return (
    <ResponseMenuContext value={{ breakpoints }}>
      <Menu variant={isMobile ? 'dialog' : 'menu'} {...rest} />
    </ResponseMenuContext>
  )
}

export const ResponsiveMenuList: React.FC<MenuDialogListProps> = (props) => {
  const {
    children,
    title,
    closeOnOverlayClick,
    onOverlayClick,
    onEsc,
    useInert,
    hideCloseButton,
    initialFocusRef,
    ...rest
  } = props

  const context = useResponsiveMenuContext()

  const isMobile = useBreakpointValue(context.breakpoints)

  if (isMobile) {
    const dialogProps = {
      title,
      closeOnOverlayClick,
      onOverlayClick,
      onEsc,
      useInert,
      hideCloseButton,
      initialFocusRef,
    }
    return (
      <MenuDialogList {...dialogProps} {...rest}>
        {children}
      </MenuDialogList>
    )
  }

  return <MenuList {...rest}>{children}</MenuList>
}
