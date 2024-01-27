import { createPage } from '@app/nextjs'
import { SignupPage } from '@app/features/auth/pages/signup'

const { Page, metadata } = createPage({
  title: 'Signup',
  renderComponent: () => {
    return <SignupPage />
  },
})

export { metadata }
export default Page
