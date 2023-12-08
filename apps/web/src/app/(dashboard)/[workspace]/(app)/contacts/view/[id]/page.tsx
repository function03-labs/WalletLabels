import { createPage } from '@app/nextjs'
import { ContactsViewPage } from '@app/features/contacts'

const { Page, metadata } = createPage({
  title: 'Contact',
  renderComponent: ContactsViewPage,
})

export { metadata }
export default Page
