import { Button, Container, Stack, Text } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { FeaturesProvider, Has } from '..'

import options from './config'

const meta: Meta = {
  title: 'Components/FeatureFlags/Has',
  component: FeaturesProvider,
  parameters: {
    controls: { expanded: true },
  },
  args: {},
  decorators: [
    (Story) => {
      return (
        <Container>
          <FeaturesProvider
            value={{
              ...options,
              attr: {
                role: 'admin',
              },
            }}
          >
            <Story />
          </FeaturesProvider>
        </Container>
      )
    },
  ],
}
export default meta

export const Default = () => {
  return (
    <Has feature="settings">
      <Button colorScheme="green">Settings Enabled</Button>
    </Has>
  )
}

export const WithFallback = () => {
  return (
    <Has
      feature="beta-feature"
      fallback={<Button colorScheme="red">Beta Feature Disabled</Button>}
    >
      <Button colorScheme="green">Beta Feature Enabled</Button>
    </Has>
  )
}

export const WithMultiplefeatures = () => {
  return (
    <Has
      feature={['settings', 'enterprise-feature']}
      fallback={<Button colorScheme="red">Feature Disabled</Button>}
    >
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}

export const WithMultipleExactfeatures = () => {
  return (
    <Has
      feature={['settings', 'beta']}
      exact={false}
      fallback={<Button colorScheme="red">Feature Disabled</Button>}
    >
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}

export const WithValue = () => {
  return (
    <Has feature="value-feature" value="enabled">
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}

export const WithNot = () => {
  return (
    <Has not feature="private-feature">
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}

export const WithRenderProps = () => {
  return (
    <Has feature={['settings']}>
      {({ flags }) => {
        const features = Object.keys(flags)
        return (
          <Button colorScheme="green">Feature Enabled: {features[0]}</Button>
        )
      }}
    </Has>
  )
}

export const WithMultipleValues = () => {
  return (
    <Has
      feature={['settings', 'value-feature']}
      value="enabled"
      fallback={<Button colorScheme="red">Feature Disabled</Button>}
    >
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}
