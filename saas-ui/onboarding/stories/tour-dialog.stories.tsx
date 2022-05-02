import { Container, useDisclosure } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import {
  TourDialog,
  TourDialogActions,
  TourDialogBody,
  TourDialogFooter,
  TourDialogProgress,
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
      <TourDialogFooter>
        <TourDialogActions>
          <Button label="Skip" />
          <Button label="Next" variant="subtle" />
        </TourDialogActions>
      </TourDialogFooter>
    </TourDialog>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'Check out this new feature',
}
