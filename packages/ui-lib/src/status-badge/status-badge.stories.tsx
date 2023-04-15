import { Stack } from '@chakra-ui/react'
import { Meta } from '@storybook/react'
import { StatusBadge } from './'

export default {
  title: 'Components/StatusBadge',
  component: StatusBadge,
} as Meta

export const Default = {
  render: () => (
    <Stack>
      <StatusBadge />
      <StatusBadge colorScheme="green" />
      <StatusBadge colorScheme="red" />
      <StatusBadge colorScheme="orange" />
      <StatusBadge colorScheme="blue" />
    </Stack>
  ),
}
