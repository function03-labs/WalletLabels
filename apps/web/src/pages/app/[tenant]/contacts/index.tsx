import { createPage } from '@app/nextjs'

import { ContactsListPage } from '@modules/contacts'

export default createPage({
  title: 'Contacts',
  renderComponent: () => {
    return <ContactsListPage />
  },
})
