import { createPage } from '@app/nextjs'

import { GettingStartedPage } from '@modules/getting-started'

export default createPage({
  title: 'Getting started',
  layout: 'fullscreen',
  renderComponent: () => {
    return <GettingStartedPage />
  },
})
