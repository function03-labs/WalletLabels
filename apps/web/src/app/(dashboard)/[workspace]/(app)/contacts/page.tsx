import { createPage } from '@app/nextjs'

import { ContactsListPage } from '@app/features/contacts'

const { Page, metadata } = createPage({
  title: 'Contacts',
  renderComponent: ContactsListPage,
})

export { metadata }
export default Page
