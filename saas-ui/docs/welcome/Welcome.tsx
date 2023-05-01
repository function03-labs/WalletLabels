import React from 'react'
import PackageInfo from '../../react/package.json'

import { Box, Stack, Heading, Text } from '@chakra-ui/react'
import { BackgroundGradient } from './background-gradient'

export const Welcome = () => {
  return (
    <Box
      background="gray.900"
      color="white"
      pos="absolute"
      top="0"
      right="0"
      bottom="0"
      left="0"
      p="8"
    >
      <Stack zIndex="2" pos="relative">
        <Heading>@saas-ui-pro/react</Heading>
        <Text>{`v${PackageInfo.version}`}</Text>
      </Stack>
      <BackgroundGradient />
    </Box>
  )
}
