import { createPage } from '@app/nextjs'

import { GettingStartedPage } from '@app/features/organizations'

const { Page, metadata } = createPage({
  title: 'Getting started',
  renderComponent: () => {
    return <GettingStartedPage />
  },
})

export { metadata }
export default Page
