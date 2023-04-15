import { Meta } from '@storybook/react'
import { HelpCenter } from './'

export default {
  title: 'Components/HelpCenter',
  component: HelpCenter,
} as Meta

export const Default = {
  args: {
    isOpen: true,
  },
}
