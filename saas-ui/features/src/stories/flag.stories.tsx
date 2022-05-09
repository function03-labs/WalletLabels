import { Button, Container, Stack, Text } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { FeaturesProvider, Flag, Flags } from '..'

import options from './config'

const meta: Meta = {
  title: 'Components/FeatureFlags/FlagEnabled',
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
  return <Flag flag="settings">Settings Enabled</Flag>
}

export const WithFallback = () => {
  return (
    <Flag flag="beta-feature" fallback={<Text>Beta feature disabled</Text>}>
      Beta feature enabled
    </Flag>
  )
}

export const WithMultipleFlags = () => {
  return (
    <Flags
      flags={['enterprise-feature-1', 'enterprise-feature-2']}
      fallback={<Text>Feature disabled</Text>}
    >
      Feature enabled
    </Flags>
  )
}
