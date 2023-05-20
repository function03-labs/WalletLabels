import { Meta } from '@storybook/react'
import { HelpCenterDialog } from './'

export default {
  title: 'Components/HelpCenter',
  component: HelpCenterDialog,
} as Meta

export const Default = {
  args: {
    isOpen: true,
  },
}
