import { Button, Container, Stack, Text } from '@chakra-ui/react'
import { Card, Property, PropertyList } from '@saas-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { FeaturesProvider, useFlag } from '..'

import options from './config'

const meta: Meta = {
  title: 'Components/FeatureFlags/useFlag',
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
    <Card px="4">
      <PropertyList>
        <Property label="settings" value={useFlag('settings')?.toString()} />
        <Property label="beta" value={useFlag('beta')?.toString()} />
        <Property
          label="enterprice-feature"
          value={useFlag('enterprise-feature')?.toString()}
        />
        <Property label="value-feature" value={useFlag('value-feature')} />
      </PropertyList>
    </Card>
  )
}
