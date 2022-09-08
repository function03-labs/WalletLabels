import { createPage } from '@app/nextjs'

import { GettingStartedPage } from '@app/features/organizations'

export default createPage({
  title: 'Getting started',
  layout: 'fullscreen',
  renderComponent: () => {
    return <GettingStartedPage />
  },
})
