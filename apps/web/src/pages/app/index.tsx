import { createPage } from '@app/nextjs'

import { HomePage } from '@app/features/organizations'

export default createPage({
  layout: 'fullscreen',
  renderComponent: () => {
    return <HomePage />
  },
})
