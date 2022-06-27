import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Center, Tooltip, VStack } from '@chakra-ui/react'

import { Command } from '..'
import { Button } from '@saas-ui/react'

export default {
  title: 'Components/Data Display/Command',
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Story />
      </Center>
    ),
  ],
} as Meta

export const Basic = () => {
  return (
    <VStack>
      <Command>shift+X</Command>
      <Command>A then B</Command>
      <Command>alt or option</Command>
    </VStack>
  )
}

export const TooltipWithCommand = () => {
  return (
    <Tooltip
      label={
        <>
          Inbox <Command>G then I</Command>
        </>
      }
    >
      <Button>Inbox</Button>
    </Tooltip>
  )
}
