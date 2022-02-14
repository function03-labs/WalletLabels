import { createPage } from '@/helpers/createPage'

import { SignupPage } from '@modules/auth'

/**
 * Enable isPublic to use the custom signup screen
 * Defaults to the default Auth component in AppLayout
 */

const SignupPage = createPage({
  title: 'Signup',
  // isPublic: true,
  renderComponent: () => {
    return <SignupPage />
  },
})

export default SignupPage
