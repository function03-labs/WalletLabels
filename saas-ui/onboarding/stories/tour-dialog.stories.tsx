import { Button, Container, Text, useDisclosure } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import {
  TourDialog,
  TourDialogActions,
  TourDialogBody,
  TourDialogCloseButton,
  TourDialogFooter,
  TourDialogHeader,
  TourDialogPrimaryAction,
  TourDialogProps,
  TourDialogSecondaryAction,
  TourDialogTrigger,
} from '../src'

const meta: Meta = {
  title: 'Components/Onboarding/TourDialog',
  component: TourDialog,
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

const Template: Story<TourDialogProps> = (args) => {
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true })
  return (
    <TourDialog isOpen={isOpen} onClose={onClose} {...args}>
      <TourDialogTrigger>
        <Button onClick={onToggle}>Toggle tour dialog</Button>
      </TourDialogTrigger>
      <TourDialogCloseButton />
      <TourDialogHeader>Check out this new feature</TourDialogHeader>
      <TourDialogBody>Start the tour to see how it works.</TourDialogBody>
      <TourDialogFooter>
        <Text>Step 1 of 2</Text>
        <TourDialogActions>
          <TourDialogSecondaryAction />
          <TourDialogPrimaryAction />
        </TourDialogActions>
      </TourDialogFooter>
    </TourDialog>
  )
}

export const Basic = Template.bind({})
Basic.args = {}

export const ColorScheme = Template.bind({})
ColorScheme.args = {
  colorScheme: 'secondary',
}
