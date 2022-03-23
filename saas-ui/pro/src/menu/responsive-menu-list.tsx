import * as React from 'react'

import { useBreakpointValue } from '@chakra-ui/react'

import {
  Menu,
  MenuProps,
  MenuList,
  MenuDialogList,
  MenuDialogListProps,
} from '@saas-ui/react'

export const ResponsiveMenu: React.FC<MenuProps> = (props) => {
  const isMobile = useBreakpointValue({ base: 'true', md: false })

  return <Menu variant={isMobile ? 'dialog' : 'menu'} {...props} />
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

  const isMobile = useBreakpointValue({ base: 'true', md: false })

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
