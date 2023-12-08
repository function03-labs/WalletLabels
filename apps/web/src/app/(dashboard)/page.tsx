import { createPage } from '@app/nextjs'
import { IndexPage } from './index'

const { Page, metadata } = createPage({
  title: 'Home',
  renderComponent: IndexPage,
})

export { metadata }
export default Page
