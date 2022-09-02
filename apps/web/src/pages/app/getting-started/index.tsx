import { createPage } from '@app/nextjs'

import { GettingStartedPage } from '@app/features/getting-started'

export default createPage({
  title: 'Getting started',
  layout: 'fullscreen',
  renderComponent: () => {
    return <GettingStartedPage />
  },
})
