import { ContactsListPage } from '@app/features/contacts'
import { createPage } from '@app/nextjs'

export default createPage({
  renderComponent() {
    return <ContactsListPage />
  },
})
