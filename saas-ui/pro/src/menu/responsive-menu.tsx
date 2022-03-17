import { useBreakpointValue } from '@chakra-ui/react'
import { MenuList } from '@chakra-ui/menu'

import { MenuDialogList, MenuDialogListProps } from './dialog'

export const ResponsiveMenuList: React.FC<MenuDialogListProps> = (props) => {
  const { children, title, hideCloseButton, initialFocusRef, ...rest } = props

  const isMobile = useBreakpointValue({ base: 'true', md: false })

  if (isMobile) {
    return (
      <MenuDialogList
        title={title}
        hideCloseButton={hideCloseButton}
        initialFocusRef={initialFocusRef}
        {...rest}
      >
        {children}
      </MenuDialogList>
    )
  }

  return <MenuList {...rest}>{children}</MenuList>
}
