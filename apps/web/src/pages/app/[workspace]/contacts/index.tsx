import { createPage } from '@app/nextjs'

import { ContactsListPage } from '@app/features/contacts'

export default createPage({
  title: 'Contacts',
  renderComponent: () => {
    return <ContactsListPage />
  },
})
