import { createPage } from '@app/nextjs'

import { ContactsViewPage } from '@modules/contacts'

export default createPage({
  title: 'Contact',
  renderComponent: () => {
    return <ContactsViewPage />
  },
})
