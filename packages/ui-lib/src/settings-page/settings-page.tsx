import { VStack, StackDivider, useBreakpointValue } from '@chakra-ui/react'
import { usePath } from '@app/features/core/hooks/use-path'

import {
  BackButton,
  Page,
  PageBody,
  PageHeader,
  PageHeaderProps,
  PageProps,
  Toolbar,
} from '@saas-ui-pro/react'

interface SettingsPageProps
  extends PageProps,
    Pick<PageHeaderProps, 'title' | 'description' | 'toolbar'> {}

/**
 * SettingsPage
 *
 * Use this component as a base for your settings pages.
 */
export const SettingsPage = (props: SettingsPageProps) => {
  const { children, title, description, toolbar, ...rest } = props

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
      {/* <BackButton href={backPath} /> */}
    </Toolbar>
  )

  return (
    <Page variant="settings" mt={[14, null, 0]} {...rest}>
      <PageHeader
        title={title}
        description={description}
        nav={nav}
        toolbar={toolbar}
      />
      <PageBody>
        <VStack divider={<StackDivider />} align="stretch" spacing={8} pb="16">
          {children}
        </VStack>
      </PageBody>
    </Page>
  )
}
