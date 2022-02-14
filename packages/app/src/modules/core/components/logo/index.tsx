import LogoDark from '/public/img/saasui.svg'
import LogoLight from '/public/img/saasui-dark.svg'

import { Flex, useColorModeValue } from '@chakra-ui/react'

export const Logo = (props) => {
  const Logo = useColorModeValue(LogoLight, LogoDark)
  return (
    <Flex width="160px" {...props}>
      <Logo />
    </Flex>
  )
}
