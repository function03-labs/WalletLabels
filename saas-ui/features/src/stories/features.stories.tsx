import { Button, Container, Stack, Text } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import React from 'react'
import { FeaturesProvider, FeaturesProviderProps, useFeatures } from '..'

import options from './config'

const meta: Meta = {
  title: 'Components/FeatureFlags/FeaturesProvider',
  component: FeaturesProvider,
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

const Template: Story<FeaturesProviderProps> = (args) => (
  <FeaturesProvider {...args} />
)

const Identify = () => {
  const features = useFeatures()

  const [plan, setPlan] = React.useState('basic')

  const user = React.useMemo(() => {
    return {
      id: 1,
      role: 'admin',
      plan,
    }
  }, [plan])

  const upgrade = () => {
    setPlan('pro')
  }

  const downgrade = () => {
    setPlan('basic')
  }

  React.useEffect(() => {
    if (features.isReady) {
      features.identify(user)
    }
  }, [features.isReady, user])

  return (
    <Stack>
      {plan === 'pro' ? (
        <Button onClick={downgrade}>Downgrade</Button>
      ) : (
        <Button onClick={upgrade}>Upgrade</Button>
      )}

      <Text>Features: {Object.keys(features.flags).join(', ')}</Text>
    </Stack>
  )
}

export const Default = Template.bind({})
Default.args = {
  value: options,
  children: <Identify />,
}
