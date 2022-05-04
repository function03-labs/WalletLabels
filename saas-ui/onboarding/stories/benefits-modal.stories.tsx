import { Container, Text, useDisclosure, VStack } from '@chakra-ui/react'
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
      <BenefitsModal
        {...args}
        isOpen={isOpen}
        onClose={onClose}
        title="Check out this new feature"
      >
        <BenefitsModalMedia
          src="onboarding/undraw_building_blocks_re_5ahy.svg"
          px="16"
          py="8"
        />
        <BenefitsModalBody>
          Benefits modals can be used to highlight new features and their
          benefits in your app. Embed illustrations or videos to make ideas more
          accessible.
        </BenefitsModalBody>
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
      <BenefitsModal
        isOpen={isOpen}
        onClose={onClose}
        title={
          <BenefitsModalHeader textAlign="center">
            Check out this new feature
          </BenefitsModalHeader>
        }
      >
        <BenefitsModalMedia
          src="onboarding/undraw_building_blocks_re_5ahy.svg"
          px="16"
          py="8"
        />
        <BenefitsModalBody textAlign="center">
          Benefits modals can be used to highlight new features and their
          benefits in your app. Embed illustrations or videos to make ideas more
          accessible.
        </BenefitsModalBody>
        <BenefitsModalFooter>
          <BenefitsModalActions
            justifyContent="center"
            primaryActionProps={{ label: 'Get started' }}
            secondaryActionProps={{ display: 'none' }}
          />
        </BenefitsModalFooter>
      </BenefitsModal>
    </>
  )
}
