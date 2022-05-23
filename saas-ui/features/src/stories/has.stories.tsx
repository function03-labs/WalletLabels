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
    <Has flag="settings">
      <Button colorScheme="green">Settings Enabled</Button>
    </Has>
  )
}

export const WithFallback = () => {
  return (
    <Has
      flag="beta-feature"
      fallback={<Button colorScheme="red">Beta Feature Disabled</Button>}
    >
      <Button colorScheme="green">Beta Feature Enabled</Button>
    </Has>
  )
}

export const WithMultipleFlags = () => {
  return (
    <Has
      flag={['settings', 'enterprise-feature']}
      fallback={<Button colorScheme="red">Feature Disabled</Button>}
    >
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}

export const WithMultipleExactFlags = () => {
  return (
    <Has
      flag={['settings', 'beta']}
      exact={false}
      fallback={<Button colorScheme="red">Feature Disabled</Button>}
    >
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}

export const WithValue = () => {
  return (
    <Has flag="value-feature" value="enabled">
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}

export const WithNot = () => {
  return (
    <Has not flag="private-feature">
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}

export const WithRenderProps = () => {
  return (
    <Has flag={['settings']}>
      {(props) => {
        const flags = Object.keys(props.flags)
        return <Button colorScheme="green">Feature Enabled: {flags[0]}</Button>
      }}
    </Has>
  )
}

export const WithMultipleValues = () => {
  return (
    <Has flag={['settings', 'value-feature']} value="enabled">
      <Button colorScheme="green">Feature Enabled</Button>
    </Has>
  )
}
