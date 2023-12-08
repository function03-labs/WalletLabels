import { HomePage } from 'marketing/pages/home'

import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'home',
  renderComponent: HomePage,
})

export { metadata }
export default Page
