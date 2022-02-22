import { VStack, StackDivider } from '@chakra-ui/react'

import { Page, PageProps } from '@saas-ui/pro'

interface SettingsPageProps extends PageProps {}

/**
 * SettingsPage
 *
 * Use this component as a base for your settings pages.
 */
export const SettingsPage = (props: SettingsPageProps) => {
  const { children, ...rest } = props

  return (
    <Page variant="settings" {...rest}>
      <VStack divider={<StackDivider />} align="stretch" spacing={8} pb="16">
        {children}
      </VStack>
    </Page>
  )
}
