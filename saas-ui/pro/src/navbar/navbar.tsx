import * as React from 'react'
import {
  chakra,
  omitThemingProps,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
  SystemStyleObject,
} from '@chakra-ui/react'

interface NavbarProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'SuiNavbar'> {}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const styles = useMultiStyleConfig('SuiNavbar', props) as Record<
    string,
    SystemStyleObject
  >

  const { children, ...containerProps } = omitThemingProps(props)

  const containerStyles: SystemStyleObject = {
    ...styles.container,
  }

  const navbarStyles: SystemStyleObject = {
    display: 'flex',
    minH: '60px',
    maxW: 'full',
    py: 2,
    px: 4,
    borderBottomWidth: 1,
    ...styles.navbar,
  }

  return (
    <chakra.div {...containerProps} __css={containerStyles}>
      <chakra.div __css={navbarStyles}>{children}</chakra.div>
    </chakra.div>
  )
}
