import { useBreakpointValue } from '@chakra-ui/react'
import { MenuList } from '@chakra-ui/menu'

import { MenuDialogList, MenuDialogListProps } from './dialog'

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
