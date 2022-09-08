import { createPage } from '@app/nextjs'

import { HomePage } from '@app/features/organizations'

export default createPage({
  renderComponent: () => {
    return <HomePage />
  },
})
