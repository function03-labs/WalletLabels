import { Meta } from '@storybook/react'
import { LinkButton, LinkButtonProps } from './'

export default {
  title: 'Components/LinkButton',
  component: LinkButton,
} as Meta

export const Default = {
  args: {
    children: 'Home',
  },
}
