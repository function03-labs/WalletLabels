import { create } from '@storybook/theming'
// @ts-ignore
import brandImage from './storybook-logo.svg'

export default create({
  base: 'light',
  brandTitle: 'Your Design System',
  brandUrl: 'https://saas-ui.dev',
  brandImage,
})
