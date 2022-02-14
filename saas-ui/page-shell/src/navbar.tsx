import * as React from 'react'
import { chakra, omitThemingProps } from '@chakra-ui/react'
import { useMultiStyleConfig } from '@saas-ui/system'

// bg={useColorModeValue("white", "gray.800")}
// color={useColorModeValue("gray.600", "white")}
// minH={"60px"}
// py={{ base: 2 }}
// px={{ base: 4 }}
// borderBottom={1}
// borderStyle={"solid"}
// borderColor={useColorModeValue("gray.200", "whiteAlpha.300")}
// align={"center"}

const defaultStyleConfig = {
  parts: ['container', 'navbar', 'navlink'],
  baseStyle: {
    container: {},
    navbar: {
      display: 'flex',
      minH: '60px',
      borderBottomWidth: 1,
    },
  },
}

export const Navbar = (props) => {
  const styles = useMultiStyleConfig('Navbar', props, {
    defaultStyleConfig,
  })

  const { children, ...containerProps } = omitThemingProps(props)

  return (
    <chakra.div __css={styles.container} {...containerProps}>
      <chakra.div __css={styles.navbar}>{children}</chakra.div>
    </chakra.div>
  )
}
