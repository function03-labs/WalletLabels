import { createPage } from '@app/nextjs'
import { LoginPage } from '@app/features/auth/pages/login'

const { Page, metadata } = createPage({
  title: 'Login',
  renderComponent: () => {
    return <LoginPage />
  },
})

export { metadata }

export default Page
