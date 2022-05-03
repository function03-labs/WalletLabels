import { Container, Text, useDisclosure } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import {
  TourDialog,
  TourDialogActions,
  TourDialogBody,
  TourDialogFooter,
  TourDialogProps,
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
        <Button label="Toggle tour dialog" onClick={onToggle} />
      </TourDialogTrigger>
      <TourDialogBody>Start the tour to see how it works.</TourDialogBody>
    </TourDialog>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  title: 'Check out this new feature',
}

export const CustomActions = Template.bind({})
CustomActions.args = {
  title: 'Check out this new feature',
  primaryAction: {
    label: 'Next',
    colorScheme: 'white',
    variant: 'solid',
  },
  secondaryAction: {
    label: 'Skip',
  },
}

export const ColorScheme = Template.bind({})
ColorScheme.args = {
  title: 'Check out this new feature',
  colorScheme: 'secondary',
}

export const Composed = () => {
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true })
  return (
    <TourDialog title="Composed Tour Dialog" isOpen={isOpen} onClose={onClose}>
      <TourDialogTrigger>
        <Button label="Toggle tour dialog" onClick={onToggle} />
      </TourDialogTrigger>
      <TourDialogBody>Start the tour to see how it works.</TourDialogBody>
      <TourDialogFooter>
        <Text>Step 1 of 2</Text>
        <TourDialogActions>
          <Button label="Skip" />
          <Button label="Next" variant="subtle" />
        </TourDialogActions>
      </TourDialogFooter>
    </TourDialog>
  )
}
