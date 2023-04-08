import { useBreakpointValue } from '@chakra-ui/react'
import {
  BackButton,
  Page,
  PageBody,
  PageHeader,
  PageProps,
  Toolbar,
  useSplitPage,
} from '@saas-ui-pro/react'

export function InboxViewPage(props: PageProps) {
  const { onClose } = useSplitPage()

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const nav = isMobile ? (
    <Toolbar ps="10" justifyContent="flex-start">
      <BackButton onClick={onClose} />
    </Toolbar>
  ) : null

  return (
    <Page {...props}>
      <PageHeader nav={nav} />
      <PageBody></PageBody>
    </Page>
  )
}
