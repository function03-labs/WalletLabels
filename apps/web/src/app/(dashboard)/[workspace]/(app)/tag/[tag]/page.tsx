import { ContactsListPage } from '@app/features/contacts/pages/list'
import { createPage } from '@app/nextjs'

const { Page, metadata } = createPage({
  title: 'Contacts',
  renderComponent: ContactsListPage,
})

export { metadata }
export default Page
