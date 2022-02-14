import { createPage } from '@/helpers/createPage'

import { LoginPage } from '@modules/auth'

/**
 * Enable isPublic to use the custom login screen
 * Defaults to the default Auth component in AppLayout
 */

export default createPage({
  title: 'Login',
  // isPublic: true,
  renderComponent: () => {
    return <LoginPage />
  },
})
