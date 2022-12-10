import { VStack, StackDivider, useBreakpointValue } from '@chakra-ui/react'
import { usePath } from '@app/features/core/hooks/use-path'

import { BackButton, Page, PageProps, Toolbar } from '@saas-ui/pro'

interface SettingsPageProps extends PageProps {}

/**
 * SettingsPage
 *
 * Use this component as a base for your settings pages.
 */
export const SettingsPage = (props: SettingsPageProps) => {
  const { children, ...rest } = props

  const isMobile = useBreakpointValue({ base: true, md: false })

  const backPath = usePath()

  const nav = isMobile && (
    <Toolbar
      borderBottomWidth="1px"
      position="fixed"
      zIndex="sticky"
      top="0"
      left="0"
      height="14"
      width="full"
      bg="app-background"
      justifyContent="flex-start"
      px="4"
      py="3"
      ps="16"
    >
      <BackButton href={backPath} />
    </Toolbar>
  )

  return (
    <Page variant="settings" nav={nav} mt={[14, null, 0]} {...rest}>
      <VStack divider={<StackDivider />} align="stretch" spacing={8} pb="16">
        {children}
      </VStack>
    </Page>
  )
}
