import { Meta } from '@storybook/react'
import { InviteDialog } from './'

export default {
  title: 'Components/InviteDialog',
  component: InviteDialog,
} as Meta

export const Default = {
  args: {
    isOpen: true,
  },
}
