import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import mdx from './Welcome.mdx'

import { Welcome } from './Welcome'

export default {
  title: 'Getting Started/Welcome',
  component: Welcome,
  parameters: {
    docs: {
      page: mdx,
    },
  },
} as Meta

export { Welcome }
