import { Button, Container, VStack } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import { Beacon, BeaconProps } from '../src'

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

const Template: Story<BeaconProps> = (args) => <Beacon {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const ColorScheme = Template.bind({})
ColorScheme.args = {
  colorScheme: 'primary',
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
        size="xs"
        colorScheme="primary"
        position="absolute"
        top="0"
        right="0"
      />
    </Button>
  )
}
