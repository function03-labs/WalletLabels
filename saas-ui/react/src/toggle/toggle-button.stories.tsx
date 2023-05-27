import { Meta, StoryObj } from '@storybook/react'
import { Center, Box, HStack, VStack } from '@chakra-ui/react'

import { ToggleButton } from '..'

export default {
  title: 'Components/Toggle/ToggleButton',
  component: ToggleButton,
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Box height="200px">
          <Story />
        </Box>
      </Center>
    ),
  ],
} as Meta

type Story = StoryObj<typeof ToggleButton>

export const Basic: Story = {
  args: {
    value: '1',
    variant: 'outline',
    children: 'Toggle me',
  },
}

export const ColorScheme: Story = {
  args: {
    value: '1',
    variant: 'outline',
    colorScheme: 'primary',
    children: 'Toggle me',
  },
}

export const Variants: Story = {
  render: () => (
    <VStack spacing="4">
      <HStack spacing="4">
        <ToggleButton value="1" variant="outline">
          Outline
        </ToggleButton>
        <ToggleButton value="2" variant="ghost">
          Ghost
        </ToggleButton>
      </HStack>
    </VStack>
  ),
}
