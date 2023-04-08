import { Button, Container, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { Meta } from '@storybook/react'
import React from 'react'

import { FiInfo } from 'react-icons/fi'

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

export const Basic = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
    return (
      <>
        <Button onClick={onOpen}>Show BenefitsModal</Button>
        <BenefitsModal {...args} isOpen={isOpen} onClose={onClose}>
          <BenefitsModalHeader flexDirection="column">
            <Icon as={FiInfo} boxSize="8" mb="4" color="primary.500" />
            <Text>Check out this new feature</Text>
          </BenefitsModalHeader>
          <BenefitsModalBody>
            Benefits modals can be used to highlight new features and their
            benefits in your app. Embed illustrations or videos to make ideas
            more accessible.
          </BenefitsModalBody>
          <BenefitsModalFooter>
            <Button colorScheme="primary">Get started</Button>
          </BenefitsModalFooter>
        </BenefitsModal>
      </>
    )
  },
}

export const NoCloseButton = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
    return (
      <>
        <Button onClick={onOpen}>Show BenefitsModal</Button>
        <BenefitsModal {...args} isOpen={isOpen} onClose={onClose}>
          <BenefitsModalHeader flexDirection="column">
            <Icon as={FiInfo} boxSize="8" mb="4" color="primary.500" />
            <Text>Check out this new feature</Text>
          </BenefitsModalHeader>
          <BenefitsModalBody>
            Benefits modals can be used to highlight new features and their
            benefits in your app. Embed illustrations or videos to make ideas
            more accessible.
          </BenefitsModalBody>
          <BenefitsModalFooter>
            <Button colorScheme="primary">Get started</Button>
          </BenefitsModalFooter>
        </BenefitsModal>
      </>
    )
  },
  args: {
    hideCloseButton: true,
  },
}

export const Centered = {
  render: (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })

    return (
      <>
        <Button onClick={onOpen}>Show BenefitsModal</Button>
        <BenefitsModal {...args} isOpen={isOpen} onClose={onClose}>
          <BenefitsModalHeader textAlign="center">
            <Icon as={FiInfo} boxSize="8" mb="4" color="primary.500" />
            <Text>Check out this new feature</Text>
          </BenefitsModalHeader>
          <BenefitsModalBody textAlign="center">
            Benefits modals can be used to highlight new features and their
            benefits in your app. Embed illustrations or videos to make ideas
            more accessible.
          </BenefitsModalBody>
          <BenefitsModalFooter justifyContent="center">
            <Button colorScheme="primary">Get started</Button>
          </BenefitsModalFooter>
        </BenefitsModal>
      </>
    )
  },
  args: {
    hideCloseButton: true,
  },
}

export const Media = {
  render: () => {
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
          <BenefitsModalHeader>Check out this new feature</BenefitsModalHeader>
          <BenefitsModalBody>
            Benefits modals can be used to highlight new features and their
            benefits in your app. Embed illustrations or videos to make ideas
            more accessible.
          </BenefitsModalBody>
          <BenefitsModalFooter>
            <Button colorScheme="primary">Get started</Button>
          </BenefitsModalFooter>
        </BenefitsModal>
      </>
    )
  },
}
