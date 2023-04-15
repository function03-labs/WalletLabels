import { Meta } from '@storybook/react'
import { Breadcrumbs, BreadCrumbsProps } from './breadcrumbs'

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} as Meta

export const Default = {
  args: {
    items: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Settings',
        href: '/settings',
      },
      {
        title: 'Profile',
      },
    ],
  },
}
