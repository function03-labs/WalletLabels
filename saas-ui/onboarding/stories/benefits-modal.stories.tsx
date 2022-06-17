import { Container, useDisclosure } from '@chakra-ui/react'
import { Button } from '@saas-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import {
  BenefitsModal,
  BenefitsModalActions,
  BenefitsModalBody,
  BenefitsModalFooter,
  BenefitsModalHeader,
  BenefitsModalMedia,
  BenefitsModalProps,
} from '../src'

const meta: Meta = {
  title: 'Components/Onboarding/BenefitsModal',
  component: BenefitsModal,
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

const Template: Story<BenefitsModalProps> = (args) => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  return (
    <>
      <Button onClick={onOpen}>Show BenefitsModal</Button>
      <BenefitsModal {...args} isOpen={isOpen} onClose={onClose}>
        <BenefitsModalMedia
          src="onboarding/undraw_building_blocks_re_5ahy.svg"
          mx="16"
          my="8"
        />
        <BenefitsModalHeader>Check out this new feature</BenefitsModalHeader>
        <BenefitsModalBody>
          Benefits modals can be used to highlight new features and their
          benefits in your app. Embed illustrations or videos to make ideas more
          accessible.
        </BenefitsModalBody>
        <BenefitsModalFooter>
          <Button colorScheme="primary">Get started</Button>
        </BenefitsModalFooter>
      </BenefitsModal>
    </>
  )
}

export const Basic = Template.bind({})
Basic.args = {}

export const Centered = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })

  return (
    <>
      <Button onClick={onOpen}>Show BenefitsModal</Button>
      <BenefitsModal isOpen={isOpen} onClose={onClose}>
        <BenefitsModalMedia
          src="onboarding/undraw_building_blocks_re_5ahy.svg"
          mx="16"
          my="8"
        />
        <BenefitsModalHeader textAlign="center">
          Check out this new feature
        </BenefitsModalHeader>
        <BenefitsModalBody textAlign="center">
          Benefits modals can be used to highlight new features and their
          benefits in your app. Embed illustrations or videos to make ideas more
          accessible.
        </BenefitsModalBody>
        <BenefitsModalFooter justifyContent="center">
          <Button colorScheme="primary">Get started</Button>
        </BenefitsModalFooter>
      </BenefitsModal>
    </>
  )
}
