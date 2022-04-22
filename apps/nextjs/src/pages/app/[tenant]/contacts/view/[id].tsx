import { createPage } from '@app/nextjs'

import { ContactsViewPage } from '@modules/contacts'

export default createPage({
  title: 'Contact',
  renderComponent: ({ query }) => {
    return <ContactsViewPage id={query.id} />
  },
})
