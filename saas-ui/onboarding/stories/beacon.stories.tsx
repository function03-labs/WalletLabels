import * as React from 'react'
import { Button, Container, VStack } from '@chakra-ui/react'
import { Meta } from '@storybook/react'
import { Beacon } from '../src'

const meta: Meta = {
  title: 'Components/Onboarding/Beacon',
  component: Beacon,
  parameters: {
    controls: { expanded: true },
  },
  args: {},
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      )
    },
  ],
}
export default meta

export const Basic = {}

export const ColorScheme = {
  args: {
    colorScheme: 'green',
  },
}

export const Sizes = () => {
  return (
    <VStack spacing="8">
      <Beacon size="xs" colorScheme="primary" />
      <Beacon size="sm" colorScheme="cyan" />
      <Beacon size="md" colorScheme="blue" />
      <Beacon size="lg" />
    </VStack>
  )
}

export const WithButton = () => {
  return (
    <Button position="relative">
      Changelog{' '}
      <Beacon
        size="sm"
        colorScheme="primary"
        position="absolute"
        top="-2px"
        right="-2px"
      />
    </Button>
  )
}
